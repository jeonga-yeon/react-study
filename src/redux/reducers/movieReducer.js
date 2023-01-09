import { createReducer } from "@reduxjs/toolkit";
import {
  getMoviesFailure,
  getMoviesRequest,
  getMoviesSuccess,
} from "../actions/movieAction";

let initialState = {
  popularMovies: {},
  topRatedMovies: {},
  upcomingMovies: {},
  loading: true,
  genreList: [],
};

const movieReducer = createReducer(initialState, {
  [getMoviesRequest]: (state) => ({ ...state, loading: true }),
  [getMoviesSuccess]: (state, action) => ({
    ...state,
    popularMovies: action.payload.popularMovies,
    topRatedMovies: action.payload.topRatedMovies,
    upcomingMovies: action.payload.upcomingMovies,
    loading: false,
    genreList: action.payload.genreList,
  }),
  [getMoviesFailure]: (state) => ({ ...state, loading: false }),
});

export default movieReducer;
