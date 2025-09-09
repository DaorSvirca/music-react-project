import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";
import Button from "./Button";
import { languageFlags } from "../utils/languageFlags";

export default function MovieCard({ movie }) {
  const flag =
    languageFlags[movie.original_language] || movie.original_language;
  const navigate = useNavigate();

  const handleView = () => navigate(`/movie/${movie.id}`);

  return (
    <div className="flex flex-col bg-[#3e3f29] text-white rounded-xl overflow-hidden w-72 p-4 cursor-pointer transform transition-transform duration-300 hover:-translate-y-5 hover:shadow-2xl">
      {/* Movie Image */}
      <div className="w-full h-72 overflow-hidden rounded-t-xl">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Movie Details */}
      <div className="flex flex-col gap-3 mt-4">
        <h2 className="text-lg font-semibold">{movie.original_title}</h2>
        <h3 className="text-gray-300">Language: {flag}</h3>
        <h5 className="text-gray-400">{movie.release_date}</h5>

        <div className="flex items-center gap-2">
          <Rating
            name="text-feedback"
            value={movie.vote_average / 2}
            readOnly
            precision={0.1}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
            className="text-yellow-400"
          />
          <Box
            sx={{ ml: 0 }}
            className="text-gray-200"
          >{`(${movie.vote_average})`}</Box>
        </div>

        <Button text="View more" onClick={handleView} />
      </div>
    </div>
  );
}
