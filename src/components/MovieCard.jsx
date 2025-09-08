import { useState, useEffect } from "react";
import "../styles/MovieCard.css";
import { languageFlags } from "../utils/languageFlags";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function MovieCard({ movie, onViewDetails }) {
  const flag =
    languageFlags[movie.original_language] || movie.original_language;

  const navigateTo = useNavigate();

  const routeChange = () => {
    let path = `/movie/${movie.id}`;
    navigateTo(path);
  };

  return (
    <div className="MovieCard">
      <div className="movieImage">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
      <div className="movieInfo">
        <h2>{movie.original_title}</h2>
        <h3>Language: {flag}</h3>
        <h5>{movie.release_date}</h5>
        <Rating
          name="text-feedback"
          value={movie.vote_average / 2}
          readOnly
          precision={0.1}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        <Box sx={{ ml: 0 }}>{`(${movie.vote_average})`}</Box>
        <Button onClick={routeChange} text="View more" />
      </div>
    </div>
  );
}
