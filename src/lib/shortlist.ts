// Single source of truth for the shortlist tab slugs; the tab page, the legacy redirect,
// and the sitemap all derive from this so adding a tab can't leave one of them behind.
export const SHORTLIST_TABS = ['songs', 'movies', 'books', 'summer-26', 'ballparks'] as const;
export type ShortlistTab = (typeof SHORTLIST_TABS)[number];
