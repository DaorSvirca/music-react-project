const API_KEY = "3d60cea9fd26b3653c1515999ca7b598";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchTrendingMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data;
};
