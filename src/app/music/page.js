"use client";

import React from 'react';
import Navbar from '../../components/nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../lib/fontAwesome';
import { useTheme } from '../../hooks/useTheme';

export default function Music() {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return null;
  }

  const isDarkMode = theme === 'dark';

  return (
    <div className="min-h-screen transition-colors duration-0">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="flex flex-col items-center justify-center text-center font-inter pt-24">
        <section className="mb-12 w-full">
          <h1 className="text-4xl font-semibold">
            here is some of the <span className="neon-orange-gradient">music</span> i've been listening to lately!
          </h1>
          <div className="flex justify-center w-full mt-6 space-x-4">
            <iframe
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/playlist/2hJ9vjNCXEVrbPDmr8RRaY?utm_source=generator"
              width="32%"
              height="580"
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
            <iframe
              src="https://spotify-recently-played-readme.vercel.app/api?user=aadit2805&count=10"
              width="32%"
              height="580"
              allow="encrypted-media"
              title="Spotify Recently Played"
              className="rounded-lg"
            ></iframe>
            <iframe
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/playlist/2N0n81gJrPqZzFxeteHPUI?"
              width="32%"
              height="580"
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        </section>
      </main>
    </div>
  );
}