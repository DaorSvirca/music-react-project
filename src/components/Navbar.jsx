import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchMovies } from "../api/tmdb";
import SearchBarMovieDisplay from "./SearchBarMovieDisplay";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [expanded, setExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

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

  const handleSearch = (e) => {
    e.preventDefault();
    if (results.length > 0) navigate(`/movie/${results[0].id}`);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-xl font-bold text-indigo-600">
              MyMovies
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex sm:items-center space-x-4">
            <a href="/" className="text-gray-700 hover:text-indigo-600">
              Home
            </a>
            <a href="/about" className="text-gray-700 hover:text-indigo-600">
              About
            </a>

            {/* Search */}
            <div className="relative">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search movies..."
                  className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-64"
                />
              </form>

              {/* Search Results Dropdown */}
              {results.length > 0 && (
                <div className="absolute mt-2 w-full bg-white border rounded-md shadow-lg max-h-96 overflow-y-auto z-20">
                  {results
                    .sort((a, b) => b.vote_average - a.vote_average)
                    .slice(0, visibleCount)
                    .map((movie) => (
                      <SearchBarMovieDisplay key={movie.id} movie={movie} />
                    ))}

                  {results.length > 5 && (
                    <button
                      onClick={toggleShowMore}
                      className="w-full text-indigo-600 hover:bg-gray-100 px-4 py-2 text-left"
                    >
                      {expanded ? "Show Less" : "Show More"}
                    </button>
                  )}

                  <p className="text-gray-500 text-sm px-4 py-2">
                    {results.length} movies found
                  </p>

                  <button
                    onClick={() => setResults([])}
                    className="w-full text-red-600 hover:bg-gray-100 px-4 py-2 text-left"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 hover:text-indigo-600 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden px-2 pt-2 pb-3 space-y-1">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies..."
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mb-2"
            />
          </form>
          <a
            href="/"
            className="block px-3 py-2 rounded-md text-gray-700 hover:text-indigo-600"
          >
            Home
          </a>
          <a
            href="/about"
            className="block px-3 py-2 rounded-md text-gray-700 hover:text-indigo-600"
          >
            About
          </a>
        </div>
      )}
    </nav>
  );
}
