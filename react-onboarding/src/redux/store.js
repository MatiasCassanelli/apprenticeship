import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movies/reducer';

export default configureStore({
  reducer: {
    movies: movieReducer,
  },
});
