import { Affirmation } from '@/models/affirmation';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProgressState {
  value: {
    userCreatedAffirmations: Affirmation[];
  };
}

const initialState: ProgressState = {
  value: {
    userCreatedAffirmations: [],
  },
};

const affirmationSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserCreatedAffirmations: (state, action: PayloadAction<Affirmation[]>) => {
        state.value.userCreatedAffirmations = action.payload;
    },
    resetUserCreatedAffirmations: (state) => {
        state.value.userCreatedAffirmations = [];
    },
  },
});

export const {
    setUserCreatedAffirmations,
    resetUserCreatedAffirmations,
} = affirmationSlice.actions;

export default affirmationSlice.reducer;