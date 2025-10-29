import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { jwtVerify } from 'jose';
import { z } from 'zod';

const getSecretKey = () => new TextEncoder().encode(process.env.AUTH_SECRET || 'dev-secret-key-change-me-please-1234567890');

const reviewUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  artist: z.string().min(1).optional(),
  type: z.enum(['movie', 'show']).optional(),
  rating: z.number().min(0).max(10).optional(),
  reviewDate: z.string().or(z.date()).optional(),
  image: z.string().min(1).optional(),
  review: z.string().optional().nullable(),
});

async function requireAdmin(req) {
  const token = req.cookies.get('admin_token')?.value;
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return !!payload?.isAdmin;
  } catch {
    return false;
  }
}

export async function GET(_req, { params }) {
  const id = Number(params.id);
  if (!Number.isFinite(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  const item = await prisma.review.findUnique({ where: { id } });
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(req, { params }) {
  const isAdmin = await requireAdmin(req);
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const id = Number(params.id);
  if (!Number.isFinite(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  const json = await req.json();
  const parsed = reviewUpdateSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const data = parsed.data;

  const updated = await prisma.review.update({
    where: { id },
    data: {
      ...('reviewDate' in data ? { reviewDate: new Date(data.reviewDate) } : {}),
      ...('title' in data ? { title: data.title } : {}),
      ...('artist' in data ? { artist: data.artist } : {}),
      ...('type' in data ? { type: data.type } : {}),
      ...('rating' in data ? { rating: data.rating } : {}),
      ...('image' in data ? { image: data.image } : {}),
      ...('review' in data ? { review: data.review ?? null } : {}),
    },
  });
  return NextResponse.json(updated);
}

export async function DELETE(req, { params }) {
  const isAdmin = await requireAdmin(req);
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const id = Number(params.id);
  if (!Number.isFinite(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  await prisma.review.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
