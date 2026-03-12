const MovieCard = ({
  movie: {
    title,
    vote_average,
    release_date,
    poster_path,
    original_language,
    genre_ids,
  },
  movie,
  genres,
  addMovieToWatchList,
  watchListMovies,
}) => {
  return (
    <div className="movie-card">
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : "/no-movie.png"
        }
        alt={title}
      />
      <div className="mt-4">
        <h3>{title}</h3>
        <div className="content">
          <div className="rating">
            <img src="/star.svg" alt="" />
            <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
          </div>
          <span>•</span>
          <p className="lang">{original_language}</p>
          <span>•</span>
          <p className="year">
            {release_date ? release_date.split("-")[0] : "N/A"}
          </p>
        </div>
        <div className="mt-3">
          {genres
            .filter((genre) => genre_ids.includes(genre.id)) //return array with genres related to this movie
            .map(
              (
                genre,
                index,
                arr //mapping trought that filterd genres from movies maybe are 2,3 or 1..
              ) => (
                // rendering the genre related to that movie
                <span key={index} className="text-white text-sm font-bold">
                  {genre.name} {index != arr.length - 1 && " • "}
                </span>
              )
            )}
        </div>
        <button
          className="text-dark-100 font-bold cursor-pointe bg-purple-200 mt-4 px-4 py-1 rounded-lg cursor-pointer"
          onClick={() => addMovieToWatchList(movie)}
        >
          {movie.isAddedToWatchList ? "Added" : "Add WatchList"}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
