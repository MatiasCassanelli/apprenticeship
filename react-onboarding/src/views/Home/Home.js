import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import Carousel from '../../components/Carousel/Carousel';
import Hero from '../../components/Hero/Hero';
import {
  getTopRated,
  getPopularMovies,
  getNowPlaying,
  getUpcoming,
  getLatest,
} from '../../services/movies';
import RecommendationCarousel from '../../components/Carousel/RecommendationCarousel';
import UpcomingMovie from '../../components/UpcomingMovie/UpcomingMovie';
import { setMovies } from '../../redux/movies/actions';
import { getMovies } from '../../redux/movies/selectors';
import useFavourite from '../../hooks/useFavourite';

const Home = () => {
  const [popularFilms, setPopularFilms] = useState();
  const [topRatedFilms, setTopRatedFilms] = useState();
  const [nowPlayingFilms, setNowPlayingFilms] = useState();
  const [upcomingFilms, setUpcomingFilms] = useState();
  const [latestFilm, setLatestFilm] = useState();
  const { favourites, getFavouriteMovies } = useFavourite();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const movies = useSelector(getMovies);

  const setPreSavedMovies = () => {
    const { popular, topRated, nowPlaying, upcoming, latest } = movies;
    setPopularFilms(popular);
    setTopRatedFilms(topRated);
    setNowPlayingFilms(nowPlaying);
    setUpcomingFilms(upcoming);
    setLatestFilm(latest[0]);
  };

  useEffect(() => {
    if (movies && Object.keys(movies).length === 0) {
      getPopularMovies().then((res) => {
        setPopularFilms(res);
        dispatch(
          setMovies({
            category: 'popular',
            movies: res,
          }),
        );
      });
      getTopRated().then((res) => {
        setTopRatedFilms(res);
        dispatch(
          setMovies({
            category: 'topRated',
            movies: res,
          }),
        );
      });
      getNowPlaying().then((res) => {
        setNowPlayingFilms(res);
        dispatch(
          setMovies({
            category: 'nowPlaying',
            movies: res,
          }),
        );
      });
      getUpcoming().then((res) => {
        setUpcomingFilms(res);
        dispatch(
          setMovies({
            category: 'upcoming',
            movies: res,
          }),
        );
      });
      getLatest().then((res) => {
        setLatestFilm(res);
        dispatch(
          setMovies({
            category: 'latest',
            movies: res,
          }),
        );
      });
    } else {
      setPreSavedMovies();
    }
    getFavouriteMovies();
  }, []);

  const onMovieClick = (movieId) => {
    navigate(`/trailer/${movieId}`);
  };

  return (
    <div className="relative">
      <NavBar />
      {latestFilm && <Hero movie={latestFilm} onTrailerClick={onMovieClick} />}
      {favourites?.length && (
        <div className="py-3 pl-4 md:pl-[63px]">
          <Carousel
            slides={favourites}
            title="My List"
            onSlideClick={onMovieClick}
          />
        </div>
      )}
      <div className="py-3 pl-4 md:pl-[63px]">
        {popularFilms?.length && (
          <Carousel
            slides={popularFilms}
            title="Popular on Movy"
            onSlideClick={onMovieClick}
          />
        )}
      </div>
      {upcomingFilms?.length && <UpcomingMovie movie={upcomingFilms[2]} />}
      <div className="py-3 pl-4 md:pl-[63px]">
        {topRatedFilms?.length && (
          <Carousel
            slides={topRatedFilms}
            title="Most Viewed"
            type="vertical"
            onSlideClick={onMovieClick}
          />
        )}
        {nowPlayingFilms?.length && (
          <RecommendationCarousel
            slides={nowPlayingFilms}
            title="Recommended movies"
            onSlideClick={onMovieClick}
          />
        )}
        {upcomingFilms?.length && (
          <Carousel
            slides={upcomingFilms}
            title="Recommended movies"
            onSlideClick={onMovieClick}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
