import { combineReducers, configureStore } from "@reduxjs/toolkit";
import movies from "./modules/movieSlice";

const rootReducer = combineReducers({
  movies: movies.reducer,
  devTools: process.env.NODE_ENV !== "production",
});

let store = configureStore({ reducer: rootReducer });

export default store;
