
import {configureStore} from '@reduxjs/toolkit';
import { combineReducers } from "redux";
import userReducer from '../state/slices/user';
import affirmationReducer from '../state/slices/affirmation';
import partnerConnectionReducer from '../state/slices/partner-connection';

const rootReducer = combineReducers({ user: userReducer, affirmation: affirmationReducer, partnerConnection: partnerConnectionReducer });

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