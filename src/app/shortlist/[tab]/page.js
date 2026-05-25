import Link from 'next/link';
import { notFound } from 'next/navigation';
import MinimalNav from '../../../components/MinimalNav';
import songdata from '../../../../content/shortlist/songs.json';
import moviedata from '../../../../content/shortlist/movies.json';
import summerdata from '../../../../content/shortlist/summer.json';

const TABS = ['songs', 'movies', 'summer-26'];

export function generateStaticParams() {
  return TABS.map((tab) => ({ tab }));
}

export default function ShortlistTab({ params }) {
  const { tab } = params;
  if (!TABS.includes(tab)) notFound();

  const songs = [...songdata].reverse();
  const movies = [...moviedata].reverse();

  const tabClass = (key) =>
    `font-sans text-sm transition-colors ${
      tab === key
        ? 'text-landing-primary'
        : 'text-landing-muted hover:text-landing-secondary'
    }`;

  return (
    <div className="min-h-screen bg-landing-bg">
      <MinimalNav currentPage="shortlist" />
      <main>
        <div className="max-w-2xl mx-auto px-8 pb-24">
          <div className="flex gap-6 mb-6">
            <Link href="/shortlist/songs" className={tabClass('songs')}>
              song of the month
            </Link>
            <Link href="/shortlist/movies" className={tabClass('movies')}>
              movie of the month
            </Link>
            <Link href="/shortlist/summer-26" className={tabClass('summer-26')}>
              summer 26
            </Link>
          </div>

          {tab === 'songs' && (
            <div className="space-y-4">
              {songs.map((song) => (
                <a
                  key={song.id}
                  href={song.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between py-2 border-b border-dashed border-landing-border hover:border-landing-muted transition-colors"
                >
                  <div className="flex items-baseline gap-4 min-w-0">
                    <span className="font-sans font-medium text-landing-primary group-hover:text-landing-hover transition-colors shrink-0">
                      {song.title}
                    </span>
                    <span className="hidden sm:inline font-sans text-landing-muted text-sm truncate">
                      {song.artist}
                    </span>
                  </div>
                  <span className="font-mono text-sm text-landing-muted shrink-0 ml-4">
                    {song.month} {song.year}
                  </span>
                </a>
              ))}
            </div>
          )}

          {tab === 'movies' && (
            <div className="space-y-4">
              {movies.map((movie) => (
                <a
                  key={movie.id}
                  href={movie.imdb}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between py-2 border-b border-dashed border-landing-border hover:border-landing-muted transition-colors"
                >
                  <div className="flex items-baseline gap-4 min-w-0">
                    <span className="font-sans font-medium text-landing-primary group-hover:text-landing-hover transition-colors shrink-0">
                      {movie.title}
                    </span>
                    <span className="hidden sm:inline font-sans text-landing-muted text-sm truncate">
                      {movie.star} / {movie.director}
                    </span>
                  </div>
                  <span className="font-mono text-sm text-landing-muted shrink-0 ml-4">
                    {movie.month} {movie.year}
                  </span>
                </a>
              ))}
            </div>
          )}

          {tab === 'summer-26' && (
            <div className="space-y-1">
              {summerdata.map((item) => {
                const hasChildren = item.children && item.children.length > 0;
                const parentDone = hasChildren
                  ? item.children.every((c) => c.done)
                  : item.done;
                return (
                  <div key={item.id}>
                    <div className="flex items-center gap-3 py-2 border-b border-dashed border-landing-border">
                      <span
                        aria-hidden="true"
                        className={`inline-flex h-5 w-5 shrink-0 items-center justify-center border ${
                          parentDone
                            ? 'border-landing-secondary bg-landing-muted/10 text-landing-secondary'
                            : 'border-landing-muted'
                        }`}
                      >
                        {parentDone && (
                          <svg
                            viewBox="0 0 16 16"
                            className="h-3.5 w-3.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="3 8.5 6.5 12 13 4.5" />
                          </svg>
                        )}
                      </span>
                      <span
                        className={`font-sans font-medium ${
                          parentDone
                            ? 'text-landing-muted line-through'
                            : 'text-landing-primary'
                        }`}
                      >
                        {item.text}
                      </span>
                    </div>
                    {hasChildren && (
                      <div className="pl-8">
                        {item.children.map((child) => (
                          <div
                            key={child.id}
                            className="flex items-center gap-2.5 py-1.5"
                          >
                            <span
                              aria-hidden="true"
                              className={`inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center border ${
                                child.done
                                  ? 'border-landing-muted bg-landing-muted/10 text-landing-muted'
                                  : 'border-landing-muted/60'
                              }`}
                            >
                              {child.done && (
                                <svg
                                  viewBox="0 0 16 16"
                                  className="h-2.5 w-2.5"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <polyline points="3 8.5 6.5 12 13 4.5" />
                                </svg>
                              )}
                            </span>
                            <span
                              className={`font-sans text-sm ${
                                child.done
                                  ? 'text-landing-muted line-through'
                                  : 'text-landing-secondary'
                              }`}
                            >
                              {child.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {tab !== 'summer-26' && (
            <p className="font-sans text-xs text-landing-muted mt-10">
              *not necessarily released that month, just my favorite discovery/revisit at the time
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
