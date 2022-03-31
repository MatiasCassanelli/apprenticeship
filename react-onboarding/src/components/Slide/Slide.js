import React, { useState } from 'react';
import T from 'prop-types';

const Slide = ({ imageSrc, title, overview, onFocus, onClick, id }) => {
  const [isFocused, setIsFocused] = useState(false);
  const onSlideFocus = () => {
    onFocus();
    setIsFocused(true);
  };
  return (
    <div
      data-testid={`slide-${id}`}
      className="w-[270px] lg:w-[301px] h-[370px]"
      onMouseOver={onSlideFocus}
      onFocus={onSlideFocus}
      onMouseLeave={() => setIsFocused(false)}
      onClick={onClick}
    >
      <img
        className={`w-full h-[150px] mt-4 object-cover ${
          isFocused && 'transition ease-in-out delay-150 scale-110 duration-300'
        }`}
        src={imageSrc}
        alt={title}
      />
      <div className={`flex mt-4 items-start ${isFocused && 'font-semibold'}`}>
        <p className="line-clamp-2 text-[16px] leading-[25px] flex-1">
          {title}
        </p>
        <div className="flex items-center rating rounded-full py-[5px] px-[12px] w-fit border border-solid border-white text-[10px] leading-[13px] opacity-[0.51]">
          PG-13
        </div>
      </div>
      <p
        className={`text-sm line-clamp-5 text-[#CBCBCB] ${
          isFocused && 'font-semibold'
        }`}
      >
        {overview}
      </p>
    </div>
  );
};

export default Slide;

Slide.propTypes = {
  imageSrc: T.string,
  title: T.string,
  onFocus: T.func,
  onClick: T.func,
  overview: T.string,
  id: T.number,
};

Slide.defaultProps = {
  imageSrc: '',
  title: '',
  onFocus: () => {},
  onClick: () => {},
  overview: '',
  id: '',
};
