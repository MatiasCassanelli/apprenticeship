export const ADD_FAVOURITE = 'favourite/ADD_FAVOURITE';
export const REMOVE_FAVOURITE = 'favourite/REMOVE_FAVOURITE';
export const SET_FAVOURITES = 'favourite/SET_FAVOURITES';

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

export { addFavourite, setFavourites, removeFavourite };
