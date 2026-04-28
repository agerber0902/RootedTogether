import { Affirmation, TodaysAffirmation } from '@/models/affirmation';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProgressState {
  value: {
    defaultAffirmations: Affirmation[];
    userCreatedAffirmations: Affirmation[];
    anonymousUserCreatedAffirmations: Affirmation[];
    todaysAffirmations: TodaysAffirmation[];
    todaysAffirmationDayKey: string | undefined;
  };
}

const initialState: ProgressState = {
  value: {
    defaultAffirmations: [],
    userCreatedAffirmations: [],
    anonymousUserCreatedAffirmations: [],
    todaysAffirmations: [],
    todaysAffirmationDayKey: undefined,
  },
};

const affirmationSlice = createSlice({
  name: 'affirmations',
  initialState,
  reducers: {
    setDefaultAffirmations: (state, action: PayloadAction<Affirmation[]>) => {
      state.value.defaultAffirmations = action.payload;
    },
    setUserCreatedAffirmations: (state, action: PayloadAction<Affirmation[]>) => {
        state.value.userCreatedAffirmations = action.payload;
    },
    setAnonymousUserCreatedAffirmations: (state, action: PayloadAction<Affirmation[]>) => {
        state.value.anonymousUserCreatedAffirmations = action.payload;
    },
    setTodaysAffirmation: (state, action: PayloadAction<{ affirmations: TodaysAffirmation[]; dayKey: string }>) => {
      state.value.todaysAffirmations = action.payload.affirmations;
      state.value.todaysAffirmationDayKey = action.payload.dayKey;
    },
    resetUserCreatedAffirmations: (state) => {
        state.value.userCreatedAffirmations = [];
    },
    resetTodaysAffirmation: (state) => {
      state.value.todaysAffirmations = [];
      state.value.todaysAffirmationDayKey = undefined;
    },
  },
});

export const {
    setUserCreatedAffirmations,
    setTodaysAffirmation,
    resetUserCreatedAffirmations,
    resetTodaysAffirmation,
    setDefaultAffirmations,
    setAnonymousUserCreatedAffirmations,
} = affirmationSlice.actions;

export default affirmationSlice.reducer;