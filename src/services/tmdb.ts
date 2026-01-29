// Netflix Clone UI, Production-Grade, Not a Toy
// TMDB API Service

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

if (!API_KEY) {
  console.error('VITE_TMDB_API_KEY is not set in environment variables');
}

export interface Movie {
  id: number;
  title: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  genre_ids?: number[];
  genres?: Genre[];
  popularity: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetails extends Movie {
  runtime?: number;
  genres: Genre[];
  production_companies?: Array<{
    id: number;
    name: string;
    logo_path: string | null;
  }>;
}

export interface Trailer {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface ApiResponse<T> {
  results: T[];
  page: number;
  total_pages: number;
  total_results: number;
}

class TMDBService {
  private async fetchAPI<T>(endpoint: string): Promise<T> {
    if (!API_KEY) {
      throw new Error('TMDB API key is not configured. Please set VITE_TMDB_API_KEY in your .env file.');
    }

    const url = `${BASE_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${API_KEY}`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`TMDB API error: ${response.status} ${response.statusText}. ${errorData.status_message || ''}`);
      }
      
      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to fetch data from TMDB API');
    }
  }

  getImageUrl(path: string | null, size: 'w200' | 'w300' | 'w500' | 'w780' | 'w1280' | 'original' = 'w500'): string {
    if (!path) {
      return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzE0MTQxNCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM2NjY2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
    }
    return `${IMAGE_BASE_URL}/${size}${path}`;
  }

  async getTrendingMovies(): Promise<Movie[]> {
    const data = await this.fetchAPI<ApiResponse<Movie>>('/trending/movie/day');
    return data.results;
  }

  async getPopularMovies(): Promise<Movie[]> {
    const data = await this.fetchAPI<ApiResponse<Movie>>('/movie/popular');
    return data.results;
  }

  async getTopRatedMovies(): Promise<Movie[]> {
    const data = await this.fetchAPI<ApiResponse<Movie>>('/movie/top_rated');
    return data.results;
  }

  async getNetflixOriginals(): Promise<Movie[]> {
    // Simulate Netflix Originals by filtering for high popularity movies
    const data = await this.fetchAPI<ApiResponse<Movie>>('/discover/movie?sort_by=popularity.desc&with_networks=213');
    return data.results;
  }

  async getMovieDetails(movieId: number): Promise<MovieDetails> {
    return this.fetchAPI<MovieDetails>(`/movie/${movieId}`);
  }

  async getSimilarMovies(movieId: number): Promise<Movie[]> {
    const data = await this.fetchAPI<ApiResponse<Movie>>(`/movie/${movieId}/similar`);
    return data.results;
  }

  async searchMovies(query: string): Promise<Movie[]> {
    const encodedQuery = encodeURIComponent(query);
    const data = await this.fetchAPI<ApiResponse<Movie>>(`/search/movie?query=${encodedQuery}`);
    return data.results;
  }

  async getMovieTrailers(movieId: number): Promise<Trailer[]> {
    const data = await this.fetchAPI<{ results: Trailer[] }>(`/movie/${movieId}/videos`);
    return data.results.filter(trailer => trailer.type === 'Trailer' && trailer.site === 'YouTube');
  }
}

export const tmdbService = new TMDBService();
