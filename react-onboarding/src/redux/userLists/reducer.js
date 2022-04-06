import {
  ADD_FAVOURITE,
  SET_FAVOURITES,
  REMOVE_FAVOURITE,
  ADD_WATCHLIST,
  REMOVE_WATCHLIST,
  SET_WATCHLIST,
} from './actions';

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
    case ADD_WATCHLIST:
      return {
        ...state,
        watchList: [...state.watchList, payload],
      };
    case SET_WATCHLIST:
      return {
        ...state,
        watchList: payload,
      };
    case REMOVE_WATCHLIST:
      return {
        ...state,
        watchList: state.watchList.filter((x) => x.id !== payload),
      };
    default:
      return state;
  }
};
