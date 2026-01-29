// Netflix Clone UI, Production-Grade, Not a Toy
// Movie Card Component

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '@/types';
import { tmdbService } from '@/services/tmdb';

interface MovieCardProps {
  movie: Movie;
  onHover?: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onHover }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (onHover) {
      onHover(movie);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const posterUrl = tmdbService.getImageUrl(movie.poster_path, 'w500');
  const rating = movie.vote_average.toFixed(1);

  return (
    <div
      className="flex-shrink-0 w-[200px] md:w-[250px] lg:w-[300px] transition-transform duration-300 ease-out relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered ? 'scale(1.08) translateY(-8px)' : 'scale(1)',
        zIndex: isHovered ? 10 : 1,
      }}
    >
      <Link 
        to={`/movie/${movie.id}`}
        className="block w-full h-full relative z-10"
      >
        <div className="relative w-full aspect-[2/3] rounded overflow-hidden group cursor-pointer pointer-events-auto shadow-lg">
          {/* Poster Image */}
          <img
            src={posterUrl}
            alt={movie.title || movie.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />

          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent transition-opacity duration-250 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

          {/* Hover Info */}
          {isHovered && (
            <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-black via-black/90 to-transparent animate-fadeIn">
              <h3 className="text-white font-semibold text-sm md:text-base mb-1.5 line-clamp-2 drop-shadow-lg">
                {movie.title || movie.name}
              </h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-white text-xs font-medium">{rating}</span>
                </div>
                <span className="text-gray-300 text-xs">
                  {movie.release_date?.split('-')[0] || movie.first_air_date?.split('-')[0]}
                </span>
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
