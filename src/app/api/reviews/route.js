import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { jwtVerify } from 'jose';
import { z } from 'zod';

const getSecretKey = () => new TextEncoder().encode(process.env.AUTH_SECRET || 'dev-secret-key-change-me-please-1234567890');

const reviewSchema = z.object({
  title: z.string().min(1),
  artist: z.string().min(1),
  type: z.enum(['movie', 'show']),
  rating: z.number().min(0).max(10),
  reviewDate: z.string().or(z.date()),
  image: z.string().min(1),
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

export async function GET() {
  const items = await prisma.review.findMany({ orderBy: { reviewDate: 'desc' } });
  return NextResponse.json(items);
}

export async function POST(req) {
  const isAdmin = await requireAdmin(req);
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const json = await req.json();
  const parsed = reviewSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const data = parsed.data;

  const created = await prisma.review.create({
    data: {
      title: data.title,
      artist: data.artist,
      type: data.type,
      rating: data.rating,
      reviewDate: new Date(data.reviewDate),
      image: data.image,
      review: data.review ?? null,
    },
  });
  return NextResponse.json(created, { status: 201 });
}
