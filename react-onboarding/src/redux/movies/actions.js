export const SET_MOVIES = 'movies/SET_MOVIES';
export const SET_RECOMMENDATION = 'movies/SET_RECOMMENDATION';

const setMovies = (payload) => ({
  type: SET_MOVIES,
  payload,
});

const setRecommendation = (payload) => ({
  type: SET_RECOMMENDATION,
  payload,
});

export { setMovies, setRecommendation };
