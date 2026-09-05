import type { MetadataRoute } from 'next';
import { SHORTLIST_TABS } from '@/lib/shortlist';
import writingRaw from './writing/writingdata.json';
import type { Note } from '@/types/content';

const BASE = 'https://aaditshah.me';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    '',
    '/projects',
    '/writing',
    '/music',
    '/reviews',
    '/shortlist',
    ...SHORTLIST_TABS.map((tab) => `/shortlist/${tab}`),
    '/terminal',
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1.0 : 0.7,
  }));

  const writingEntries: MetadataRoute.Sitemap = (writingRaw as Note[]).map((note) => ({
    url: `${BASE}/writing/${note.slug}`,
    lastModified: note.date ? new Date(note.date) : now,
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  return [...staticEntries, ...writingEntries];
}
