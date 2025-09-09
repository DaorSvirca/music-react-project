// import "../styles/SearchBar.css";
import { useState, useEffect } from "react";
import { searchMovies } from "../api/tmdb";
import Button from "./Button";
import SearchBarMovieDisplay from "./SearchBarMovieDisplay";

export default function SearchBar({ value, onChange, onSearch }) {
  const [query, setQuery] = useState(value || "");
  const [results, setResults] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.length > 2) {
        const movies = await searchMovies(query);
        setResults(movies);
        setVisibleCount(5);
        setExpanded(false);
      } else {
        setResults([]);
      }
    };
    fetchResults();
  }, [query]);

  const toggleShowMore = () => {
    if (expanded) {
      setVisibleCount(5);
      setExpanded(false);
    } else {
      setVisibleCount(results.length);
      setExpanded(true);
    }
  };

  return (
    <div className="SearchBar">
      <div className="SearchInput">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
        />
        <Button onClick={() => onSearch(query)} text="Search" />
      </div>

      {results.length > 0 && (
        <div className="SearchResults">
          {results
            .sort((a, b) => b.vote_average - a.vote_average)
            .slice(0, visibleCount)
            .map((movie) => (
              <SearchBarMovieDisplay key={movie.id} movie={movie} />
            ))}

          {results.length > 5 && (
            <Button
              onClick={toggleShowMore}
              text={expanded ? "Show Less" : "Show More"}
            ></Button>
          )}

          <p>
            End of Results || <span>{results.length} movies found</span>
          </p>

          <Button
            onClick={() => setResults([])}
            text="Close"
            style={{ marginTop: "20px" }}
          />
        </div>
      )}
    </div>
  );
}
