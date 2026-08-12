import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect, useState } from "react";
import { getMovieListPopular, getMovieTopRated, getMovieUpComing } from "../api";

import Banner from "../assets/Components/Banner";
import Movies from "../assets/Components/Movies";
import BannerDetail from "../assets/Components/BannerDetail.jsx";

export default function HomePage() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upComingMovies, setUpComingMovies] = useState([]);

  useEffect(() => {
    getMovieListPopular().then((movie) => {
      setPopularMovies(movie);
    });
  }, []);

  useEffect(() => {
    getMovieTopRated().then((movie) => {
      setTopRatedMovies(movie);
    });
  }, []);

  useEffect(() => {
    getMovieUpComing().then((movie) => {
      setUpComingMovies(movie);
    });
  }, []);

  return (
    <div className="bg-black box-border">
      <Banner popularMovies={popularMovies} />
      <Movies
        popularMovies={popularMovies}
        topRatedMovies={topRatedMovies}
        upComingMovies={upComingMovies}
      />
    </div>
  );
}