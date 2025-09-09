import MovieCard from "./MovieCard";
import { useState, useEffect } from "react";
import { fetchTrendingMovies } from "../api/tmdb";

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
    <>
      {/* Section Title */}
      <h2 className="text-[22px] font-bold my-4 text-white">Trending Movies</h2>

      {/* Movie list with wrapping */}
      <div className="flex flex-wrap justify-center gap-[40px] p-[2%] w-full box-border">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onViewDetails={setSelectedMovie}
          />
        ))}
      </div>

      <div
        className="flex overflow-x-auto gap-4 p-4 scroll-smooth"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
}
