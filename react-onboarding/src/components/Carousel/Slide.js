import React from 'react';
import T from 'prop-types';
import styles from './slide.module.scss';

// eslint-disable-next-line react/prop-types
const Slide = ({
  imageSrc,
  title,
  onFocus,
  genres,
  shouldAnimateOnHover,
  noAnimatedClassName,
}) => (
  <div className="h-[180px] lg:h-[303px] flex items-center">
    <div
      onMouseOver={onFocus}
      onFocus={onFocus}
      className={`${
        styles['film-details']
      } w-[270px] h-[150px] lg:w-[301px] lg:h-[165px] ${
        shouldAnimateOnHover
          ? 'hover:w-[320px] hover:h-[180px] lg:hover:w-[553px] lg:hover:h-[303px]'
          : noAnimatedClassName
      }`}
    >
      {shouldAnimateOnHover && (
        <div
          className={`${styles.details} ${styles['darker-background']} w-full`}
        >
          <div className="flex">
            <div className="flex flex-1 items-center">
              <img
                src="/images/mark.png"
                className="w-[14px] h-[18px] lg:w-[22px] lg:h-[28px] mr-3"
                alt=""
              />
              <img
                src="/images/share.png"
                className="w-[14.5px] h-[15px]lg:w-[23px] lg:h-[25px]"
                alt=""
              />
            </div>

            <div className="flex items-center rating rounded-full px-3 py-1 w-fit border border-solid border-white text-[8.5px] lg:text-[14px] leading-[10px] lg:leading-[16px] opacity-[0.51]">
              PG-13
            </div>
          </div>
          <p className="text-xl lg:text-[44px] lg:leading-[53px] mt-[36px] lg:mt-[48px] mb-[12px]">
            {title}
          </p>
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
          <div className="flex w-full items-center mt-[15px] truncate">
            {genres.map((genre, index) => (
              <div
                key={genre}
                className="text-[10px] lg:text-[21px] leading-[15px] lg:leading-[25px] flex items-center"
              >
                {genre}
                {index !== genres.length - 1 && (
                  <div className="rounded-full w-1 lg:w-2 h-1 lg:h-2 mx-2 lg:mx-4 bg-white" />
                )}
              </div>
            ))}
            <img
              src="/images/play.png"
              className="ml-auto w-[26px] h-[26px] lg:w-[47px] lg:h-[47px]"
              alt=""
            />
          </div>
        </div>
      )}
      <img className="h-full w-full object-cover" src={imageSrc} alt="" />
    </div>
  </div>
);

export default Slide;

Slide.propTypes = {
  imageSrc: T.string,
  title: T.string,
  onFocus: T.func,
  genres: T.arrayOf(T.string),
  shouldAnimateOnHover: T.bool,
};

Slide.defaultProps = {
  imageSrc: '',
  title: '',
  onFocus: () => {},
  genres: [],
  shouldAnimateOnHover: true,
};
