"use client";

import React from 'react';
import TerminalNav from '../../components/TerminalNav';

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <TerminalNav currentPage="portfolio" />

      <main className="relative z-10 max-w-2xl mx-auto px-6 min-h-[calc(100vh-60px)] flex flex-col justify-center">
        <div className="text-center -mt-20 font-mono">
          <div className="mb-8">
            <pre className="text-zinc-700 text-xs sm:text-sm leading-tight select-none">
{`    _____ _____ _____ _____
   |   __|     |     |   | |
   |__   |  |  |  |  | | | |
   |_____|_____|_____|_|___|`}
            </pre>
          </div>
          <p className="text-emerald-400 mb-2">$ cat portfolio.txt</p>
          <p className="text-zinc-400 mb-8">
            Coming soon. Check back later for a showcase of my work.
          </p>
          <div className="text-zinc-500 mb-4">
            <p>In the meantime:</p>
          </div>
          <a
            href="https://github.com/aadit2805"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-800 text-zinc-100 border border-zinc-700 rounded-lg text-sm font-mono hover:bg-zinc-700 hover:border-zinc-600 transition-all"
          >
            <span className="text-emerald-400">$</span> open github.com/aadit2805
          </a>
        </div>
      </main>
    </div>
  );
}
