const BASE_URL = 'https://image.tmdb.org/t/p/w';

export default (url, width = 300) => `${BASE_URL}${width}${url}`;
