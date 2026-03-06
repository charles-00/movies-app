const TrendingMovie = ({ movie: { title, poster_url }, index }) => {
  return (
    <li key={index}>
      <p>{index}</p>
      <img src={poster_url} alt={title} />
    </li>
  );
};

export default TrendingMovie;
