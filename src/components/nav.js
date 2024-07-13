import React from 'react';
import Link from 'next/link';
import '../app/globals.css'; // Ensure this is the correct path
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faSun, faMoon);

const Navbar = ({ isDarkMode, toggleTheme }) => {
  return (
    <nav className={`flex items-center justify-between p-4 ${isDarkMode ? 'bg-black' : 'bg-white'} shadow-md`}>
      <Link href="/" legacyBehavior>
        <a className="ml-4 text-lg font-semibold nav-link">{isDarkMode ? 'aadit shah' : 'aadit shah'}</a>
      </Link>
      <div className="flex items-center space-x-3">
        <Link href="/portfolio" legacyBehavior>
          <a className="nav-link text-lg font-semibold">{isDarkMode ? 'portfolio' : 'portfolio'}</a>
        </Link>
        <Link href="/reviews" legacyBehavior>
          <a className="nav-link text-lg font-semibold">{isDarkMode ? 'reviews' : 'reviews'}</a>
        </Link>
        <Link href="/resume.pdf" legacyBehavior>
          <a className="nav-link text-lg font-semibold" target="_blank" rel="noopener noreferrer">{isDarkMode ? 'resume' : 'resume'}</a>
        </Link>
        <button onClick={toggleTheme} className="nav-button text-lg font-semibold">
          {isDarkMode ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
