"use client";

import Link from 'next/link';

export default function MinimalNav({ currentPage }) {
  return (
    <header className="flex items-baseline justify-between max-w-2xl mx-auto px-8 py-12 md:py-16">
      <Link href="/" className="font-sans font-bold text-xl md:text-2xl text-landing-primary hover:text-landing-hover transition-colors whitespace-nowrap shrink-0">
        Aadit Shah
      </Link>
      <nav className="flex gap-4 sm:gap-8 text-sm sm:text-base">
        <Link
          href="/portfolio"
          className={`font-sans transition-colors ${currentPage === 'projects' ? 'text-landing-primary' : 'text-landing-muted hover:text-landing-hover'}`}
        >
          projects
        </Link>
        <Link
          href="/reviews"
          className={`font-sans transition-colors ${currentPage === 'reviews' ? 'text-landing-primary' : 'text-landing-muted hover:text-landing-hover'}`}
        >
          reviews
        </Link>
        <Link
          href="/resume"
          className={`font-sans transition-colors ${currentPage === 'resume' ? 'text-landing-primary' : 'text-landing-muted hover:text-landing-hover'}`}
        >
          resume
        </Link>
      </nav>
    </header>
  );
}
