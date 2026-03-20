import { PartnerConnection } from '@/constants/models/partnerConnection';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PartnerConnectionState {
  value: {
    partnerConnections: PartnerConnection[];
  };
}

const initialState: PartnerConnectionState = {
  value: {
    partnerConnections: [],
  },
};

const partnerConnectionSlice = createSlice({
  name: 'patnerConnection',
  initialState,
  reducers: {
    setPartnerConnections: (state, action : PayloadAction<PartnerConnection[]>) => {
      state.value.partnerConnections = action.payload;
    },
  },
});

export const {
  setPartnerConnections,
} = partnerConnectionSlice.actions;

export default partnerConnectionSlice.reducer;