import React from 'react';
import T from 'prop-types';
import './recommendation.module.scss';
import Carousel from '../Carousel/Carousel';

const MoreLikeThis = ({ movies, className }) => (
  <div className={`w-full absolute top-0 ${className}`}>
    {movies.length && (
      <Carousel slides={movies} enableAnimation={false} className="gap-6" />
    )}
  </div>
);

export default MoreLikeThis;

MoreLikeThis.propTypes = {
  movies: T.arrayOf(
    T.shape({
      poster_path: T.string,
      release_date: T.string,
      title: T.string,
      overview: T.string,
      genres: T.arrayOf(T.string),
      id: T.number,
    }),
  ),
  className: T.string,
};

MoreLikeThis.defaultProps = {
  movies: [],
  className: '',
};
