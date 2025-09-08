import MovieList from "../components/MovieList";
import "../styles/HomePage.css";
import { useState, useEffect, use } from "react";
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
    <div
      className="HomePage"
      style={{
        "--background-url": `url(https://image.tmdb.org/t/p/original${backgroundMovie.backdrop_path})`,
      }}
    >
      <div className="HomePageContent">
        <MovieList />
      </div>
    </div>
  );
}
