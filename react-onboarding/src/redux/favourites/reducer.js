import { ADD_FAVOURITE, SET_FAVOURITES, REMOVE_FAVOURITE } from './actions';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case ADD_FAVOURITE:
      return {
        ...state,
        favourites: [...state.favourites, payload],
      };
    case REMOVE_FAVOURITE:
      return {
        ...state,
        favourites: state.favourites.filter((x) => x.id !== payload),
      };
    case SET_FAVOURITES:
      return {
        ...state,
        favourites: payload,
      };
    default:
      return state;
  }
};
