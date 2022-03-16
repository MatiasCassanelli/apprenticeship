import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import Carousel from '../../components/Carousel/Carousel';
import {
  getTopRated,
  getPopularMovies,
  getNowPlaying,
  getUpcoming,
} from '../../services/movies';

const Home = () => {
  const [popularFilms, setPopularFilms] = useState();
  const [topRatedFilms, setTopRatedFilms] = useState();
  const [nowPlayingFilms, setNowPlayingFilms] = useState();
  const [upcomingFilms, setUpcomingFilms] = useState();
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
  }, []);

  return (
    <div className="relative">
      <NavBar />
      <div className="py-3 pl-4 md:pl-[63px]">
        {/* {popularFilms?.length && <Carousel slides={popularFilms} title="My List" />} */}
        {popularFilms?.length && (
          <Carousel slides={popularFilms} title="Popular on Movy" />
        )}
        {/* {popularFilms?.length && <Carousel slides={popularFilms} title="Continue Watching for John" />} */}
        {topRatedFilms?.length && (
          <Carousel
            slides={topRatedFilms}
            title="Most Viewed"
            type="vertical"
          />
        )}
        {nowPlayingFilms?.length && (
          <Carousel slides={nowPlayingFilms} title="Recommended movies" />
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
