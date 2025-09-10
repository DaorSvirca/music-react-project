import Button from "./Button";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=3d60cea9fd26b3653c1515999ca7b598`
    )
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((error) => console.error(error));
  }, [id]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=3d60cea9fd26b3653c1515999ca7b598`
    )
      .then((res) => res.json())
      .then((data) => {
        const ytTrailer = data.results.find(
          (video) => video.site === "YouTube" && video.type === "Trailer"
        );
        setTrailer(ytTrailer);
      })
      .catch((error) => console.error(error));
  }, [id]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=3d60cea9fd26b3653c1515999ca7b598`
    )
      .then((res) => res.json())
      .then((data) => setImages(data.backdrops || []))
      .catch((error) => console.error(error));
  }, [id]);

  if (!movie)
    return <div className="text-center text-gray-400 mt-20">Loading...</div>;

  return (
    <div className="relative min-h-screen text-white bg-gray-900">
      <Navbar />

      <div
        className="absolute inset-0 bg-cover bg-center filter brightness-50 blur-sm"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      ></div>

      <div className="  static z-10 pt-32 pb-12 px-6 flex flex-col items-center min-h-screen">
        <div className="w-full max-w-7xl flex flex-col md:flex-row gap-10 bg-gray-900/60 rounded-2xl shadow-lg overflow-hidden backdrop-blur-md p-8">
          <div className="md:w-1/3 flex justify-center">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-xl shadow-lg w-full object-cover"
            />
          </div>

          <div className="md:w-2/3 flex flex-col justify-start gap-6">
            <div className="flex flex-col gap-4">
              <h1 className="text-5xl font-bold">{movie.title}</h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                {movie.overview}
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <p>
                  <span className="font-semibold text-gray-400">
                    Release Date:
                  </span>{" "}
                  {movie.release_date}
                </p>
                <p>
                  <span className="font-semibold text-gray-400">
                    Popularity:
                  </span>{" "}
                  {movie.popularity}
                </p>
                <p>
                  <span className="font-semibold text-gray-400">Rating:</span>{" "}
                  {movie.vote_average.toFixed(1)} / 10
                </p>
                <p>
                  <span className="font-semibold text-gray-400">Votes:</span>{" "}
                  {movie.vote_count}
                </p>
              </div>
            </div>

            {trailer ? (
              <div className="w-full md:w-2/3 aspect-video rounded-xl overflow-hidden shadow-lg">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title={trailer.name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <p className="text-gray-400 italic">Trailer not available</p>
            )}

            {images.length > 0 && (
              <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-3">Photos</h2>
                <div className="flex overflow-x-auto gap-4 pb-2">
                  {images.map((img, index) => (
                    <img
                      key={index}
                      src={`https://image.tmdb.org/t/p/w500${img.file_path}`}
                      alt={`Backdrop ${index + 1}`}
                      className="h-36 md:h-44 rounded-lg flex-shrink-0 object-cover shadow-md hover:scale-105 transition-transform"
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6">
              <Button
                onClick={() => navigate("/")}
                text="Close"
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-md transition"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
