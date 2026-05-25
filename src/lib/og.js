import { ImageResponse } from 'next/og';

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

const palettes = {
  light: {
    bg: '#f5f2e9',
    fg: '#1a1410',
    muted: '#8b6f5a',
    accent: '#c97b5a',
  },
  dark: {
    bg: '#09090b',
    fg: '#fafafa',
    muted: '#a1a1aa',
    accent: '#10b981',
  },
};

export function ogImage({ title, eyebrow = 'aaditshah.me', theme = 'light' }) {
  const c = palettes[theme] || palettes.light;
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: c.bg,
          padding: '80px',
          fontFamily: 'serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            color: c.muted,
            fontSize: 28,
            fontFamily: 'monospace',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: 12,
              height: 12,
              borderRadius: 999,
              backgroundColor: c.accent,
            }}
          />
          {eyebrow}
        </div>

        <div
          style={{
            display: 'flex',
            color: c.fg,
            fontSize: 104,
            fontWeight: 600,
            lineHeight: 1.02,
            letterSpacing: '-0.02em',
            fontFamily: 'serif',
            maxWidth: '900px',
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            color: c.muted,
            fontSize: 24,
            fontFamily: 'monospace',
          }}
        >
          <span>Aadit Shah</span>
          <span style={{ color: c.accent }}>↗</span>
        </div>
      </div>
    ),
    { ...ogSize }
  );
}
