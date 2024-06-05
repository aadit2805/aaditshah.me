// src/app/nav.js
import Link from 'next/link';

const Nav = () => {
  return (
    <nav className="bg-black border-b border-gray-200 px-4 py-2 flex justify-between items-center">
      <div className="text-xl font-semibold text-white">
        <Link href="/" legacyBehavior>
          <a className="text-white hover:text-gray-300">aadit shah</a>
        </Link>
      </div>
      <div className="space-x-8">
        <a href="/static/resume.pdf" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
          Resume
        </a>
        <Link href="/aboutme" legacyBehavior>
          <a className="text-white hover:text-gray-300">About Me</a>
        </Link>
        <Link href="/portfolio" legacyBehavior>
          <a className="text-white hover:text-gray-300">Portfolio</a>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
