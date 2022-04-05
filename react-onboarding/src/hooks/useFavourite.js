import { useDispatch, useSelector } from 'react-redux';
import {
  addFavourite,
  removeFavourite,
  setFavourites,
} from '../redux/favourites/actions';
import { getFavourites } from '../redux/favourites/selectors';
import { getSessionId, getUserDetails } from '../redux/user/selectors';
import * as movieService from '../services/movies';

const useFavourite = () => {
  const sessionId = useSelector(getSessionId);
  const userDetails = useSelector(getUserDetails);
  const favourites = useSelector(getFavourites);
  const dispatch = useDispatch();

  const addToFavourites = async (movie) => {
    const success = await movieService.addToFavourites(
      userDetails.id,
      sessionId,
      movie.id,
    );
    if (success) {
      dispatch(addFavourite(movie));
    }
    return success;
  };

  const removeFromFavourites = async (movie) => {
    const success = await movieService.addToFavourites(
      userDetails.id,
      sessionId,
      movie.id,
      false,
    );
    if (success) {
      dispatch(removeFavourite(movie.id));
    }
    return success;
  };

  const handleFavourite = (movie) => {
    if (favourites?.find((x) => x.id === movie.id)) {
      return removeFromFavourites(movie);
    }
    return addToFavourites(movie);
  };

  const getFavouriteMovies = async () => {
    const movies = await movieService.getFavouriteMovies(
      userDetails.id,
      sessionId,
    );
    dispatch(setFavourites(movies));
  };

  const isFavourite = (movieId) => !!favourites?.find((x) => x.id === movieId);

  return { handleFavourite, getFavouriteMovies, favourites, isFavourite };
};

export default useFavourite;
