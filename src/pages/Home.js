/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../components/Banner";
import MovieSlide from "../components/MovieSlide";
import getMoviesThunk from "../redux/actions/movieAction";
import ClipLoader from "react-spinners/ClipLoader";

const Home = () => {
  const dispatch = useDispatch();
  const { popularMovies, topRatedMovies, upcomingMovies, loading } =
    useSelector((state) => state.movies);
  console.log(popularMovies);
  useEffect(() => {
    dispatch(getMoviesThunk());
  }, []);
  if (loading) {
    return <ClipLoader color="#ffff" loading={loading} size={150} />;
  }
  return (
    <div>
      <Banner movie={popularMovies.results[0]} />
      <h1>Popular Movies</h1>
      <MovieSlide movies={popularMovies} />
      <h1>Top Rated Movies</h1>
      <MovieSlide movies={topRatedMovies} />
      <h1>Upcoming Movies</h1>
      <MovieSlide movies={upcomingMovies} />
    </div>
  );
};

export default Home;
