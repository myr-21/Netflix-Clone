// Netflix Clone UI, Production-Grade, Not a Toy
// Movie Details Page

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSimilarMovies } from '@/hooks/useMovies';
import { useMovieDetails } from '@/hooks/useMovieDetails';
import { useTrailer } from '@/hooks/useTrailer';
import MovieRow from '@/components/MovieRow';
import TrailerModal from '@/components/TrailerModal';
import Loader from '@/components/Loader';
import { tmdbService } from '@/services/tmdb';

const Movie: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const movieId = id ? parseInt(id, 10) : null;
  const [showLoader, setShowLoader] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);

  const { movie, isLoading, error } = useMovieDetails(movieId);
  const { movies: similarMovies, isLoading: isLoadingSimilar } = useSimilarMovies(movieId || 0);
  const { trailer } = useTrailer(movieId);

  useEffect(() => {
    if (!isLoading && movie) {
      const timer = setTimeout(() => setShowLoader(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading, movie]);

  if (showLoader || isLoading) {
    return <Loader letter="N" />;
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Movie Not Found</h1>
          <p className="text-gray-400">{error || 'The movie you are looking for does not exist.'}</p>
        </div>
      </div>
    );
  }

  const backdropUrl = tmdbService.getImageUrl(movie.backdrop_path, 'w1280');
  const rating = movie.vote_average.toFixed(1);
  const releaseYear = movie.release_date?.split('-')[0] || movie.first_air_date?.split('-')[0];

  return (
    <div className="min-h-screen bg-netflix-black">
      {/* Backdrop */}
      <div
        className="relative w-full h-[50vh] md:h-[70vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(${backdropUrl})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/80 to-transparent" />
      </div>

      {/* Movie Details */}
      <div className="relative -mt-32 md:-mt-48 px-4 md:px-8 lg:px-16 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Poster */}
            <div className="flex-shrink-0">
              <img
                src={tmdbService.getImageUrl(movie.poster_path, 'w500')}
                alt={movie.title || movie.name}
                className="w-full max-w-[300px] rounded-lg shadow-2xl"
              />
            </div>

            {/* Details */}
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
                {movie.title || movie.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="text-yellow-400 text-lg font-semibold">
                  ⭐ {rating}
                </span>
                <span className="text-gray-300">{releaseYear}</span>
                {movie.runtime && (
                  <span className="text-gray-300">{movie.runtime} min</span>
                )}
                {movie.genres && movie.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre: { id: number; name: string }) => (
                      <span
                        key={genre.id}
                        className="px-3 py-1 bg-gray-700 rounded-full text-sm text-white"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <p className="text-gray-300 text-base md:text-lg mb-6 leading-relaxed">
                {movie.overview}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowTrailer(true)}
                  className="bg-netflix-red text-white px-8 py-3 rounded font-semibold hover:bg-red-700 transition-colors duration-200"
                >
                  ▶ Play Trailer
                </button>
                <button
                  onClick={() => window.history.back()}
                  className="bg-gray-600/70 text-white px-8 py-3 rounded font-semibold hover:bg-gray-600/90 transition-colors duration-200"
                >
                  ← Back
                </button>
              </div>
            </div>
          </div>

          {/* Similar Movies */}
          {similarMovies.length > 0 && (
            <div className="mt-16">
              <MovieRow
                title="Similar Movies"
                movies={similarMovies}
                isLoading={isLoadingSimilar}
              />
            </div>
          )}
        </div>
      </div>

      {/* Trailer Modal */}
      {trailer && (
        <TrailerModal
          trailer={trailer}
          isOpen={showTrailer}
          onClose={() => setShowTrailer(false)}
        />
      )}
    </div>
  );
};

export default Movie;
