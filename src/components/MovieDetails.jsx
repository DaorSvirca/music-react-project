import Button from "./Button";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const fetchMovieById = async (id) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=3d60cea9fd26b3653c1515999ca7b598`
  );
  if (!res.ok) throw new Error("Failed to fetch movie details");
  return res.json();
};

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: movie,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => fetchMovieById(id),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <div className="pt-24 text-center">Loading...</div>;
  if (isError)
    return <div className="pt-24 text-center">Error: {error.message}</div>;

  return (
    <div key={movie.id} className="p-4">
      <div className="movieImage">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
      <h1 className="text-2xl font-bold mt-4">{movie.title}</h1>
      <div className="mt-2 space-y-1">
        <h2>{movie.overview}</h2>
        <h3>Media Type: {movie.media_type || "Movie"}</h3>
        <h3>Popularity: {movie.popularity}</h3>
        <h3>Release Date: {movie.release_date}</h3>
      </div>
      <Button onClick={() => navigate("/")} text="Close" className="mt-4" />
    </div>
  );
}
