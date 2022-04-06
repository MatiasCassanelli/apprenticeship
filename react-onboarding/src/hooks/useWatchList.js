import { useDispatch, useSelector } from 'react-redux';
import {
  addWatchList,
  removeWatchList,
  setWatchList,
} from '../redux/userLists/actions';
import { getWatchList as watchListSelector } from '../redux/userLists/selectors';
import { getSessionId, getUserDetails } from '../redux/user/selectors';
import * as movieService from '../services/movies';

const useWatchList = () => {
  const sessionId = useSelector(getSessionId);
  const userDetails = useSelector(getUserDetails);
  const watchList = useSelector(watchListSelector);
  const dispatch = useDispatch();

  const addToWatchList = async (movie) => {
    const success = await movieService.addToWatchList(
      userDetails.id,
      sessionId,
      movie.id,
    );
    if (success) {
      dispatch(addWatchList(movie));
    }
    return success;
  };

  const removeFromWatchList = async (movie) => {
    const success = await movieService.addToWatchList(
      userDetails.id,
      sessionId,
      movie.id,
      false,
    );
    if (success) {
      dispatch(removeWatchList(movie.id));
    }
    return success;
  };

  const handleWatchList = (movie) => {
    if (watchList?.find((x) => x.id === movie.id)) {
      return removeFromWatchList(movie);
    }
    return addToWatchList(movie);
  };

  const getWatchList = async () => {
    const movies = await movieService.getWatchList(userDetails.id, sessionId);
    dispatch(setWatchList(movies));
  };

  const continueWatching = (movieId) =>
    !!watchList?.find((x) => x.id === movieId);

  return { handleWatchList, getWatchList, watchList, continueWatching };
};

export default useWatchList;
