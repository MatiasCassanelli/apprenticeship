import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movies/reducer';
import playerReducer from './player/reducer';

export default configureStore({
  reducer: {
    movies: movieReducer,
    player: playerReducer,
  },
});
