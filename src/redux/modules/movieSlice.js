import api from "../api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_KEY = process.env.REACT_APP_API_KEY;

export const getMoviesThunk = createAsyncThunk(
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

let initialState = {
  popularMovies: {},
  topRatedMovies: {},
  upcomingMovies: {},
  loading: true,
  genreList: [],
};

const movies = createSlice({
  name: "movieReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMoviesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMoviesThunk.fulfilled, (state, action) => {
        state.popularMovies = action.payload.popularMovies;
        state.topRatedMovies = action.payload.topRatedMovies;
        state.upcomingMovies = action.payload.upcomingMovies;
        state.loading = false;
        state.genreList = action.payload.genreList;
      })
      .addCase(getMoviesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default movies;
