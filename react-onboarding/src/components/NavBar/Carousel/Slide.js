import React from 'react';
import T from 'prop-types';
import './Slide.scss';

const Slide = ({ imageSrc, title, onClick }) => (
  <div className="h-[303px] flex items-center" onClick={onClick}>
    <div className="film-details w-[270px] h-[150px] md:w-[301px] md:h-[165px] hover:w-[320px] hover:h-[180px] md:hover:w-[553px] md:hover:h-[303px]">
      <div className="details w-full">
        <div className="flex">
          <div className="flex flex-1 items-center">
            <img
              src="/images/mark.png"
              className="w-[14px] h-[18px] mr-3"
              alt=""
            />
            <img
              src="/images/share.png"
              className="w-[14.5px] h-[15px]"
              alt=""
            />
          </div>

          <div className="rating rounded-full px-3 py-1 w-fit border border-solid border-white text-[8.5px] leading-[10px] opacity-[0.51]">
            PG-13
          </div>
        </div>
        <p className="text-xl mt-[48px] mb-[12px]">{title}</p>
        <div className="flex">
          <img className="w-[11px] h-2.5" src="/images/round-star.png" alt="" />
          <img className="w-[11px] h-2.5" src="/images/round-star.png" alt="" />
          <img className="w-[11px] h-2.5" src="/images/round-star.png" alt="" />
          <img className="w-[11px] h-2.5" src="/images/round-star.png" alt="" />
          <img
            className="w-[11px] h-2.5"
            src="/images/round-star_half.png"
            alt=""
          />
        </div>
        <div className="flex w-full justify-between items-center mt-[15px]">
          <p className="text-[10px] leading-[12px]">
            Kids • Fantasy Movie • Action
          </p>
          <img src="/images/play.png" alt="" />
        </div>
      </div>
      <img className="h-full w-full" src={imageSrc} alt="" />
    </div>
  </div>
);

export default Slide;

Slide.propTypes = {
  imageSrc: T.string,
  title: T.string,
  onClick: T.func,
};

Slide.defaultProps = {
  imageSrc: '',
  title: '',
  onClick: () => {},
};
