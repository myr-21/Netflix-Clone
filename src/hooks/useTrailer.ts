// Netflix Clone UI, Production-Grade, Not a Toy
// Custom Hook for Trailer

import { useState, useEffect } from 'react';
import { Trailer } from '@/types';
import { tmdbService } from '@/services/tmdb';

interface UseTrailerResult {
  trailer: Trailer | null;
  isLoading: boolean;
  error: string | null;
}

export const useTrailer = (movieId: number | null): UseTrailerResult => {
  const [trailer, setTrailer] = useState<Trailer | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) {
      setTrailer(null);
      return;
    }

    const fetchTrailer = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const trailers = await tmdbService.getMovieTrailers(movieId);
        setTrailer(trailers.length > 0 ? trailers[0] : null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch trailer');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrailer();
  }, [movieId]);

  return { trailer, isLoading, error };
};
