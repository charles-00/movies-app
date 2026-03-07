import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import axios from "axios";
import "./App.css";
import { getTrendingMovies, updateSearchCount } from "./appwrite";
import TrendingMovies from "./components/TrendingMovies";
import Header from "./components/Header";
import Movies from "./components/Movies";
import Genres from "./components/Genres";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_OPTIONS = {
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTkxOTllYTY4YjFhNzNmMjczZWUzNzcwNGI5ZjI4OCIsIm5iZiI6MTc0NzgyNzM4My41MTcsInN1YiI6IjY4MmRiYWI3NzUyNzQ4MjRjMmUyNTY3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r2jTp78FdKJPPz2jlF5-N26vNO9IpmWkEJuLdGsb0PQ`,
    Accept: "application/json",
  },
  params: {
    include_adult: true,
    page: 1,
  },
};

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [debounceSearchTerm, setDebounceSearchTerm] = useState("");

  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [trendingdMovies, setTrendingdMovies] = useState([]);
  const [isTrendingLoading, setIsTrendingLoading] = useState(false);
  const [errorMessageTrending, setErrorMessageTrending] = useState(null);

  const [genres, setGenres] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const [watchListMovies, setWatchListMovies] = useState([]);

  const fetchMovies = (query = "") => {
    let url =
      query == ""
        ? `${API_BASE_URL}/discover/movie`
        : `${API_BASE_URL}/search/movie?query=${query}`;
    setIsLoading(true);
    setErrorMessage("");
    axios
      .get(url, API_OPTIONS)
      .then((res) => {
        setMovies(res.data.results);
        if (selectedGenre && selectedGenre != "") {
          loadFilteredMovies();
        }
        if (query && res.data.results.length > 0) {
          updateSearchCount(query, res.data.results[0]);
        }
      })
      .catch(() => {
        setErrorMessage("Failed To Load Movies, Please try Later");
      })
      .finally(() => setIsLoading(false));
  };

  const fetchGenres = () => {
    const genresEndPoint = `${API_BASE_URL}/genre/movie/list?language=en`;
    axios
      .get(genresEndPoint, { ...API_OPTIONS, params: {} })
      .then(({ data }) => {
        console.log(data.genres);
        setGenres(data.genres);
      });
  };

  const loadTrendingMovies = async () => {
    setIsTrendingLoading(true);
    try {
      const movies = await getTrendingMovies();
      setTrendingdMovies(movies);
      setIsTrendingLoading(false);
    } catch (error) {
      setErrorMessageTrending(error.message);
    } finally {
      setIsTrendingLoading(false);
    }
  };

  const loadFilteredMovies = () => {
    const filteredMovies = movies.filter((movie) =>
      movie.genre_ids.includes(Number(selectedGenre))
    );
    setFilteredMovies(filteredMovies);
  };

  const addMovieToWatchList = (movie) => {
    if (!watchListMovies.find((m) => m == movie.id)) {
      setWatchListMovies([...watchListMovies, movie.id]);
      console.log(watchListMovies);
    }
  };

  useDebounce(() => setDebounceSearchTerm(searchTerm), 500, [searchTerm]);
  // Fetch movies whenever search changes
  useEffect(() => {
    fetchMovies(debounceSearchTerm);
  }, [debounceSearchTerm]);

  useEffect(() => {
    fetchGenres();
    loadTrendingMovies();
  }, []);

  useEffect(() => {
    loadFilteredMovies();
  }, [selectedGenre]);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper pt-0">
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          watchListMovies={watchListMovies}
        />

        {trendingdMovies && trendingdMovies.length > 0 && (
          <TrendingMovies
            trendingdMovies={trendingdMovies}
            isTrendingLoading={isTrendingLoading}
            errorMessageTrending={errorMessageTrending}
          />
        )}

        {movies && movies.length > 0 && (
          <Movies
            movies={selectedGenre ? filteredMovies : movies}
            errorMessage={errorMessage}
            isLoading={isLoading}
            genres={genres}
            setSelectedGenre={setSelectedGenre}
            addMovieToWatchList={addMovieToWatchList}
            watchListMovies={watchListMovies}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )}
      </div>
    </main>
  );
}

export default App;
