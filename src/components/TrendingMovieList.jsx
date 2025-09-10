import MovieCard from "./MovieCard";
import { useState, useEffect } from "react";
import { fetchTrendingMovies } from "../api/tmdb";

export default function TrendingMovieList() {
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
    <>
      <div className="flex flex-wrap justify-center gap-[40px] p-[2%] pt-24 w-full box-border">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onViewDetails={setSelectedMovie}
          />
        ))}
      </div>
    </>
  );
}
