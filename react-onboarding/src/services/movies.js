import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';

const populateGenres = (movies, genres) =>
  movies?.map((movie) => {
    const populatedGenres = movie.genre_ids?.map((id) => {
      const genre = genres.find((g) => id === g.id);
      return genre?.name;
    });
    return {
      ...movie,
      genres: populatedGenres,
    };
  });

const getMovies = async (url, extraParams) => {
  try {
    const moviePromise = axios.get(url, {
      params: {
        api_key: process.env.REACT_APP_FILM_DB_API_KEY,
        ...extraParams,
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

const getVideoUrl = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/videos`, {
      params: {
        api_key: process.env.REACT_APP_FILM_DB_API_KEY,
      },
    });
    const { results: videos } = response.data || {};
    if (videos.length) {
      const trailer = videos.find(
        (x) => x.type === 'Trailer' && x.site === 'YouTube',
      );
      if (trailer) {
        return trailer.key;
      }
    }
    return '';
  } catch (error) {
    return error;
  }
};

const getFavouriteMovies = async (accountId, sessionId) => {
  try {
    const data = await getMovies(
      `${BASE_URL}/account/${accountId}/favorite/movies`,
      { session_id: sessionId },
    );
    if (data.ok) {
      return populateGenres(data.movies, data.genres);
    }
    return data;
  } catch (error) {
    return error;
  }
};

const addToFavourites = async (
  accountId,
  sessionId,
  mediaId,
  favorite = true,
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/account/${accountId}/favorite`,
      {
        media_type: 'movie',
        media_id: mediaId,
        favorite,
      },
      {
        params: {
          api_key: process.env.REACT_APP_FILM_DB_API_KEY,
          session_id: sessionId,
        },
      },
    );
    if (response?.data) {
      return response.data.success;
    }
    return response;
  } catch (error) {
    return error;
  }
};

const getWatchList = async (accountId, sessionId) => {
  try {
    const data = await getMovies(
      `${BASE_URL}/account/${accountId}/watchlist/movies`,
      { session_id: sessionId },
    );
    if (data.ok) {
      return populateGenres(data.movies, data.genres);
    }
    return data;
  } catch (error) {
    return error;
  }
};

const addToWatchList = async (accountId, sessionId, mediaId, adding = true) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/account/${accountId}/watchlist`,
      {
        media_type: 'movie',
        media_id: mediaId,
        watchlist: adding,
      },
      {
        params: {
          api_key: process.env.REACT_APP_FILM_DB_API_KEY,
          session_id: sessionId,
        },
      },
    );
    if (response?.data) {
      return response.data.success;
    }
    return response;
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
  getVideoUrl,
  getFavouriteMovies,
  addToFavourites,
  getWatchList,
  addToWatchList,
};
