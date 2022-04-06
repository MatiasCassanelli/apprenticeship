import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movies/reducer';
import playerReducer from './player/reducer';
import userReducer from './user/reducer';

export default configureStore({
  reducer: {
    movies: movieReducer,
    player: playerReducer,
    user: userReducer,
  },
});
