import React from 'react';
import T from 'prop-types';
import './Slide.scss';

const VerticalSlide = ({ imageSrc, title, onClick }) => (
  <div className="h-[560px] lg:h-[625px] flex items-center" onClick={onClick}>
    <div className="film-details w-[250px] h-[430px] lg:w-[275px] lg:h-[473px] hover:w-[330px] hover:h-[560px] lg:hover:w-[363px] lg:hover:h-[625px]">
      <div className="mask" />
      <div className="details w-full">
        <img
          src="/images/outline-play.png"
          className="ml-auto w-[140px] h-[140px] lg:w-[152px] lg:h-[152px] play-icon"
          alt=""
        />
        <div className="float-right rounded-full px-3 py-1 w-fit border border-solid border-white text-[8.5px] lg:text-[14px] leading-[10px] lg:leading-[16px]">
          PG-13
        </div>
        <div className="absolute bottom-0 left-0 px-8 pb-9 w-full">
          <div className="flex items-center w-full justify-between ">
            <p className="text-2xl lg:text-[44px] lg:leading-[53px] my-0 flex-1">
              {title}
            </p>
            <div className="flex">
              <img className="w-3 h-3" src="/images/round-star.png" alt="" />
              <img className="w-3 h-3" src="/images/round-star.png" alt="" />
              <img className="w-3 h-3" src="/images/round-star.png" alt="" />
              <img className="w-3 h-3" src="/images/round-star.png" alt="" />
              <img
                className="w-3 h-3"
                src="/images/round-star_half.png"
                alt=""
              />
            </div>
          </div>
          <div className="flex mt-1 w-full justify-between">
            <div className="flex">
              <img
                src="/images/white-mark.png"
                className="w-[13px] h-[18px] lg:w-[15px] lg:h-[19px] mr-3"
                alt=""
              />
              Watch Later
            </div>
            <div className="flex">
              <img
                src="/images/white-share.png"
                className="w-[15px] h-[19px] lg:w-[19px] lg:h-[21px] mr-3"
                alt=""
              />
              Share
            </div>
          </div>
        </div>
      </div>
      <img className="h-full w-full object-cover" src={imageSrc} alt="" />
    </div>
  </div>
);

export default VerticalSlide;

VerticalSlide.propTypes = {
  imageSrc: T.string,
  title: T.string,
  onClick: T.func,
};

VerticalSlide.defaultProps = {
  imageSrc: '',
  title: '',
  onClick: () => {},
};