import { SET_MOVIES, SET_RECOMMENDATION, SET_TRAILER } from './actions';

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
    case SET_RECOMMENDATION:
      return {
        ...state,
        recommendation: {
          ...state.recommendation,
          ...payload,
        },
      };
    case SET_TRAILER:
      return {
        ...state,
        trailer: {
          ...state.trailer,
          ...payload,
        },
      };
    default:
      return state;
  }
};
