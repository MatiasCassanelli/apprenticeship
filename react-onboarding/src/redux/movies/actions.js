export const SET_MOVIES = 'movies/SET_MOVIES';
export const REMOVE_MOVIES = 'movies/REMOVE_MOVIES';

const setMovies = (payload) => ({
  type: SET_MOVIES,
  payload,
});

const removeMovies = () => ({
  type: REMOVE_MOVIES,
});

export { setMovies, removeMovies };
