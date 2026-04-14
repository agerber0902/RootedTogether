import { AffirmationUser } from '@/models/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProgressState {
  value: {
    affirmationUser: AffirmationUser | undefined;
  };
}

const initialState: ProgressState = {
  value: {
    affirmationUser: undefined,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AffirmationUser | undefined>) => {
      state.value.affirmationUser = action.payload;
    },
  },
});

export const {
    setUser
} = userSlice.actions;

export default userSlice.reducer;