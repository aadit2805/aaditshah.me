"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

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
    <>
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

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
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

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full hover:bg-bone-200/50 transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              <span className={`block w-5 h-0.5 bg-espresso-900 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
              <span className={`block w-5 h-0.5 bg-espresso-900 mt-1 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-espresso-900 mt-1 transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-espresso-900/20 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-20 left-4 right-4 bg-bone-50 rounded-2xl shadow-xl border border-bone-200 p-6 transition-all duration-300 ${
            mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <div className="flex flex-col gap-2">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 ${
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
              className="mt-2 px-4 py-3 text-base font-medium text-center text-bone-100 bg-espresso-900 rounded-xl hover:bg-espresso-800 transition-colors"
              aria-label="Resume (opens in new tab)"
            >
              Resume
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
