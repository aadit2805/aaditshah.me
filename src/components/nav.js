"use client";

import React from 'react';
import Link from 'next/link';
import '../app/globals.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ isDarkMode, theme, toggleTheme }) => {
  const isThemeDark = isDarkMode || theme === 'dark';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-opacity-100">
      <div className="flex items-center space-x-3">
        <Link href="/" className="ml-3 nav-link">
          Aadit Shah
        </Link>
        <button 
          onClick={toggleTheme} 
          className="nav-button text-lg font-semibold" 
          aria-label={isThemeDark ? 'Change to light theme' : 'Change to dark theme'}
        >
          <FontAwesomeIcon icon={isThemeDark ? faSun : faMoon} />
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/portfolio" className="nav-link">
          Portfolio
        </Link> 
        <Link href="/music" className="nav-link">
          Music
        </Link>
        <Link href="/reviews" className="nav-link">
          Reviews
        </Link>
        <Link href="/resume.pdf" className="nav-link" target="_blank" rel="noopener noreferrer">
          Resume
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;