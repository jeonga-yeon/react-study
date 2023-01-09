import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

let store = configureStore({ reducer: rootReducer });

export default store;
