import React, { useState, useRef, useEffect } from 'react';
import T from 'prop-types';
import AnimatedSlide from '../Slide/AnimatedSlide';
import VerticalAnimatedSlide from '../Slide/VerticalAnimatedSlide';
import Slide from '../Slide/Slide';

const BASE_URL = 'https://image.tmdb.org/t/p/w300';

const Carousel = ({
  slides,
  title,
  type,
  recommendedCarousel,
  onMovieSelect,
  resetFocus,
  enableAnimation,
  className,
  onSlideClick,
}) => {
  let slideWidth;
  let SlideComponent;
  const carousel = useRef(null);
  const [maxScrollWidth, setMaxScrollWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState();

  if (type === 'horizontal') {
    slideWidth = 270;
    SlideComponent = enableAnimation ? AnimatedSlide : Slide;
  }
  if (type === 'vertical') {
    slideWidth = 250;
    SlideComponent = enableAnimation ? VerticalAnimatedSlide : Slide;
  }

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      slideWidth * currentIndex <= maxScrollWidth
    ) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const isDisabled = (direction) => {
    if (slides.length * slideWidth < carousel.current?.clientWidth) {
      return true;
    }

    if (direction === 'prev') {
      return currentIndex <= 0;
    }

    if (direction === 'next' && carousel.current !== null) {
      return slides.length <= currentIndex;
    }

    return false;
  };

  useEffect(() => {
    if (resetFocus) {
      setSelectedMovie(null);
    }
  }, [resetFocus]);

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = slideWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    setMaxScrollWidth(
      carousel.current && carousel.current.scrollWidth > 0
        ? carousel.current.scrollWidth - carousel.current.offsetWidth
        : 0,
    );
  }, []);

  return slides.length ? (
    <div
      className="carousel mx-auto mb-6 lg:my-1.5 relative"
      data-testid="carousel"
    >
      <h2 className="text-[24px] lg:text-[28px] leading-8 font-bold lg:mb-4 text-white lg:absolute">
        {title}
      </h2>
      <div className="relative overflow-hidden">
        {/* Control begins */}
        <div className="flex justify-between absolute top left w-full h-full">
          <button
            data-testid="prev-button"
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
            data-testid="next-button"
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
        {/* Control ends */}
        {/* Carousel begins */}
        <div
          data-cy="carousel"
          ref={carousel}
          className={`relative flex gap-1 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0 pr-[60px] ${className}`}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="snap-always relative snap-center md:snap-start cursor-pointer"
            >
              {recommendedCarousel && slide === selectedMovie && (
                <img
                  src="/images/triangle.png"
                  alt=""
                  className="absolute bottom-[48px] left-[50%] -translate-x-[50%]"
                />
              )}
              <SlideComponent
                title={slide.title}
                imageSrc={`${BASE_URL}${slide.poster_path}`}
                genres={slide.genres}
                overview={slide.overview}
                onFocus={() => {
                  setSelectedMovie(slide);
                  onMovieSelect(slide);
                }}
                onClick={() => onSlideClick(slide.id)}
                shouldAnimateOnHover={!recommendedCarousel}
                noAnimatedClassName={`${
                  slide === selectedMovie && 'border-4 border-white box-content'
                }`}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Carousel ends */}
    </div>
  ) : null;
};

export default Carousel;

Carousel.propTypes = {
  title: T.string,
  slides: T.arrayOf(
    T.shape({
      poster_path: T.string,
      id: T.number,
    }),
  ),
  type: T.string,
  recommendedCarousel: T.bool,
  resetFocus: T.bool,
  enableAnimation: T.bool,
  onMovieSelect: T.func,
  onSlideClick: T.func,
  className: T.string,
};

Carousel.defaultProps = {
  slides: [],
  title: '',
  type: 'horizontal',
  recommendedCarousel: false,
  resetFocus: false,
  enableAnimation: true,
  onMovieSelect: () => {},
  onSlideClick: () => {},
  className: '',
};
