import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const alt = 'Shortlist — Aadit Shah';
export const size = ogSize;
export const contentType = ogContentType;

const TITLES = {
  songs: 'song of the month',
  movies: 'movie of the month',
  'summer-26': 'summer 26',
  books: 'currently reading',
};

export function generateImageMetadata({ params }) {
  return [{ id: params.tab, alt: `${TITLES[params.tab] || 'shortlist'} — Aadit Shah` }];
}

export default async function Image({ params }) {
  return ogImage({
    title: TITLES[params.tab] || 'shortlist',
    eyebrow: `aaditshah.me / shortlist`,
  });
}
