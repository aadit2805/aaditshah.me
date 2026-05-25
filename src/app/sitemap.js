import notesdata from './notes/notesdata.json';

const BASE = 'https://aaditshah.me';

export default function sitemap() {
  const now = new Date();
  const routes = [
    '',
    '/portfolio',
    '/notes',
    '/music',
    '/reviews',
    '/shortlist',
    '/shortlist/songs',
    '/shortlist/movies',
    '/shortlist/summer-26',
    '/shortlist/books',
    '/terminal',
  ];

  const staticEntries = routes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1.0 : 0.7,
  }));

  const noteEntries = notesdata.map((n) => ({
    url: `${BASE}/notes/${n.slug}`,
    lastModified: n.date ? new Date(n.date) : now,
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  return [...staticEntries, ...noteEntries];
}
