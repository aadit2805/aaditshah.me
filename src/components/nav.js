import Link from 'next/link';

const Nav = () => {
  return (
    <nav className="bg-black border-b border-gray-200 px-4 py-2 flex justify-between items-center">
      <div className="text-xl font-semibold text-white">
        <Link href="/" className="text-white hover:text-gray-300">
          aadit shah
        </Link>
      </div>
      <div className="space-x-8">
        <a href="/static/resume.pdf" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
          resume
        </a>
        <Link href="/portfolio" className="text-white hover:text-gray-300">
          portfolio
        </Link>
        <Link href="/reviews" className="text-white hover:text-gray-300">
          reviews
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
