import React from 'react';
import T from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from './hero.module.scss';
import StarRating from '../StarRating/StarRating';
import getImageUrl from '../../utils/getImageUrl';
import useFavourite from '../../hooks/useFavourite';

const Hero = ({ movie }) => {
  const { handleFavourite, isFavourite } = useFavourite();
  const navigate = useNavigate();
  const onTrailerClick = () => {
    navigate(`/trailer/${movie.id}`);
  };

  return (
    <div
      className="h-[100vh] lg:h-[85vh] max-h-[700px] lg:max-h-[1000px] relative"
      data-testid="hero"
    >
      <div className={styles.topGradient} />
      {movie.poster_path ? (
        <img
          className="h-full w-full object-cover"
          src={getImageUrl(movie.poster_path, 1280)}
          alt=""
        />
      ) : (
        <div className="w-full h-full bg-black" />
      )}
      <div className={styles.bottomGradient} />
      <div className="w-full absolute px-10 lg:px-[15%] top-[15vh]">
        <div className="text-4 mb-1 lg:mb-6">
          {movie.release_date && (
            <span>{new Date(movie.release_date).getFullYear()}</span>
          )}
          {movie.genres && <span> • {movie.genres.join(', ')}</span>}
        </div>
        <div className="flex items-center w-full justify-between mb-5">
          <p className="text-[42px] leading-[36px] lg:text-[64px] lg:leading-[75px] uppercase flex-1 line-clamp-3 lg:line-clamp-2">
            {movie.title}
          </p>
          <div className="float-right rounded-full px-3 py-1 w-fit border-[1.5px] border-solid border-[#92AAD7] text-[8.5px] lg:text-[14px] leading-[10px] lg:leading-[16px]">
            PG-13
          </div>
        </div>

        <div className="flex items-center mb-5 lg:mb-[48px] flex-col lg:flex-row w-full gap-1 lg:gap-[64px]">
          <div className="bg-[#FF056C] rounded-lg px-2 text-[14px] order-1">
            2.30h
          </div>
          <div className="flex flex-row order-3 lg:order-2">
            <img
              src="/images/director.png"
              alt=""
              className="w-[21px] h-[23px] mr-[9px]"
            />
            <span className="text-[16px] block">Quentin Tarantino</span>
          </div>
          <StarRating
            rating={movie.vote_average}
            className="order-2 lg:order-3"
          />
        </div>

        <p className="text-md lg:text-lg lg:mb-[85px] mb-5 line-clamp-8">
          {movie.overview}
        </p>

        <div className="flex items-center w-full flex-col lg:flex-row gap-2 lg:gap-[60px]">
          <div className="flex items-center justify-between w-full lg:w-auto lg:gap-[60px] cursor-pointer">
            <div
              className="flex items-center bg-[#D8D8D8]/[.3] px-2"
              onClick={() => handleFavourite(movie)}
            >
              <img
                src="/images/mark-hero.png"
                alt=""
                className="w-[14px] h-[18px] mr-4"
              />
              <p className="text-[18px] text-[#92AAD7]">
                {isFavourite(movie.id) ? 'Added to Watch Later' : 'Watch Later'}
              </p>
            </div>
            <div className="flex items-center" onClick={onTrailerClick}>
              <img
                src="/images/play-hero.png"
                alt=""
                className="w-5 h-5 mr-4"
              />
              <p className="text-[18px] text-[#92AAD7]">Watch Trailer</p>
            </div>
          </div>
          <img src="/images/imdb.png" alt="" />
          <img src="/images/volume.png" className="ml-auto" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Hero;

Hero.propTypes = {
  movie: T.shape({
    poster_path: T.string,
    release_date: T.string,
    title: T.string,
    overview: T.string,
    genres: T.arrayOf(T.string),
    id: T.number,
    vote_average: T.number,
  }),
};

Hero.defaultProps = {
  movie: {},
};
