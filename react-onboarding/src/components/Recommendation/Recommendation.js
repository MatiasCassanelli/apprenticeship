import React, { useEffect, useState } from 'react';
import T from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styles from './recommendation.module.scss';
import Overview from './Overview';
import { getRelatedMovies, getCredits } from '../../services/movies';
import MoreLikeThis from './MoreLikeThis';
import Details from './Details';
import { setRecommendation } from '../../redux/movies/actions';
import { getRecommendation } from '../../redux/movies/selectors';

const BASE_URL = 'https://image.tmdb.org/t/p/w300';

const Recommendation = ({ movie, onClose }) => {
  const [selectedSection, setSelectedSection] = useState('overview');
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [credits, setCredits] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useDispatch();
  const recommendation = useSelector(getRecommendation);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    setSelectedSection('overview');
    if (recommendation?.movieId === movie.id) {
      const { moreLikeThis, credits: prevCredits } = recommendation;
      setRelatedMovies(moreLikeThis);
      setCredits(prevCredits);
    } else {
      dispatch(
        setRecommendation({
          movieId: movie.id,
        }),
      );
      getRelatedMovies(movie.id).then((res) => {
        setRelatedMovies(res);
        dispatch(
          setRecommendation({
            moreLikeThis: res,
          }),
        );
      });
      getCredits(movie.id).then((res) => {
        setCredits(res);
        dispatch(
          setRecommendation({
            credits: res,
          }),
        );
      });
    }
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
          className="absolute top-[13px] lg:top-[22px] right-[20px] lg:right-[36px] z-10 lg:cursor-pointer"
          onClick={() => {
            setIsMounted(false);
            setTimeout(() => {
              onClose();
            }, 400);
          }}
        >
          <img
            className="w-[20px] lg:w-[22px] h-[20px] lg:h-[22px]"
            src="/images/close.png"
            alt=""
          />
        </div>
        <div className="w-full h-full absolute top-0 pt-[40px] lg:pt-[95px] px-[20px] lg:pl-[72px] lg:pr-0">
          <p className="text-xl lg:text-[40px] lg:leading-[48px] mb-[8px] lg:mb-[13px]">
            A Movy Film
          </p>
          <p className="text-4xl lg:text-[60px] lg:leading-[72px] mb-[19px] w-full lg:w-1/2 line-clamp-2">
            {movie.title}
          </p>
          <div className="relative">
            <Overview
              title={movie.title}
              overview={movie.overview}
              genres={movie.genres}
              id={movie.id}
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
            <Details
              title={movie.title}
              cast={credits?.cast}
              director={credits?.crew?.find((x) => x.job === 'Director')?.name}
              genres={movie.genres}
              className={`${
                selectedSection === 'details'
                  ? styles.horizontalShow
                  : styles.horizontalHide
              }`}
            />
          </div>
        </div>

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
