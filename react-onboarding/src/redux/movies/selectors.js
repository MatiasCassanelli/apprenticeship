const getMovies = (state) => state.movies;
const getRecommendation = (state) => state.movies.recommendation;
const getTrailer = (state) => state.movies.trailer;

export { getMovies, getRecommendation, getTrailer };
