import React, { useState } from 'react';
import T from 'prop-types';
import styles from './recommendation.module.scss';
import Overview from './Overview';

const BASE_URL = 'https://image.tmdb.org/t/p/w300';

const Recommendation = ({ movie, onClose }) => {
  const [selectedSection, setSelectedSection] = useState('overview');
  const getChildComponent = () => {
    const { title } = movie;
    if (selectedSection === 'overview') {
      const { overview, genres } = movie;
      return <Overview title={title} overview={overview} genres={genres} />;
    }
    return null;
  };
  return (
    <div className="relative h-[760px] mb-[30px]">
      <div className={styles.gradient} />
      <img
        src={`${BASE_URL}${movie.poster_path}`}
        className="h-full w-full object-cover"
        alt=""
      />
      <div
        onClick={onClose}
        className="absolute top-[22px] right-[36px] z-10 cursor-pointer"
      >
        <img className="w-[22px] h-[22px]" src="/images/close.png" alt="" />
      </div>
      {getChildComponent()}
      <div className="absolute bottom-[15px] w-full flex justify-center gap-[59px]">
        <div
          className="flex items-center flex-col gap-[10px]"
          onClick={() => setSelectedSection('overview')}
        >
          <p className="text-[16px]">OVERVIEW</p>
          {selectedSection === 'overview' && (
            <div className="bg-[#FF056C] h-[5px] w-full" />
          )}
        </div>
        <div
          className="flex items-center flex-col gap-[14px]"
          onClick={() => setSelectedSection('moreLikeThis')}
        >
          <p className="text-[16px]">MORE LIKE THIS</p>
          {selectedSection === 'moreLikeThis' && (
            <div className="bg-[#FF056C] h-[5px] w-full" />
          )}
        </div>
        <div
          className="flex items-center flex-col gap-[14px]"
          onClick={() => setSelectedSection('details')}
        >
          <p className="text-[16px]">DETAILS</p>
          {selectedSection === 'details' && (
            <div className="bg-[#FF056C] h-[5px] w-full" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Recommendation;

Recommendation.propTypes = {
  movie: T.shape({
    poster_path: T.string,
    release_date: T.string,
    title: T.string,
    overview: T.string,
    genres: T.arrayOf(T.string),
  }),
  onClose: T.func,
};

Recommendation.defaultProps = {
  movie: {},
  onClose: () => {},
};
