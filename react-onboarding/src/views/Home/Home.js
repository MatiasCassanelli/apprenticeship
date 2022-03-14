import React, { useEffect, useState } from 'react';
import Carousel from '../../components/NavBar/Carousel/Carousel';
import getPopularMovies from '../../services/movies';

const Home = () => {
  const [films, setFilms] = useState();
  useEffect(() => {
    getPopularMovies().then((res) => {
      if (res?.results) {
        setFilms(res.results);
      }
    });
  }, []);

  return (
    <div>
      <div className="py-3 pl-4 md:pl-[63px]">
        {films?.length && <Carousel slides={films} title="Popular" />}
      </div>
    </div>
  );
};

export default Home;
