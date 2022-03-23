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
import UpcomingMovie from '../../components/UpcomingMovie/UpcomingMovie';

const Home = () => {
  const [popularFilms, setPopularFilms] = useState();
  const [topRatedFilms, setTopRatedFilms] = useState();
  const [nowPlayingFilms, setNowPlayingFilms] = useState();
  const [upcomingFilms, setUpcomingFilms] = useState();
  const [, setLatestFilm] = useState();
  // just to show different movies each time
  const [randomMovideIndex, setRandomMovieIndex] = useState(0);

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
      setRandomMovieIndex(Math.floor(Math.random() * res.length));
    });
    getLatest().then((res) => {
      setLatestFilm(res);
    });
  }, []);

  return (
    <div className="relative">
      <NavBar />
      {upcomingFilms?.length && <Hero movie={upcomingFilms[0]} />}
      <div className="py-3 pl-4 md:pl-[63px]">
        {popularFilms?.length && (
          <Carousel slides={popularFilms} title="Popular on Movy" />
        )}
      </div>
      {upcomingFilms?.length && (
        <UpcomingMovie movie={upcomingFilms[randomMovideIndex]} />
      )}
      <div className="py-3 pl-4 md:pl-[63px]">
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
