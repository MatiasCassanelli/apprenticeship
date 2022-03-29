import { SET_MOVIES, REMOVE_MOVIES } from './actions';

const getCategoryMovies = ({ category, movies }, state) => {
  if (state[category]?.length) {
    const prevMovies = [...state[category]];
    return prevMovies;
  }
  return Array.isArray(movies) ? [...movies] : [movies];
};

export default (state = {}, { type, payload }) => {
  switch (type) {
    case SET_MOVIES:
      return {
        ...state,
        [payload.category]: getCategoryMovies(payload, state),
      };
    case REMOVE_MOVIES:
      return {
        ...state.filter((x) => x[payload.category]),
      };
    default:
      return state;
  }
};
