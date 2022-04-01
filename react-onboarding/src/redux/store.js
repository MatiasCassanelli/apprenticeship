import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movies/reducer';
import userReducer from './user/reducer';

export default configureStore({
  reducer: {
    movies: movieReducer,
    user: userReducer,
  },
});
