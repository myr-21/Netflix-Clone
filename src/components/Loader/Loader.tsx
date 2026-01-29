// Netflix Clone UI, Production-Grade, Not a Toy
// Netflix Loader Component - Original Animation (exact structure)

import { useEffect, useState } from 'react';

interface LoaderProps {
  letter?: 'N' | 'E' | 'T' | 'F' | 'L' | 'I' | 'X';
  onComplete?: () => void;
}

const Loader: React.FC<LoaderProps> = ({ letter = 'N', onComplete }) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
      if (onComplete) {
        setTimeout(onComplete, 300);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isAnimating) {
    return null;
  }

  const fur = Array.from({ length: 31 }, (_, i) => 31 - i);
  const lamps = Array.from({ length: 28 }, (_, i) => i + 1);

  return (
    <div id="container">
      {/* Edit the letter attr to: N, E, T, F, L, I or X */}
      <div data-component="netflixintro" data-letter={letter}>
        <div className="helper-1">
          <div className="effect-brush">
            {fur.map((n) => (
              <span key={`fur-1-${n}`} className={`fur-${n}`} />
            ))}
          </div>
          <div className="effect-lumieres">
            {lamps.map((n) => (
              <span key={`lamp-${n}`} className={`lamp-${n}`} />
            ))}
          </div>
        </div>
        <div className="helper-2">
          <div className="effect-brush">
            {fur.map((n) => (
              <span key={`fur-2-${n}`} className={`fur-${n}`} />
            ))}
          </div>
        </div>
        <div className="helper-3">
          <div className="effect-brush">
            {fur.map((n) => (
              <span key={`fur-3-${n}`} className={`fur-${n}`} />
            ))}
          </div>
        </div>
        <div className="helper-4">
          <div className="effect-brush">
            {fur.map((n) => (
              <span key={`fur-4-${n}`} className={`fur-${n}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
