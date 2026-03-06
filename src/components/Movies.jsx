import Spinner from "./Spinner";
import MovieCard from "./MovieCard";

const Movies = ({ errorMessage, isLoading, movies }) => {
  return (
    <section className="all-movies">
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {isLoading && <Spinner />}
      <div>
        <h2 className="mt-10 mb-10">All Movies</h2>

        <ul>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Movies;
