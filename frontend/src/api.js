import axios from "axios";

export const baseUrl = "https://api.themoviedb.org/3";
export const imageURL = "https://image.tmdb.org/t/p/w500";
export const imageOriginal = "https://image.tmdb.org/t/p/original";
export const details = "https://api.themoviedb.org/3/movie/{movie_id}"
export const credit = "https://api.themoviedb.org/3/movie/{movie_id}/credits"

export const getMovieListPopular = async () => {
  const movie = await axios.get(
    `http://127.0.0.1:3030/movies/popular`
  );
  return movie.data.results;
};

export const getMovieTopRated = async () => {
  const movie = await axios.get(
    `http://127.0.0.1:3030/movies/top_rated`
  );
  return movie.data.results
}

export const getMovieUpComing = async () => {
  const movie = await axios.get(`http://127.0.0.1:3030/movies/upcoming`)
  return movie.data.results
}

export const getRecommendationsMovie = async (idNum) => {
  const movie = await axios.get(`http://127.0.0.1:3030/movies/${idNum}/recommendations`)
  return movie.data.results
}

export const searchMovie = async (q) => {
  const search = await axios.get(
    `http://127.0.0.1:3030/movies/search?query=${q}`
  );
  const listMovieSearch = search.data.results.slice(0,9);
  return listMovieSearch;
};
