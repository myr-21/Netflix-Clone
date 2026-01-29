// Netflix Clone UI, Production-Grade, Not a Toy
// Hero Banner Component

import { Movie } from '@/types';
import { tmdbService } from '@/services/tmdb';
import { Link } from 'react-router-dom';

interface HeroBannerProps {
  movie: Movie;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ movie }) => {
  const backdropUrl = tmdbService.getImageUrl(movie.backdrop_path, 'w1280');
  const rating = movie.vote_average.toFixed(1);

  return (
    <div className="relative w-full h-[56.25vw] min-h-[400px] max-h-[80vh] overflow-hidden">
      {/* Backdrop Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backdropUrl})`,
        }}
      >
        {/* Gradient Overlay - Netflix style */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end px-4 md:px-8 lg:px-12 pb-12 md:pb-20 lg:pb-28">
        <div className="max-w-[42rem]">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 text-white drop-shadow-2xl leading-[1.1]">
            {movie.title || movie.name}
          </h1>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-white font-semibold text-sm">{rating}</span>
            </div>
            <span className="text-white/70 text-sm font-medium">
              {movie.release_date?.split('-')[0] || movie.first_air_date?.split('-')[0]}
            </span>
          </div>

          <p className="text-white/90 text-sm md:text-base lg:text-lg mb-5 md:mb-6 line-clamp-3 md:line-clamp-4 leading-normal drop-shadow-lg max-w-[36rem]">
            {movie.overview}
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              to={`/movie/${movie.id}`}
              className="flex items-center justify-center gap-2 bg-white text-black px-6 py-2 md:px-7 md:py-2.5 rounded-[4px] font-semibold hover:bg-white/90 transition-colors duration-200 text-[15px] shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              Play
            </Link>
            <Link
              to={`/movie/${movie.id}`}
              className="flex items-center justify-center gap-2 bg-white/25 backdrop-blur-sm text-white px-6 py-2 md:px-7 md:py-2.5 rounded-[4px] font-semibold hover:bg-white/30 transition-colors duration-200 text-[15px]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              More Info
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
