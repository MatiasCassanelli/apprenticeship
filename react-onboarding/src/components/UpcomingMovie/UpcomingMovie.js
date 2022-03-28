import React, { useEffect, useState } from 'react';
import T from 'prop-types';
import { getVideoUrl } from '../../services/movies';
import styles from './upcomingMovie.module.scss';

const BASE_URL = 'https://image.tmdb.org/t/p/w780';

const UpcomingMovie = ({ movie }) => {
  const [videoSrc, setVideoSrc] = useState('');
  const [releaseDate, setReleaseData] = useState('');

  useEffect(() => {
    const date = new Date(movie.release_date);
    const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(date);
    const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
    setReleaseData(`${month} ${day}`);
    getVideoUrl(movie.id).then((videoUrl) => {
      if (videoUrl) {
        setVideoSrc(videoUrl);
      }
    });
  }, [movie]);

  return (
    <div className="h-[800px] lg:h-[600px] w-full relative">
      <div className={styles.topGradient} />
      <img
        className="h-full w-full object-cover"
        src={`${BASE_URL}${movie.poster_path}`}
        alt=""
      />
      <div className={styles.bottomGradient} />
      <div className="absolute top-[34px] px-[17px] lg:h-[500px] w-full flex flex-wrap">
        {videoSrc && (
          <iframe
            title={movie.title}
            src={videoSrc}
            className="w-full lg:w-1/2 h-[350px] lg:h-full order-2 lg:order-1"
          />
        )}
        <div className="w-full lg:w-1/2 lg:px-[75px] lg:pt-[30px] order-1 lg:order-2">
          <div className="flex w-full justify-between items-start">
            <p className="text-xl lg:text-[30px] lg:leading-[38px] mb-[8px] lg:mb-[13px]">
              A Movy Film
            </p>
            <div className="float-right opacity-[0.45] rounded-full px-3 py-1 w-fit border-[1.5px] border-solid border-white text-[8.5px] lg:text-[14px] leading-[10px] lg:leading-[16px]">
              PG-13
            </div>
          </div>
          <p className="text-[42px] leading-[36px] lg:text-[50px] lg:leading-[60px] line-clamp-2 lg:line-clamp-3 mb-[30px] font-bold">
            {movie.title}
          </p>
          <div className="flex w-full items-center gap-[127px] mb-[14px]">
            <div className="flex items-center h-[48px] bg-[#D8D8D8]/[.3] w-[150px] justify-center">
              <img
                src="/images/mark-hero.png"
                alt=""
                className="w-[14px] h-[18px] mr-4"
              />
              <p className="text-[18px] text-[#92AAD7]">Watch Later</p>
            </div>
            <div className="flex">
              <div className="flex">
                <img
                  className="w-[11px] h-2.5 lg:w-[16px] lg:h-[15px]"
                  src="/images/round-star.png"
                  alt=""
                />
                <img
                  className="w-[11px] h-2.5 lg:w-[16px] lg:h-[15px]"
                  src="/images/round-star.png"
                  alt=""
                />
                <img
                  className="w-[11px] h-2.5 lg:w-[16px] lg:h-[15px]"
                  src="/images/round-star.png"
                  alt=""
                />
                <img
                  className="w-[11px] h-2.5 lg:w-[16px] lg:h-[15px]"
                  src="/images/round-star.png"
                  alt=""
                />
                <img
                  className="w-[11px] h-2.5 lg:w-[16px] lg:h-[15px]"
                  src="/images/round-star_half.png"
                  alt=""
                />
              </div>
            </div>
          </div>
          <p className="text-[30px] leading-[36px] mb-[14px]">
            Coming {releaseDate}
          </p>
          <p className="text-[20px] leading-[23px] mb-3 line-clamp-5">
            {movie.overview}
          </p>
          <img src="/images/imdb.png" className="mb-2" alt="" />
        </div>
      </div>
    </div>
  );
};

export default UpcomingMovie;

UpcomingMovie.propTypes = {
  movie: T.shape({
    poster_path: T.string,
    release_date: T.string,
    title: T.string,
    overview: T.string,
    genres: T.arrayOf(T.string),
    id: T.number,
  }),
};

UpcomingMovie.defaultProps = {
  movie: {},
};
