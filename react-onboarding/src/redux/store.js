import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movies/reducer';
import playerReducer from './player/reducer';
import userReducer from './user/reducer';
import userListsReducer from './userLists/reducer';

export default configureStore({
  reducer: {
    movies: movieReducer,
    player: playerReducer,
    user: userReducer,
    userLists: userListsReducer,
  },
});
