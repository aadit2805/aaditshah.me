"use client";

import React from 'react';
import Link from 'next/link';
import '../app/globals.css'; 
import { Sun, MoonStar } from 'lucide-react';

const Navbar = ({ theme, toggleTheme }) => {
  const isThemeDark = theme === 'dark';

  const navLinks = [
    { href: '/resume.pdf', label: 'Resume', external: true },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/music', label: 'Music' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-opacity-100 backdrop-blur-sm">
      <div className="flex items-center space-x-3">
        <Link 
          href="/" 
          className="ml-3 nav-link hover:text-orange-500"
          aria-label="Home"
        >
          Aadit Shah
        </Link>
        <button 
          onClick={toggleTheme} 
          className="nav-button p-2 rounded-full" 
          aria-label={isThemeDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isThemeDark ? <Sun size={20} /> : <MoonStar size={20} />}
        </button>
      </div>
      <div className="flex items-center space-x-4">
        {navLinks.map(({ href, label, external }) => (
          <Link
            key={href}
            href={href}
            className="nav-link hover:text-orange-500"
            {...(external && { target: "_blank", rel: "noopener noreferrer" })}
            aria-label={external ? `${label} (opens in new tab)` : label}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;