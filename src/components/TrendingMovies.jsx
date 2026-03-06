import TrendingMovie from "./TrendingMovie";
import Spinner from "./Spinner";

const TrendingMovies = ({
  trendingdMovies,
  isTrendingLoading,
  errorMessageTrending,
}) => {
  return (
    <>
      {errorMessageTrending && (
        <p className="text-red-500">{errorMessageTrending}</p>
      )}
      {isTrendingLoading && <Spinner />}
      <section className="trending">
        <h2>Trending Movies</h2>

        <ul>
          {trendingdMovies.map((movie, index) => (
            <TrendingMovie key={index} movie={movie} index={index} />
          ))}
        </ul>
      </section>
    </>
  );
};

export default TrendingMovies;
