import { PartnerConnection, PartnerConnectionDisplay } from '@/constants/models/partnerConnection';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PartnerConnectionState {
  value: {
    partnerConnections: PartnerConnection[];
    displayConnections: PartnerConnectionDisplay[];
  };
}

const initialState: PartnerConnectionState = {
  value: {
    partnerConnections: [],
    displayConnections: [],
  },
};

const partnerConnectionSlice = createSlice({
  name: 'patnerConnection',
  initialState,
  reducers: {
    setPartnerConnections: (state, action : PayloadAction<PartnerConnection[]>) => {
      state.value.partnerConnections = action.payload;
    },
    setDisplayConnections: (state, action: PayloadAction<PartnerConnectionDisplay[]>) => {
      state.value.displayConnections = action.payload;
    },
  },
});

export const {
  setPartnerConnections,
  setDisplayConnections,
} = partnerConnectionSlice.actions;

export default partnerConnectionSlice.reducer;