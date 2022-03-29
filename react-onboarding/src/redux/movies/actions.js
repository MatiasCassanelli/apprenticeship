export const SET_MOVIES = 'movies/SET_MOVIES';
export const SET_RECOMMENDATION = 'movies/SET_RECOMMENDATION';
export const SET_TRAILER = 'movies/SET_TRAILER';

const setMovies = (payload) => ({
  type: SET_MOVIES,
  payload,
});

const setRecommendation = (payload) => ({
  type: SET_RECOMMENDATION,
  payload,
});

const setTrailer = (payload) => ({
  type: SET_TRAILER,
  payload,
});

export { setMovies, setRecommendation, setTrailer };
