import React from 'react';
import T from 'prop-types';
import styles from './recommendation.module.scss';

const BASE_URL = 'https://image.tmdb.org/t/p/w300';

const Overview = ({ movie }) => (
  <div className="relative h-[700px] mb-[30px]">
    <div className={styles.gradient} />
    <img
      src={`${BASE_URL}${movie.poster_path}`}
      className="h-full w-full object-cover"
      alt=""
    />
    <div className="w-full absolute top-0 pt-[95px] pl-[72px]">
      <p className="text-[40px] leading-[48px] mb-[13px]">A Movy Film</p>
      <p className="text-[60px] leading-[72px] mb-[19px] w-1/2 line-clamp-2">
        {movie.title}
      </p>
      <div className="flex gap-[34px] mb-[32px]">
        <div className="flex items-center">
          <img
            className="w-[17px] h-[16px]"
            src="/images/round-star.png"
            alt=""
          />
          <img
            className="w-[17px] h-[16px]"
            src="/images/round-star.png"
            alt=""
          />
          <img
            className="w-[17px] h-[16px]"
            src="/images/round-star.png"
            alt=""
          />
          <img
            className="w-[17px] h-[16px]"
            src="/images/round-star.png"
            alt=""
          />
          <img
            className="w-[17px] h-[16px]"
            src="/images/round-star_half.png"
            alt=""
          />
        </div>
        <div className="float-right rounded-full px-3 py-1 w-fit border border-solid border-white text-[8.5px] lg:text-[14px] leading-[10px] lg:leading-[16px]">
          PG-13
        </div>
      </div>
      <p className="line-clamp-4 text-xl mb-[32px] w-1/2">{movie.overview}</p>
      <div className="flex items-center w-full flex-col lg:flex-row gap-2 lg:gap-[42px]">
        <div className="flex items-center justify-between w-full lg:w-auto lg:gap-[42px]">
          <div className="flex items-center">
            <img
              src="/images/mark-hero.png"
              alt=""
              className="w-[14px] h-[18px] mr-4"
            />
            <p className="text-[18px] text-[#92AAD7]">Watch Later</p>
          </div>
          <div className="flex items-center">
            <img src="/images/play-hero.png" alt="" className="w-5 h-5 mr-4" />
            <p className="text-[18px] text-[#92AAD7]">Watch Trailer</p>
          </div>
          <div className="flex items-center">
            <img src="/images/blue-share.png" alt="" className="w-5 h-5 mr-4" />
            <p className="text-[18px] text-[#92AAD7]">Share</p>
          </div>
        </div>
      </div>
    </div>
    <div className="absolute bottom-[15px] w-full flex justify-center gap-[59px]">
      <div className="flex items-center flex-col gap-[10px]">
        <p className="text-[16px]">OVERVIEW</p>
        <div className="bg-[#FF056C] h-[5px] w-full" />
      </div>
      <div className="flex items-center flex-col gap-[14px]">
        <p className="text-[16px]">MORE LIKE THIS</p>
      </div>
      <div className="flex items-center flex-col gap-[14px]">
        <p className="text-[16px]">DETAILS</p>
      </div>
    </div>
  </div>
);

export default Overview;

Overview.propTypes = {
  movie: T.shape({
    poster_path: T.string,
    release_date: T.string,
    title: T.string,
    overview: T.string,
    genres: T.arrayOf(T.string),
  }),
};

Overview.defaultProps = {
  movie: {},
};
