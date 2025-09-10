import HomePage from "./pages/HomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import { Routes, Route, Router } from "react-router-dom";
import "./index.css";
import AllMoviesPage from "./pages/AllMoviesPage";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MovieDetailsPage />} />
        <Route path="/movies/page/:page" element={<AllMoviesPage />} />
      </Routes>
    </>
  );
}

export default App;
