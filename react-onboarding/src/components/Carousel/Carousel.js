import React, { useState, useRef, useEffect } from 'react';
import T from 'prop-types';
import Slide from './Slide';

const BASE_URL = 'https://image.tmdb.org/t/p/w300';
const SLIDE_WIDTH = 263;

const Carousel = ({ slides, title }) => {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      SLIDE_WIDTH * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const isDisabled = (direction) => {
    if (direction === 'prev') {
      return currentIndex <= 0;
    }

    if (direction === 'next' && carousel.current !== null) {
      return slides?.length <= currentIndex;
    }

    return false;
  };

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = SLIDE_WIDTH * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - SLIDE_WIDTH - 60
      : 0;
  }, []);

  return (
    <div className="carousel my-12 mx-auto">
      <h2 className="text-[28px] leading-8 font-bold mb-4 text-white">
        {title}
      </h2>
      <div className="relative overflow-hidden">
        <div className="flex justify-between absolute top left w-full h-full">
          <button
            type="button"
            onClick={movePrev}
            className="hover:bg-black/50 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
            disabled={isDisabled('prev')}
          >
            <span
              className="carousel-control-prev-icon inline-block bg-no-repeat"
              aria-hidden="true"
            />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            type="button"
            onClick={moveNext}
            className="hover:bg-black/50 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
            disabled={isDisabled('next')}
          >
            <span
              className="carousel-control-next-icon inline-block bg-no-repeat"
              aria-hidden="true"
            />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <div
          ref={carousel}
          className="relative flex gap-1 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0 pr-[60px]"
        >
          {slides.map((slide) => (
            <div key={slide.id} className="snap-always relative snap-start">
              <Slide
                title={slide.title}
                imageSrc={`${BASE_URL}${slide.poster_path}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;

Carousel.propTypes = {
  title: T.string,
  slides: T.arrayOf(
    T.shape({
      poster_path: T.string,
    }),
  ),
};

Carousel.defaultProps = {
  slides: [],
  title: T.string,
};
