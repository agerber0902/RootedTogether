import { Affirmation, TodaysAffirmation } from '@/constants/models/affirmation';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProgressState {
  value: {
    todaysAffirmation: TodaysAffirmation | undefined;
    userCreatedAffirmations: Affirmation[];
  };
}

const initialState: ProgressState = {
  value: {
    todaysAffirmation: undefined,
    userCreatedAffirmations: [],
  },
};

const affirmationSlice = createSlice({
  name: 'affirmation',
  initialState,
  reducers: {
    setTodaysAffirmation: (state, action: PayloadAction<TodaysAffirmation | undefined>) => {
        state.value.todaysAffirmation = action.payload;
    },
    setUserCreatedAffirmations: (state, action: PayloadAction<Affirmation[]>) => {
      state.value.userCreatedAffirmations = action.payload;
    },
  },
});

export const {
    setTodaysAffirmation,
    setUserCreatedAffirmations
} = affirmationSlice.actions;

export default affirmationSlice.reducer;