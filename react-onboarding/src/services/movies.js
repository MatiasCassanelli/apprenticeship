import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';

const populateGenres = (movies, genres) =>
  movies.map((movie) => {
    const populatedGenres = movie.genre_ids.map((id) => {
      const genre = genres.find((g) => id === g.id);
      return genre?.name;
    });
    return {
      ...movie,
      genres: populatedGenres,
    };
  });

const getMovies = async (url) => {
  try {
    const moviePromise = axios.get(url, {
      params: {
        api_key: process.env.REACT_APP_FILM_DB_API_KEY,
      },
    });
    const genrePromise = axios.get(`${BASE_URL}/genre/movie/list`, {
      params: {
        api_key: process.env.REACT_APP_FILM_DB_API_KEY,
      },
    });
    const responses = await Promise.allSettled([moviePromise, genrePromise]);
    const [movieResponse, genreResponse] = responses;
    const movies = movieResponse?.value?.data.results;
    const genres = genreResponse?.value?.data.genres;
    return { movies, genres, ok: true };
  } catch (error) {
    return error;
  }
};

const getPopularMovies = async () => {
  try {
    const data = await getMovies(`${BASE_URL}/movie/popular`);
    if (data.ok) {
      return populateGenres(data.movies, data.genres);
    }
    return data;
  } catch (error) {
    return error;
  }
};

const getTopRated = async () => {
  try {
    const data = await getMovies(`${BASE_URL}/movie/top_rated`);
    if (data.ok) {
      return populateGenres(data.movies, data.genres);
    }
    return data;
  } catch (error) {
    return error;
  }
};

const getNowPlaying = async () => {
  try {
    const data = await getMovies(`${BASE_URL}/movie/now_playing`);
    if (data.ok) {
      return populateGenres(data.movies, data.genres);
    }
    return data;
  } catch (error) {
    return error;
  }
};

const getUpcoming = async () => {
  try {
    const data = await getMovies(`${BASE_URL}/movie/upcoming`);
    if (data.ok) {
      return populateGenres(data.movies, data.genres);
    }
    return data;
  } catch (error) {
    return error;
  }
};

const getLatest = async () => {
  try {
    const moviePromise = axios.get(`${BASE_URL}/movie/latest`, {
      params: {
        api_key: process.env.REACT_APP_FILM_DB_API_KEY,
      },
    });
    const genrePromise = axios.get(`${BASE_URL}/genre/movie/list`, {
      params: {
        api_key: process.env.REACT_APP_FILM_DB_API_KEY,
      },
    });
    const responses = await Promise.allSettled([moviePromise, genrePromise]);
    const [movieResponse, genreResponse] = responses;
    const movie = movieResponse?.value?.data;
    const genres = genreResponse?.value?.data.genres;
    const populatedGenres = movie.genre_ids?.map((id) => {
      const genre = genres.find((g) => id === g.id);
      return genre?.name;
    });
    return {
      ...movie,
      genres: populatedGenres,
    };
  } catch (error) {
    return error;
  }
};

const getRelatedMovies = async (movieId) => {
  try {
    const data = await getMovies(`${BASE_URL}/movie/${movieId}/similar`);
    if (data.ok) {
      return populateGenres(data.movies, data.genres);
    }
    return data;
  } catch (error) {
    return error;
  }
};

const getCredits = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
      params: {
        api_key: process.env.REACT_APP_FILM_DB_API_KEY,
      },
    });
    return response?.data;
  } catch (error) {
    return error;
  }
};
export {
  getPopularMovies,
  getTopRated,
  getNowPlaying,
  getUpcoming,
  getLatest,
  getRelatedMovies,
  getCredits,
};
