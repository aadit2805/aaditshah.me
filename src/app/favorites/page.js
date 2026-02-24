'use client';

import { useState } from 'react';
import MinimalNav from '../../components/MinimalNav';
import songdata from './songdata.json';
import moviedata from './moviedata.json';

export default function Favorites() {
  const [tab, setTab] = useState('songs');
  const songs = [...songdata].reverse();
  const movies = [...moviedata].reverse();

  return (
    <div className="min-h-screen bg-landing-bg">
      <MinimalNav currentPage="favorites" />
      <main>
        <div className="max-w-2xl mx-auto px-8 pb-24">
          <div className="flex gap-6 mb-6">
            <button
              onClick={() => setTab('songs')}
              className={`font-sans text-sm transition-colors ${
                tab === 'songs'
                  ? 'text-landing-primary'
                  : 'text-landing-muted hover:text-landing-secondary'
              }`}
            >
              song of the month
            </button>
            <button
              onClick={() => setTab('movies')}
              className={`font-sans text-sm transition-colors ${
                tab === 'movies'
                  ? 'text-landing-primary'
                  : 'text-landing-muted hover:text-landing-secondary'
              }`}
            >
              movie of the month
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

          <p className="font-sans text-xs text-landing-muted mt-10">
            *not necessarily released that month, just my favorite discovery/revisit at the time
          </p>
        </div>
      </main>
    </div>
  );
}
