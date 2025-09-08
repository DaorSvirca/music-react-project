import Button from "./Button";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MovieDetails({}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=3d60cea9fd26b3653c1515999ca7b598`
    )
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((error) => console.error(error));
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div key={movie.id}>
      <div className="movieImage">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
      <h1>{movie.title}</h1>
      <div>
        <h2>{movie.overview}</h2>
        <h3>{movie.media_type}</h3>
        <h3>{movie.popularity}</h3>
        <h3>{movie.release_date}</h3>
        <Button onClick={() => navigate("/")} text="Close" />
      </div>
    </div>
  );
}
