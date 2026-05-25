import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const alt = 'Reviews — Aadit Shah';
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return ogImage({
    title: 'Reviews',
    eyebrow: 'aaditshah.me / reviews',
  });
}
