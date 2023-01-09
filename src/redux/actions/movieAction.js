/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import api from "../api";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
export const getMoviesRequest = createAction("GET_MOVIES_REQUEST");
export const getMoviesSuccess = createAction("GET_MOVIES_SUCCESS");
export const getMoviesFailure = createAction("GET_MOVIES_FAILURE");

const API_KEY = process.env.REACT_APP_API_KEY;

const getMoviesThunk = createAsyncThunk(
  "movies/getMoviesThunk",
  async (thunkAPI) => {
    try {
      const popularMovieApi = api.get(
        `/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );

      const topRatedApi = api.get(
        `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      );

      const upcomingApi = api.get(
        `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
      );

      const genreApi = api.get(
        `/genre/movie/list?api_key=${API_KEY}&language=en-US`
      );

      let [popularMovies, topRatedMovies, upcomingMovies, genreList] =
        await Promise.all([
          popularMovieApi,
          topRatedApi,
          upcomingApi,
          genreApi,
        ]);
      return {
        popularMovies: popularMovies.data,
        topRatedMovies: topRatedMovies.data,
        upcomingMovies: upcomingMovies.data,
        genreList: genreList.data.genres,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export default getMoviesThunk;
