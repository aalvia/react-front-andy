import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

interface StarRatingProps {
  rating: string;
  onRatingChange: (rating: string) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange }) => {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="flex items-center justify-center space-x-1">
      {[...Array(10)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index} className="cursor-pointer">
            <input
              type="radio"
              name="rating"
              value={ratingValue.toString()}
              onClick={() => onRatingChange(ratingValue.toString())}
              className="hidden"
            />
            <FaStar
              className={`star text-yellow-500 ${hover && hover >= ratingValue ? 'animate-pulse' : ''}`}
              color={(hover || Number(rating) || 0) >= ratingValue ? '#FFD700' : '#e4e5e9'}
              size={24} // Tamaño más pequeño para ajustarse mejor
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
