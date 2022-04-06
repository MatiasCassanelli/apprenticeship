export const ADD_FAVOURITE = 'favourite/ADD_FAVOURITE';
export const REMOVE_FAVOURITE = 'favourite/REMOVE_FAVOURITE';
export const SET_FAVOURITES = 'favourite/SET_FAVOURITES';
export const ADD_WATCHLIST = 'watchList/ADD_WATCHLIST';
export const REMOVE_WATCHLIST = 'favourite/REMOVE_WATCHLIST';
export const SET_WATCHLIST = 'watchList/SET_WATCHLIST';

const setFavourites = (payload) => ({
  type: SET_FAVOURITES,
  payload,
});

const addFavourite = (payload) => ({
  type: ADD_FAVOURITE,
  payload,
});

const removeFavourite = (payload) => ({
  type: REMOVE_FAVOURITE,
  payload,
});

const setWatchList = (payload) => ({
  type: SET_WATCHLIST,
  payload,
});

const addWatchList = (payload) => ({
  type: ADD_WATCHLIST,
  payload,
});

const removeWatchList = (payload) => ({
  type: REMOVE_WATCHLIST,
  payload,
});

export {
  addFavourite,
  setFavourites,
  removeFavourite,
  setWatchList,
  addWatchList,
  removeWatchList,
};
