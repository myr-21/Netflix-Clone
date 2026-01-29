// Netflix Clone UI, Production-Grade, Not a Toy
// Home Page

import { useState, useEffect } from 'react';
import HeroBanner from '@/components/HeroBanner';
import MovieRow from '@/components/MovieRow';
import Loader from '@/components/Loader';
import {
  useTrendingMovies,
  usePopularMovies,
  useTopRatedMovies,
  useNetflixOriginals,
} from '@/hooks/useMovies';
import { Movie } from '@/types';

const Home: React.FC = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);

  const trending = useTrendingMovies();
  const popular = usePopularMovies();
  const topRated = useTopRatedMovies();
  const originals = useNetflixOriginals();

  useEffect(() => {
    // Set featured movie from trending
    if (trending.movies.length > 0 && !featuredMovie) {
      setFeaturedMovie(trending.movies[0]);
    }
  }, [trending.movies, featuredMovie]);

  useEffect(() => {
    // Hide loader after initial load
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (showLoader) {
    return <Loader letter="N" onComplete={() => setShowLoader(false)} />;
  }

  // Check for API errors
  const hasError = trending.error || popular.error || topRated.error || originals.error;
  const errorMessage = trending.error || popular.error || topRated.error || originals.error;

  return (
    <div className="min-h-screen bg-netflix-black pt-[68px]">
      {/* Error Banner */}
      {hasError && (
        <div className="bg-red-900/50 border-b border-red-700 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <p className="text-red-200 text-sm">
                <strong>API Error:</strong> {errorMessage}
              </p>
              <p className="text-red-300 text-xs mt-1">
                Please check your API key in the .env file. The current key format looks like a RapidAPI key, but TMDB requires a different format.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Hero Banner */}
      {featuredMovie && <HeroBanner movie={featuredMovie} />}

      {/* Movie Rows */}
      <div className="pt-6 md:pt-8 pb-12">
        <MovieRow
          title="Netflix Originals"
          movies={originals.movies}
          isLoading={originals.isLoading}
          id="row-originals"
        />
        <MovieRow
          title="Popular Movies"
          movies={popular.movies}
          isLoading={popular.isLoading}
          id="row-popular"
        />
        <MovieRow
          title="Trending Now"
          movies={trending.movies}
          isLoading={trending.isLoading}
          id="row-trending"
        />
        <MovieRow
          title="Top Rated"
          movies={topRated.movies}
          isLoading={topRated.isLoading}
          id="row-toprated"
        />
      </div>
    </div>
  );
};

export default Home;
