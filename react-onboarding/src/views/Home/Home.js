import React, { useEffect, useState } from 'react';
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

const Home = () => {
  const [popularFilms, setPopularFilms] = useState();
  const [topRatedFilms, setTopRatedFilms] = useState();
  const [nowPlayingFilms, setNowPlayingFilms] = useState();
  const [upcomingFilms, setUpcomingFilms] = useState();
  const [latestFilm, setLatestFilm] = useState();
  useEffect(() => {
    getPopularMovies().then((res) => {
      setPopularFilms(res);
    });
    getTopRated().then((res) => {
      setTopRatedFilms(res);
    });
    getNowPlaying().then((res) => {
      setNowPlayingFilms(res);
    });
    getUpcoming().then((res) => {
      setUpcomingFilms(res);
    });
    getLatest().then((res) => {
      setLatestFilm(res);
    });
  }, []);

  return (
    <div className="relative">
      <NavBar />
      {latestFilm && <Hero movie={latestFilm} />}
      <div className="py-3 pl-4 md:pl-[63px]">
        {popularFilms?.length && (
          <Carousel slides={popularFilms} title="Popular on Movy" />
        )}
        {topRatedFilms?.length && (
          <Carousel
            slides={topRatedFilms}
            title="Most Viewed"
            type="vertical"
          />
        )}
        {nowPlayingFilms?.length && (
          <RecommendationCarousel
            slides={nowPlayingFilms}
            title="Recommended movies"
          />
        )}
        {upcomingFilms?.length && (
          <Carousel slides={upcomingFilms} title="Recommended movies" />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
