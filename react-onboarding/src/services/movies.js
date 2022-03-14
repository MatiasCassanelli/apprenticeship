import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/movie/popular';

const getPopularMovies = async () => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        api_key: process.env.REACT_APP_FILM_DB_API_KEY,
      },
    });
    return response?.data;
  } catch (error) {
    return error;
  }
};

export default getPopularMovies;
