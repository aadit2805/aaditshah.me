import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const alt = 'Aadit Shah — Software Engineer / Texas A&M CS';
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return ogImage({
    title: 'Software Engineer / Texas A&M CS',
    eyebrow: 'aaditshah.me',
  });
}
