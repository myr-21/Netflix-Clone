// Netflix Clone UI, Production-Grade, Not a Toy
// Custom Hook for Movie Details

import { useState, useEffect } from 'react';
import { MovieDetails } from '@/types';
import { tmdbService } from '@/services/tmdb';

interface UseMovieDetailsResult {
  movie: MovieDetails | null;
  isLoading: boolean;
  error: string | null;
}

export const useMovieDetails = (movieId: number | null): UseMovieDetailsResult => {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) {
      setMovie(null);
      return;
    }

    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await tmdbService.getMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch movie details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  return { movie, isLoading, error };
};
