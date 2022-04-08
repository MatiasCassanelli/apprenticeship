import React from 'react';
import T from 'prop-types';
import { useNavigate } from 'react-router-dom';
import StarRating from '../StarRating/StarRating';

const Overview = ({
  overview,
  genres,
  id,
  className,
  rating,
  isFavourite,
  onMarkClick,
}) => {
  const navigate = useNavigate();
  const onTrailerClick = () => {
    navigate(`/trailer/${id}`);
  };
  return (
    <div className={className}>
      <div className="flex gap-[34px] mb-[32px]">
        <StarRating rating={rating} starClassName="w-[17px] h-[16px]" />
        <div className="float-right rounded-full px-3 py-1 w-fit border border-solid border-white text-[8.5px] lg:text-[14px] leading-[10px] lg:leading-[16px]">
          PG-13
        </div>
      </div>
      <p className="line-clamp-4 lg:line-clamp-5 text-md lg:text-xl mb-[32px] w-full lg:w-1/2">
        {overview}
      </p>
      <div className="flex items-center w-full flex-col lg:flex-row gap-2 lg:gap-[42px] mb-[32px] lg:mb-[46px]">
        <div
          className="flex items-center cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onMarkClick();
          }}
        >
          <img
            src="/images/mark-hero.png"
            alt=""
            className="w-[14px] h-[18px] mr-4"
          />
          <p className="text-[18px] text-[#92AAD7]">
            {isFavourite ? 'Added to Watch Later' : 'Watch Later'}
          </p>
        </div>
        <div
          className="flex items-center cursor-pointer"
          onClick={onTrailerClick}
        >
          <img src="/images/play-hero.png" alt="" className="w-5 h-5 mr-4" />
          <p className="text-[18px] text-[#92AAD7]">Watch Trailer</p>
        </div>
        <div className="flex items-center">
          <img src="/images/blue-share.png" alt="" className="w-5 h-5 mr-4" />
          <p className="text-[18px] text-[#92AAD7]">Share</p>
        </div>
      </div>
      <div className="flex w-full items-center mb-[32px] flex-wrap">
        {genres?.map((genre, index) => (
          <div key={genre} className="text-md flex items-center">
            {genre}
            {index !== genres.length - 1 && (
              <div className="rounded-full w-1 lg:w-2 h-1 lg:h-2 mx-2 lg:mx-4 bg-white" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;

Overview.propTypes = {
  overview: T.string,
  genres: T.arrayOf(T.string),
  className: T.string,
  id: T.number,
  rating: T.number,
  onMarkClick: T.func,
  isFavourite: T.bool,
};

Overview.defaultProps = {
  overview: '',
  genres: [],
  className: '',
  id: '',
  rating: 0,
  onMarkClick: () => {},
  isFavourite: false,
};
