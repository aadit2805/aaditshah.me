import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const PER_IP = { tokens: 15, window: '60 s' };
const GLOBAL = { tokens: 100, window: '60 s' };

let perIpLimiter = null;
let globalLimiter = null;

const upstashConfigured =
  !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;

if (upstashConfigured) {
  const redis = Redis.fromEnv();
  perIpLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(PER_IP.tokens, PER_IP.window),
    prefix: 'chat:ip',
    analytics: true,
  });
  globalLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(GLOBAL.tokens, GLOBAL.window),
    prefix: 'chat:global',
    analytics: true,
  });
}

// ───────── In-memory fallback (when Upstash is not configured) ─────────
const memMap = new Map();
let memGlobalCount = 0;
let memGlobalStart = Date.now();
const WINDOW_MS = 60 * 1000;

function memCheck(ip) {
  const now = Date.now();
  if (now - memGlobalStart > WINDOW_MS) {
    memGlobalCount = 0;
    memGlobalStart = now;
  }
  memGlobalCount++;
  if (memGlobalCount > GLOBAL.tokens) {
    return { allowed: false, reason: 'Server is busy. Try again in a minute.' };
  }

  const rec = memMap.get(ip);
  if (!rec || now - rec.windowStart > WINDOW_MS) {
    memMap.set(ip, { windowStart: now, count: 1 });
    return { allowed: true };
  }
  rec.count++;
  if (rec.count > PER_IP.tokens) {
    return { allowed: false, reason: 'Slow down — too many messages. Try again in a minute.' };
  }
  return { allowed: true };
}

if (!upstashConfigured && typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, rec] of memMap) {
      if (now - rec.windowStart > WINDOW_MS * 5) memMap.delete(ip);
    }
  }, 5 * 60 * 1000);
}

export async function checkRateLimit(ip) {
  if (!upstashConfigured) return memCheck(ip);

  const [globalRes, ipRes] = await Promise.all([
    globalLimiter.limit('site'),
    perIpLimiter.limit(ip || 'unknown'),
  ]);

  if (!globalRes.success) {
    return { allowed: false, reason: 'Server is busy. Try again in a minute.' };
  }
  if (!ipRes.success) {
    return { allowed: false, reason: 'Slow down — too many messages. Try again in a minute.' };
  }
  return { allowed: true };
}

export const rateLimitMode = upstashConfigured ? 'upstash' : 'in-memory';
