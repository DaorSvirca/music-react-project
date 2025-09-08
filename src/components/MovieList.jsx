import MovieCard from "./MovieCard";
import { useState, useEffect } from "react";
import { fetchTrendingMovies } from "../api/tmdb";
import "../styles/MovieList.css";

export default function MovieList() {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      const trendingMovies = await fetchTrendingMovies();
      setMovies(trendingMovies);
    };
    getMovies();
  }, []);

  return (
    <div className="MovieList">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onViewDetails={setSelectedMovie}
        />
      ))}
    </div>
  );
}
