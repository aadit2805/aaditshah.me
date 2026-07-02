import Link from 'next/link';
import { notFound } from 'next/navigation';
import MinimalNav from '../../../components/MinimalNav';
import BallparksList from '../../../components/BallparksList';
import SummerList from '../../../components/SummerList';
import songdata from '../../../../content/shortlist/songs.json';
import moviedata from '../../../../content/shortlist/movies.json';
import summerdata from '../../../../content/shortlist/summer.json';
import booksdata from '../../../../content/shortlist/books.json';
import ballparkdata from '../../../../content/shortlist/ballparks.json';

const TABS = ['songs', 'movies', 'books', 'summer-26', 'ballparks'];

const TAB_LABELS = {
  songs: 'songs',
  movies: 'movies',
  books: 'books',
  'summer-26': 'summer 26',
  ballparks: 'ballparks',
};

const META = {
  songs: {
    title: 'Song of the month',
    description: 'A monthly log of Aadit Shah’s favorite song discoveries and revisits.',
  },
  movies: {
    title: 'Movie of the month',
    description: 'A monthly log of Aadit Shah’s favorite film discoveries and revisits.',
  },
  books: {
    title: 'Currently reading',
    description: 'Books Aadit Shah is reading and planning to read.',
  },
  'summer-26': {
    title: 'Summer 26',
    description: 'Aadit Shah’s summer 2026 list — things to do, places to eat, trips to take.',
  },
  ballparks: {
    title: 'Ballparks visited',
    description: 'MLB ballparks Aadit Shah has been to.',
  },
};

export function generateStaticParams() {
  return TABS.map((tab) => ({ tab }));
}

export function generateMetadata({ params }: { params: { tab: string } }) {
  const meta = META[params.tab as keyof typeof META];
  if (!meta) return {};
  return {
    title: TAB_LABELS[params.tab as keyof typeof TAB_LABELS],
    description: meta.description,
    alternates: { canonical: `/shortlist/${params.tab}` },
  };
}

export default function ShortlistTab({ params }: { params: { tab: string } }) {
  const { tab } = params;
  if (!TABS.includes(tab)) notFound();

  const songs = [...songdata].reverse();
  const movies = [...moviedata].reverse();

  const tabClass = (key: string) =>
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
          <div className="flex flex-wrap gap-x-5 gap-y-2 mb-6">
            {TABS.map((key) => (
              <Link
                key={key}
                href={`/shortlist/${key}`}
                className={tabClass(key)}
              >
                {TAB_LABELS[key as keyof typeof TAB_LABELS]}
              </Link>
            ))}
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

          {tab === 'summer-26' && <SummerList items={summerdata} />}

          {tab === 'books' && (
            <div className="space-y-1">
              {booksdata.length === 0 && (
                <p className="font-sans text-sm text-landing-muted py-4">
                  Nothing on the shelf yet — check back soon.
                </p>
              )}
              {booksdata.map((book) => (
                <div
                  key={book.id}
                  className="flex items-baseline gap-3 py-2 border-b border-dashed border-landing-border"
                >
                  <span
                    aria-hidden="true"
                    className={`inline-flex h-5 w-5 shrink-0 items-center justify-center border self-center ${
                      book.done
                        ? 'border-landing-secondary bg-landing-muted/10 text-landing-secondary'
                        : 'border-landing-muted'
                    }`}
                  >
                    {book.done && (
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
                      book.done
                        ? 'text-landing-muted line-through'
                        : 'text-landing-primary'
                    }`}
                  >
                    {book.title}
                  </span>
                  {book.author && (
                    <span className="font-sans text-landing-muted text-sm">
                      {book.author}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {tab === 'ballparks' && <BallparksList parks={ballparkdata} />}

          {(tab === 'songs' || tab === 'movies') && (
            <p className="font-sans text-xs text-landing-muted mt-10">
              *not necessarily released that month, just my favorite discovery/revisit at the time
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
