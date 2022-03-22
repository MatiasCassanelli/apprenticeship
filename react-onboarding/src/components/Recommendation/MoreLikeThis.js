import React from 'react';
import T from 'prop-types';
import './recommendation.module.scss';
import Carousel from '../Carousel/Carousel';

const MoreLikeThis = ({ title, movies, className }) => (
  <div
    className={`w-full absolute top-0 pt-[40px] lg:pt-[95px] px-[20px] lg:pl-[72px] lg:pr-0 ${className}`}
  >
    <p className="text-xl lg:text-[40px] lg:leading-[48px] mb-[8px] lg:mb-[13px]">
      A Movy Film
    </p>
    <p className="text-4xl lg:text-[60px] lg:leading-[72px] mb-[19px] w-full lg:w-1/2 line-clamp-2">
      {title}
    </p>
    {movies.length && (
      <Carousel slides={movies} enableAnimation={false} className="gap-6" />
    )}
  </div>
);

export default MoreLikeThis;

MoreLikeThis.propTypes = {
  title: T.string,
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
  title: '',
  movies: [],
  className: '',
};
