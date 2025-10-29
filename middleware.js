import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const getSecretKey = () => {
  const secret = process.env.AUTH_SECRET || 'dev-secret-key-change-me-please-1234567890';
  return new TextEncoder().encode(secret);
};

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const isAdminPath = pathname.startsWith('/admin') && !pathname.startsWith('/admin/login');

  if (!isAdminPath) return NextResponse.next();

  const token = req.cookies.get('admin_token')?.value;
  if (!token) {
    const url = new URL('/admin/login', req.url);
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (!payload?.isAdmin) throw new Error('not admin');
    return NextResponse.next();
  } catch (e) {
    const url = new URL('/admin/login', req.url);
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/admin/:path*'],
};
