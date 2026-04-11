import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userReducer  from "./slices/user-slice";
import partnerConnectionReducer from "./slices/patner-connection-slice";

const rootReducer = combineReducers({ user: userReducer, partnerConnection: partnerConnectionReducer });

export const makeStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore["dispatch"];
