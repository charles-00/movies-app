import Spinner from "./Spinner";
import MovieCard from "./MovieCard";
import Genres from "./Genres";

const Movies = ({
  errorMessage,
  isLoading,
  movies,
  genres,
  setSelectedGenre,
}) => {
  return (
    <section className="all-movies">
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {isLoading && <Spinner />}
      <div>
        <h2 className="mt-10 mb-10">All Movies</h2>
        <Genres genres={genres} setSelectedGenre={setSelectedGenre} />
        <ul>
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} genres={genres} />
            ))
          ) : (
            <p className="text-red-500">No movie is available</p>
          )}
        </ul>
      </div>
    </section>
  );
};

export default Movies;
