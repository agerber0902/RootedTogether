import { Affirmation, TodaysAffirmation } from '@/constants/models/affirmation';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProgressState {
  value: {
    todaysAffirmation: TodaysAffirmation | undefined;
    userCreatedAffirmations: Affirmation[];
    affirmationToEditOrDelete: Affirmation | undefined;
  };
}

const initialState: ProgressState = {
  value: {
    todaysAffirmation: undefined,
    userCreatedAffirmations: [],
    affirmationToEditOrDelete: undefined,
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
    setAffirmationToEditOrDelete : (state, action: PayloadAction<Affirmation | undefined>) => {
      state.value.affirmationToEditOrDelete = action.payload;
    },
  },
});

export const {
    setTodaysAffirmation,
    setUserCreatedAffirmations,
    setAffirmationToEditOrDelete,
} = affirmationSlice.actions;

export default affirmationSlice.reducer;