import axios from "axios";

export const apiKey = "e8fa4e55e0a5b3c10498a6007494f603";
export const baseUrl = "https://api.themoviedb.org/3";
export const imageURL = "https://image.tmdb.org/t/p/w500";
export const imageOriginal = "https://image.tmdb.org/t/p/original";
export const details = "https://api.themoviedb.org/3/movie/{movie_id}"
export const credit = "https://api.themoviedb.org/3/movie/{movie_id}/credits"

export const getMovieListPopular = async () => {
  const movie = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
  );
  return movie.data.results;
};

export const getMovieTopRated = async () => {
  const movie = await axios.get(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
  );
  return movie.data.results
}

export const getMovieUpComing = async () => {
  const movie = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`)
  return movie.data.results
}

export const searchMovie = async (q) => {
  const search = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${q}&page=1&api_key=${apiKey}`
  );
  const listMovieSearch = search.data.results.slice(0,9);
  return listMovieSearch;
  
};
