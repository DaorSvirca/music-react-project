const API_KEY = "3d60cea9fd26b3653c1515999ca7b598";
const BASE_URL = "https://api.themoviedb.org/3";

// Fetch trending movies (returns only the array)
export async function fetchTrendingMovies() {
  const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch trending movies");
  const data = await res.json();
  return data.results; // return only the array
}

// Fetch movie by ID
export async function fetchMovieById(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch movie details");
  return res.json(); // full movie object
}

// Search movies by query
export async function searchMovies(query) {
  if (!query) return [];
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );
  if (!res.ok) throw new Error("Failed to search movies");
  const data = await res.json();
  return data.results;
}

export async function fetchAllMovies() {
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
  );
  if (!res.ok) throw new Error("Failed to fetch all movies");
  const data = await res.json();
  return data.results;
}

// api/tmdb.js
export async function fetchMoviesByGenres() {
  const res = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
  );
  if (!res.ok) throw new Error("Failed to fetch genres");
  const data = await res.json();
  return data.genres; // [{id, name}, ...]
}
