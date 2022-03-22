import React, { useEffect, useState } from 'react';
import T from 'prop-types';
import styles from './recommendation.module.scss';
import Overview from './Overview';
import { getRelatedMovies } from '../../services/movies';
import MoreLikeThis from './MoreLikeThis';

const BASE_URL = 'https://image.tmdb.org/t/p/w300';

const Recommendation = ({ movie, onClose }) => {
  const [selectedSection, setSelectedSection] = useState('overview');
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    setSelectedSection('overview');
    getRelatedMovies(movie.id).then((res) => {
      setRelatedMovies(res);
    });
  }, [movie]);

  return (
    <div className="relative h-[640px] h-[850px] mb-[30px]">
      <div
        className={`w-full h-full ${styles.hide} ${isMounted && styles.show}`}
      >
        <div className={styles.gradient} />
        <img
          src={`${BASE_URL}${movie.poster_path}`}
          className="h-full w-full object-cover"
          alt=""
        />
        <div
          onClick={() => {
            setIsMounted(false);
            setTimeout(() => {
              onClose();
            }, 400);
          }}
          className="absolute top-[13px] lg:top-[22px] right-[20px] lg:right-[36px] z-10 lg:cursor-pointer"
        >
          <img
            className="w-[20px] lg:w-[22px] h-[20px] lg:h-[22px]"
            src="/images/close.png"
            alt=""
          />
        </div>
        <Overview
          title={movie.title}
          overview={movie.overview}
          genres={movie.genres}
          className={`${
            selectedSection === 'overview'
              ? styles.horizontalShow
              : styles.horizontalHide
          }`}
        />
        <MoreLikeThis
          title={movie.title}
          movies={relatedMovies}
          className={`${
            selectedSection === 'moreLikeThis'
              ? styles.horizontalShow
              : styles.horizontalHide
          }`}
        />
        <div className="absolute bottom-[15px] w-full flex justify-center gap-[20px] lg:gap-[59px]">
          <div
            className="flex items-center flex-col gap-[10px] cursor-pointer"
            onClick={() => setSelectedSection('overview')}
          >
            <p className="text-[16px]">OVERVIEW</p>
            {selectedSection === 'overview' && (
              <div className="bg-[#FF056C] h-[5px] w-full" />
            )}
          </div>
          <div
            className="flex items-center flex-col gap-[10px] cursor-pointer"
            onClick={() => setSelectedSection('moreLikeThis')}
          >
            <p className="text-[16px]">MORE LIKE THIS</p>
            {selectedSection === 'moreLikeThis' && (
              <div className="bg-[#FF056C] h-[5px] w-full" />
            )}
          </div>
          <div
            className="flex items-center flex-col gap-[10px] cursor-pointer"
            onClick={() => setSelectedSection('details')}
          >
            <p className="text-[16px]">DETAILS</p>
            {selectedSection === 'details' && (
              <div className="bg-[#FF056C] h-[5px] w-full" />
            )}
          </div>
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
    id: T.number,
  }),
  onClose: T.func,
};

Recommendation.defaultProps = {
  movie: {},
  onClose: () => {},
};
