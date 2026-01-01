"use client";

import React from 'react';
import Link from 'next/link';

const TerminalNav = ({ currentPage }) => {
  return (
    <div className="bg-zinc-950 border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors font-mono text-sm"
        >
          <span className="text-emerald-400">←</span>
          <span>cd ~</span>
        </Link>

        <div className="flex items-center gap-1 font-mono text-sm">
          <span className="text-zinc-600">aadit@portfolio:</span>
          <span className="text-blue-400">~/{currentPage}</span>
          <span className="text-zinc-600">$</span>
        </div>

        <div className="flex items-center gap-4 font-mono text-sm">
          <Link
            href="/reviews"
            className={`transition-colors ${currentPage === 'reviews' ? 'text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            reviews
          </Link>
          <Link
            href="/music"
            className={`transition-colors ${currentPage === 'music' ? 'text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            music
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TerminalNav;
