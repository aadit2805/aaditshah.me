"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/music', label: 'Music' },
    { href: '/portfolio', label: 'Portfolio' },
  ];

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3'
          : 'py-4'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6">
        <div className={`flex items-center justify-between px-4 py-2 rounded-full transition-all duration-500 ${
          scrolled
            ? 'bg-bone-50/90 backdrop-blur-md shadow-sm border border-bone-200/50'
            : ''
        }`}>
          <Link
            href="/"
            className="font-serif text-lg font-medium text-espresso-900 hover:text-terracotta-600 transition-colors"
            aria-label="Home"
          >
            Aadit Shah
          </Link>

          <div className="flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`relative px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${
                  isActive(href)
                    ? 'text-terracotta-600 bg-terracotta-50'
                    : 'text-espresso-600 hover:text-espresso-900 hover:bg-bone-200/50'
                }`}
                aria-label={label}
              >
                {label}
              </Link>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-4 py-1.5 text-sm font-medium text-bone-100 bg-espresso-900 rounded-full hover:bg-espresso-800 transition-colors"
              aria-label="Resume (opens in new tab)"
            >
              Resume
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
