import Spinner from "./Spinner";
import MovieCard from "./MovieCard";
import Genres from "./Genres";
import Search from "./Search";

const Movies = ({
  errorMessage,
  isLoading,
  movies,
  genres,
  searchTerm,
  setSearchTerm,
  setSelectedGenre,
  addMovieToWatchList,
  watchListMovies,
}) => {
  return (
    <section className="all-movies">
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {isLoading && <Spinner />}
      <div>
        <h2 className="mt-10 mb-10">All Movies</h2>
        <div className="flex justify-between align-middle gap-6 mb-[20px]">
          <Genres genres={genres} setSelectedGenre={setSelectedGenre} />
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <ul>
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                genres={genres}
                addMovieToWatchList={addMovieToWatchList}
                watchListMovies={watchListMovies}
              />
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
