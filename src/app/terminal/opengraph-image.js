import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const alt = 'Terminal — chat with Aadit Shah';
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return ogImage({
    title: '$ ./aadit --chat',
    eyebrow: 'aaditshah.me / terminal',
    theme: 'dark',
  });
}
