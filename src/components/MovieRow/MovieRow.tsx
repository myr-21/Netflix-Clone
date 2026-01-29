// Netflix Clone UI, Production-Grade, Not a Toy
// Movie Row Component

import { useRef, useState, useEffect } from 'react';
import { Movie } from '@/types';
import MovieCard from '@/components/MovieCard';
import { SkeletonCard } from '@/components/Skeleton';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  isLoading?: boolean;
  id?: string;
}

const MovieRow: React.FC<MovieRowProps> = ({ title, movies, isLoading, id }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (!rowRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      checkScrollability();
    }, 100);
    
    window.addEventListener('resize', checkScrollability);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkScrollability);
    };
  }, [movies]);

  const scroll = (direction: 'left' | 'right') => {
    if (!rowRef.current) return;
    const scrollAmount = rowRef.current.clientWidth * 0.8;
    const newScrollLeft =
      direction === 'left'
        ? rowRef.current.scrollLeft - scrollAmount
        : rowRef.current.scrollLeft + scrollAmount;

    rowRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });
  };

  if (isLoading) {
    return (
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-3 px-4 md:px-8 lg:px-12">
          {title}
        </h2>
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide px-4 md:px-8 lg:px-12">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div id={id} className="mb-8 relative group scroll-mt-20">
      <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-3 px-4 md:px-8 lg:px-12 text-[#e5e5e5]">
        {title}
      </h2>

      {/* Left Scroll Button */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-12 bottom-0 z-20 w-12 bg-netflix-black/80 hover:bg-netflix-black/95 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
          aria-label="Scroll left"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      {/* Right Scroll Button */}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-12 bottom-0 z-20 w-12 bg-netflix-black/80 hover:bg-netflix-black/95 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
          aria-label="Scroll right"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}

      {/* Movie Cards */}
      <div
        ref={rowRef}
        onScroll={checkScrollability}
        className="flex gap-2 md:gap-3 overflow-x-auto overflow-y-visible scrollbar-hide px-4 md:px-8 lg:px-12 scroll-smooth"
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
