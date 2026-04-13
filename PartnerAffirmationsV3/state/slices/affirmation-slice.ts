import { Affirmation, TodaysAffirmation } from '@/models/affirmation';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProgressState {
  value: {
    userCreatedAffirmations: Affirmation[];
    todaysAffirmations: TodaysAffirmation[];
    todaysAffirmationDayKey: string | undefined;
  };
}

const initialState: ProgressState = {
  value: {
    userCreatedAffirmations: [],
    todaysAffirmations: [],
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
} = affirmationSlice.actions;

export default affirmationSlice.reducer;