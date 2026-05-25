import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const alt = 'Portfolio — Aadit Shah';
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return ogImage({
    title: 'Portfolio',
    eyebrow: 'aaditshah.me / portfolio',
  });
}
