'use client';

import { useState } from 'react';
import MinimalNav from '../../components/MinimalNav';
import songdata from './songdata.json';
import moviedata from './moviedata.json';
import summerdata from './summerdata.json';

export default function Shortlist() {
  const [tab, setTab] = useState('songs');
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
            <button onClick={() => setTab('songs')} className={tabClass('songs')}>
              song of the month
            </button>
            <button onClick={() => setTab('movies')} className={tabClass('movies')}>
              movie of the month
            </button>
            <button onClick={() => setTab('summer')} className={tabClass('summer')}>
              summer
            </button>
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

          {tab === 'summer' && (
            <div className="space-y-1">
              {summerdata.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 py-2 border-b border-dashed border-landing-border"
                >
                  <span
                    aria-hidden="true"
                    className={`inline-flex h-5 w-5 shrink-0 items-center justify-center border ${
                      item.done
                        ? 'border-landing-secondary bg-landing-muted/10 text-landing-secondary'
                        : 'border-landing-muted'
                    }`}
                  >
                    {item.done && (
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
                      item.done
                        ? 'text-landing-muted line-through'
                        : 'text-landing-primary'
                    }`}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          )}

          {tab !== 'summer' && (
            <p className="font-sans text-xs text-landing-muted mt-10">
              *not necessarily released that month, just my favorite discovery/revisit at the time
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
