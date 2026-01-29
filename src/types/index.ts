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
