import React, { useState } from 'react';
import T from 'prop-types';
import Recommendation from '../Recommendation/Recommendation';
import Carousel from './Carousel';

const RecommendationCarousel = ({ slides, title, type }) => {
  const [selectedMovie, setSelectedMovie] = useState();
  return (
    <div>
      <Carousel
        slides={slides}
        title={title}
        type={type}
        onMovieSelect={(movie) => setSelectedMovie(movie)}
        resetFocus={selectedMovie === null}
        recommendedCarousel
      />
      {selectedMovie && (
        <Recommendation
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
};

export default RecommendationCarousel;

RecommendationCarousel.propTypes = {
  title: T.string,
  slides: T.arrayOf(
    T.shape({
      poster_path: T.string,
      release_date: T.string,
      title: T.string,
      overview: T.string,
      genres: T.arrayOf(T.string),
      id: T.number,
    }),
  ),
  type: T.string,
};

RecommendationCarousel.defaultProps = {
  slides: [],
  title: '',
  type: 'horizontal',
};
