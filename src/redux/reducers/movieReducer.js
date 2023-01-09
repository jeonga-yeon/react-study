import { createSlice } from "@reduxjs/toolkit";
import getMoviesThunk from "../actions/movieAction";

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
