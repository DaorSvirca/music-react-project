import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

export default function SearchBarMovieDisplay({ movie, onSelect }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onSelect) onSelect();
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
    >
      <img
        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
        alt={movie.title}
        className="w-16 h-24 object-cover rounded-md mr-3"
      />
      <div className="flex flex-col">
        <p className="font-semibold">{movie.title}</p>
        <Rating
          name="read-only"
          value={movie.vote_average / 2}
          readOnly
          precision={0.1}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          className="text-yellow-400"
        />
      </div>
    </div>
  );
}
