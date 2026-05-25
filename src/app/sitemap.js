const BASE = 'https://aaditshah.me';

export default function sitemap() {
  const now = new Date();
  const routes = [
    '',
    '/portfolio',
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

  return staticEntries;
}
