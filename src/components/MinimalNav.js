"use client";

import Link from 'next/link';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from '@/components/ui/sheet';

const navLinks = [
  { href: '/portfolio', label: 'projects', key: 'projects' },
  { href: '/favorites', label: 'favorites', key: 'favorites' },
  { href: '/reviews', label: 'reviews', key: 'reviews' },
  { href: '/resume', label: 'resume', key: 'resume' },
];

export default function MinimalNav({ currentPage }) {
  return (
    <header className="max-w-2xl mx-auto px-8 py-12 md:py-16">
      <div className="flex items-baseline justify-between">
        <Link href="/" className="font-sans font-bold text-xl md:text-2xl text-landing-primary hover:text-landing-hover transition-colors whitespace-nowrap shrink-0">
          Aadit Shah
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex gap-8 text-base">
          {navLinks.map(({ href, label, key }) => (
            <Link
              key={key}
              href={href}
              className={`font-sans transition-colors ${currentPage === key ? 'text-landing-primary' : 'text-landing-muted hover:text-landing-hover'}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile nav */}
        <Sheet>
          <SheetTrigger asChild>
            <button
              className="sm:hidden text-landing-muted hover:text-landing-primary transition-colors"
              aria-label="Open menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[260px] bg-bone-100 border-bone-300 p-0"
          >
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <nav className="flex flex-col gap-1 px-6 pt-16">
              {navLinks.map(({ href, label, key }) => (
                <Link
                  key={key}
                  href={href}
                  className={`font-sans text-lg py-3 border-b border-bone-300/60 transition-colors ${
                    currentPage === key
                      ? 'text-landing-primary font-medium'
                      : 'text-landing-muted hover:text-landing-hover'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
