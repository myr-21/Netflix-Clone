// Netflix Clone UI, Production-Grade, Not a Toy
// Search Page

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSearch } from '@/hooks/useSearch';
import MovieCard from '@/components/MovieCard';
import { SkeletonCard } from '@/components/Skeleton';
import Loader from '@/components/Loader';

const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [showLoader, setShowLoader] = useState(false);

  const { movies, isLoading, error } = useSearch(searchQuery);

  useEffect(() => {
    setSearchQuery(queryParam);
  }, [queryParam]);

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
    } else {
      const timer = setTimeout(() => setShowLoader(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    }
  };

  return (
    <div className="min-h-screen bg-netflix-black pt-24 pb-16">
      {showLoader && <Loader letter="N" />}

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Sticky Search Bar */}
        <div className="sticky top-20 z-30 bg-netflix-black/95 backdrop-blur-sm py-4 mb-8">
          <form onSubmit={handleSearch} className="flex gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for movies..."
              className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-6 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-netflix-red transition-colors duration-200"
            />
            <button
              type="submit"
              className="bg-netflix-red text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200"
            >
              Search
            </button>
          </form>
        </div>

        {/* Results */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-400 text-lg">{error}</p>
          </div>
        )}

        {!error && searchQuery && (
          <>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              {isLoading
                ? 'Searching...'
                : `Found ${movies.length} result${movies.length !== 1 ? 's' : ''}`}
            </h2>

            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {Array.from({ length: 10 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : movies.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">
                  No movies found for "{searchQuery}"
                </p>
              </div>
            )}
          </>
        )}

        {!searchQuery && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              Enter a search query to find movies
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
