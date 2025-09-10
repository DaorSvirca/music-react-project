import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";

export default function AllMovies() {
  const { page: pageParam } = useParams();
  const Navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(Number(pageParam) || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const API_KEY = "3d60cea9fd26b3653c1515999ca7b598"; // your key

  const fetchAllMovies = async () => {
    setLoading(true);
    try {
      const { data } = await Axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
      );

      setMovies(data.results);
      setTotalPages(data.total_pages);
    } catch (err) {
      console.error("Failed to fetch movies:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllMovies();
  }, [page]);

  useEffect(() => {
    const paramPage = Number(pageParam) || 1;
    if (paramPage !== page) setPage(paramPage);
  }, [pageParam]);

  const handlePageChange = (newPage) => {
    Navigate(`/movies/page/${newPage}`);
  };

  return (
    <div className="flex flex-wrap justify-center gap-[40px] p-[2%] pt-24 w-full box-border">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
