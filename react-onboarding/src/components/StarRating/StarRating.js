import React from 'react';
import T from 'prop-types';

const StarRating = ({ rating, className, starClassName }) => {
  const getStars = () => {
    const stars = [];
    const intRating = Math.floor(rating);
    const decimal = rating - intRating;
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < intRating; index++) {
      stars.push(
        <img
          className={`w-3 h-3 ${starClassName}`}
          src="/images/round-star.png"
          alt={`star-${index}`}
        />,
      );
    }
    if (decimal >= 0.5) {
      stars.push(
        <img
          className={`w-3 h-3 ${starClassName}`}
          src="/images/round-star_half.png"
          alt="half-star"
        />,
      );
    }
    return stars;
  };
  return (
    rating > 0 && (
      <div className={`flex items-center ${className}`}>
        {getStars().map((star, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index}>{star}</div>
        ))}
      </div>
    )
  );
};

export default StarRating;

StarRating.propTypes = {
  rating: T.number,
  className: T.string,
  starClassName: T.string,
};

StarRating.defaultProps = {
  rating: 0,
  className: '',
  starClassName: '',
};
