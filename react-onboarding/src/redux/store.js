import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movies/reducer';
import userReducer from './user/reducer';
import favouriteReducer from './favourites/reducer';

export default configureStore({
  reducer: {
    movies: movieReducer,
    user: userReducer,
    favourites: favouriteReducer,
  },
});
