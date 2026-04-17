import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userReducer  from "./slices/user-slice";
import friendReducer from "./slices/friend-slice";
import affirmationReducer from './slices/affirmation-slice';

const rootReducer = combineReducers({ user: userReducer, friend: friendReducer, affirmation: affirmationReducer });

export const makeStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore["dispatch"];
