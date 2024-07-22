import React from 'react';
import Link from 'next/link';
import '../app/globals.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faSun, faMoon);

const Navbar = ({ isDarkMode, toggleTheme }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-opacity-100">
      <div className="flex items-center space-x-3">
        <Link href="/" legacyBehavior>
          <a className="ml-3 nav-link">Aadit Shah</a>
        </Link>
        <button 
          onClick={toggleTheme} 
          className="nav-button text-lg font-semibold" 
          aria-label={isDarkMode ? 'Change to light theme' : 'Change to dark theme'}
        >
          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
        </button>
      </div>
      <div className="flex items-center space-x-3">
        <Link href="/music" legacyBehavior>
          <a className="nav-link">Music</a>
        </Link>
        <Link href="/reviews" legacyBehavior>
          <a className="nav-link">Reviews</a>
        </Link>
        <Link href="/resume.pdf" legacyBehavior>
          <a className="nav-link" target="_blank" rel="noopener noreferrer">Resume</a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
