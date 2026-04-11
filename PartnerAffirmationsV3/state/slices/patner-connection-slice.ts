import { PartnerConnection, PartnerConnectionDisplay } from '@/models/partner-connection';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProgressState {
  value: {
    partnerConnections: PartnerConnection[];
    connectionDisplays: PartnerConnectionDisplay[];
  };
}

const initialState: ProgressState = {
  value: {
    partnerConnections: [],
    connectionDisplays: [],
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPartnerConnections: (state, action: PayloadAction<PartnerConnection[]>) => {
        state.value.partnerConnections = action.payload;
    },
    setConnectionDisplays: (state, action: PayloadAction<PartnerConnectionDisplay[]>) => {
        state.value.connectionDisplays = action.payload;
    },
  },
});

export const {
    setPartnerConnections,
    setConnectionDisplays,
} = userSlice.actions;

export default userSlice.reducer;