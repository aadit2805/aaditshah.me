import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const alt = 'Music — Aadit Shah';
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return ogImage({
    title: '~/music',
    eyebrow: 'aaditshah.me / music',
    theme: 'dark',
  });
}
