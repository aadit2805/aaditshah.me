"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/resume.pdf', label: 'Resume', external: true },
    { href: '/reviews', label: 'Reviews' },
    { href: '/music', label: 'Music' },
    { href: '/portfolio', label: 'Portfolio' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bone-100/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="font-serif text-lg font-medium text-espresso-900 hover:text-terracotta-600 transition-colors"
            aria-label="Home"
          >
            Aadit Shah
          </Link>

          <div className="flex items-center gap-1">
            {navLinks.map(({ href, label, external }, index) => (
              <React.Fragment key={href}>
                <Link
                  href={href}
                  className="px-3 py-1.5 text-sm font-medium text-espresso-600 hover:text-terracotta-600 transition-colors rounded-md hover:bg-bone-200/50"
                  {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                  aria-label={external ? `${label} (opens in new tab)` : label}
                >
                  {label}
                </Link>
                {index < navLinks.length - 1 && (
                  <span className="w-1 h-1 rounded-full bg-espresso-300 mx-1" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
