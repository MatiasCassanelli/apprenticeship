import React from 'react';
import T from 'prop-types';
import './recommendation.module.scss';

const Details = ({ cast, director, genres, className }) => (
  <div className={className}>
    <div className="block md:flex md:gap-[45px] lg:gap-[98px] md:mb-6">
      <div className="mb-6 md:mb-0">
        <p className="text-[17px] leading-[20px] text-[#D4D4D4] mb-3">
          Creator
        </p>
        <p className="text-[16px] leading-[19px]">{director}</p>
      </div>
      <div className="mb-6 md:mb-0">
        <p className="text-[17px] leading-[20px] text-[#D4D4D4] mb-3">Genres</p>
        {genres.map((genre) => (
          <p key={genre} className="text-[16px] leading-[19px]">
            {genre}
          </p>
        ))}
      </div>
      <div className="mb-6 md:mb-0">
        <p className="text-[17px] leading-[20px] text-[#D4D4D4] mb-[20px]">
          Maturity Ratings
        </p>
        <div className="rounded-full px-[19px] py-[7px] w-fit text-[14px] leading-[18px] bg-[#0578FF] mb-[20px]">
          PG-13
        </div>
        <p className="text-[16px] leading-[19px]">
          Recommended for ages 16 and up
        </p>
      </div>
    </div>
    <div>
      <p className="text-[17px] leading-[20px] text-[#D4D4D4] mb-3">Cast</p>
      {cast
        .filter((x) => x.order < 10)
        .map((actor) => (
          <p key={actor.id} className="text-[16px] leading-[19px]">
            {actor.name}
          </p>
        ))}
    </div>
  </div>
);

export default Details;

Details.propTypes = {
  cast: T.arrayOf(
    T.shape({
      name: T.string,
    }),
  ),
  director: T.string,
  genres: T.arrayOf(T.string),
  className: T.string,
};

Details.defaultProps = {
  cast: [],
  director: '',
  genres: [],
  className: '',
};
