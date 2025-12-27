"use client";

import React from 'react';
import Link from 'next/link';
import Navbar from '../../components/nav';

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-bone-100 overflow-hidden">
      <div className="grain" />

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="blob blob-1 opacity-30" />
      </div>

      <Navbar />

      <main className="relative z-10 max-w-2xl mx-auto px-6 min-h-screen flex flex-col justify-center">
        <div className="text-center -mt-20">
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-espresso-900 mb-4">
            Coming Soon
          </h1>
          <p className="text-espresso-500 mb-8">
            Check back later for a showcase of my work.
          </p>
          <a
            href="https://github.com/aadit2805"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-espresso-900 text-bone-100 rounded-full text-sm font-medium hover:bg-espresso-800 transition-colors"
          >
            View GitHub
          </a>
        </div>
      </main>
    </div>
  );
}
