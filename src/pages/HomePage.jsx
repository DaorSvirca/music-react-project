import MovieList from "../components/MovieList";
import SearchBar from "../components/SearchBar";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [backgroundMovie, setBackgroundMovie] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=3d60cea9fd26b3653c1515999ca7b598`
    )
      .then((res) => res.json())
      .then((data) => {
        const randomMovie =
          data.results[Math.floor(Math.random() * data.results.length)];
        setBackgroundMovie(randomMovie);
      })
      .catch((error) =>
        console.error("Error fetching trending movies:", error)
      );
  }, []);

  if (!backgroundMovie) return <div>Loading...</div>;

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start text-white overflow-hidden">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50 z-0"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${backgroundMovie.backdrop_path})`,
        }}
      ></div>

      {/* Page content */}
      <div className="relative z-10 w-full">
        <Navbar />
        <MovieList />
      </div>
    </div>
  );
}
