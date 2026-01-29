// Netflix Clone UI, Production-Grade, Not a Toy
// Custom Hook for Search

import { useState, useEffect } from 'react';
import { Movie } from '@/types';
import { tmdbService } from '@/services/tmdb';

interface UseSearchResult {
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
}

export const useSearch = (query: string): UseSearchResult => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      setIsLoading(false);
      return;
    }

    const debounceTimer = setTimeout(async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await tmdbService.searchMovies(query);
        setMovies(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to search movies');
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  return { movies, isLoading, error };
};
