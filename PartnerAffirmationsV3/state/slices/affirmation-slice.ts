import { Affirmation } from '@/models/affirmation';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProgressState {
  value: {
    userCreatedAffirmations: Affirmation[];
    todaysAffirmation: Affirmation | undefined;
    todaysAffirmationDayKey: string | undefined;
  };
}

const initialState: ProgressState = {
  value: {
    userCreatedAffirmations: [],
    todaysAffirmation: undefined,
    todaysAffirmationDayKey: undefined,
  },
};

const affirmationSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserCreatedAffirmations: (state, action: PayloadAction<Affirmation[]>) => {
        state.value.userCreatedAffirmations = action.payload;
    },
    setTodaysAffirmation: (state, action: PayloadAction<{ affirmation: Affirmation | undefined; dayKey: string }>) => {
      state.value.todaysAffirmation = action.payload.affirmation;
      state.value.todaysAffirmationDayKey = action.payload.dayKey;
    },
    resetUserCreatedAffirmations: (state) => {
        state.value.userCreatedAffirmations = [];
    },
    resetTodaysAffirmation: (state) => {
      state.value.todaysAffirmation = undefined;
      state.value.todaysAffirmationDayKey = undefined;
    },
  },
});

export const {
    setUserCreatedAffirmations,
    setTodaysAffirmation,
    resetUserCreatedAffirmations,
    resetTodaysAffirmation,
} = affirmationSlice.actions;

export default affirmationSlice.reducer;