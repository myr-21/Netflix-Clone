// Netflix Clone UI, Production-Grade, Not a Toy
// Navbar Component

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goToRow = async (rowId: string) => {
    // If we're not on home, go home first then scroll.
    if (window.location.pathname !== '/') {
      navigate('/');
      // wait one paint
      await new Promise((r) => setTimeout(r, 50));
    }
    const el = document.getElementById(rowId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ease-in-out ${
        isScrolled ? 'bg-[#141414]' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-[68px]">
          {/* Logo */}
          <Link to="/" className="flex items-center py-4 -ml-1">
            <Logo />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-5">
            <Link
              to="/"
              className="text-white text-[14px] font-medium hover:text-gray-300 transition-colors duration-150"
            >
              Home
            </Link>
            <button
              onClick={() => goToRow('row-originals')}
              className="text-[#e5e5e5] text-[14px] font-normal hover:text-white transition-colors duration-150"
            >
              TV Shows
            </button>
            <button
              onClick={() => goToRow('row-popular')}
              className="text-[#e5e5e5] text-[14px] font-normal hover:text-white transition-colors duration-150"
            >
              Movies
            </button>
            <button
              onClick={() => goToRow('row-trending')}
              className="text-[#e5e5e5] text-[14px] font-normal hover:text-white transition-colors duration-150"
            >
              New & Popular
            </button>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-5">
            {/* Search Icon */}
            <button
              onClick={() => navigate('/search')}
              className="text-white hover:text-gray-300 transition-colors duration-150"
              aria-label="Search"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            
            {/* Profile Icon */}
            <div className="w-8 h-8 rounded bg-netflix-red flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors duration-200">
              <span className="text-white text-sm font-semibold">M</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
