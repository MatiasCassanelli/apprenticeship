import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const YOUTUBE_URL = 'https://www.youtube.com/embed/';

// eslint-disable-next-line no-underscore-dangle
let _genres;

const populateGenres = (movies) =>
  movies?.map((movie) => {
    const populatedGenres = movie.genre_ids?.map((id) => {
      const genre = _genres?.find((g) => id === g.id);
      return genre?.name;
    });
    return {
      ...movie,
      genres: populatedGenres,
    };
  });

const getGenres = async () => {
  const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
    params: {
      api_key: process.env.REACT_APP_FILM_DB_API_KEY,
    },
  });
  _genres = response.data.genres;
};

const getMovies = async (url, extraParams) => {
  try {
    const movieResponse = await axios.get(url, {
      params: {
        api_key: process.env.REACT_APP_FILM_DB_API_KEY,
        ...extraParams,
      },
    });
    const movies = movieResponse?.data.results || movieResponse?.data;
    return { movies, ok: true };
  } catch (error) {
    return error;
  }
};

const getPopularMovies = async () => {
  try {
    const data = await getMovies(`${BASE_URL}/movie/popular`);
    if (data.ok) {
      return populateGenres(data.movies, _genres);
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
      return populateGenres(data.movies, _genres);
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
      return populateGenres(data.movies, _genres);
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
      return populateGenres(data.movies, _genres);
    }
    return data;
  } catch (error) {
    return error;
  }
};

const getLatest = async () => {
  try {
    const data = await getMovies(`${BASE_URL}/movie/latest`);
    if (data.ok) {
      return {
        ...data.movies,
        genres: data.movies.genres?.map((x) => x.name),
      };
    }
    return data;
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
        return `${YOUTUBE_URL}${trailer.key}`;
      }
    }
    return '';
  } catch (error) {
    return error;
  }
};

const getMovieDetails = async (movieId) => {
  try {
    const data = await getMovies(`${BASE_URL}/movie/${movieId}`, {
      append_to_response: 'videos',
    });
    if (data.ok) {
      const {
        videos: { results },
        genres,
      } = data.movies || {};
      if (results.length) {
        const trailer = results.find(
          (x) => x.type === 'Trailer' && x.site === 'YouTube',
        );
        if (trailer) {
          return {
            ...data.movies,
            genres: genres.map((x) => x.name),
            trailerKey: trailer.key,
          };
        }
      }
      return data.movies;
    }
    return data;
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
  getGenres,
  getMovieDetails,
};
