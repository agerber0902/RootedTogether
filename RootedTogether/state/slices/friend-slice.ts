import { InvitedFriend, FriendDisplay } from "@/models/friends";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProgressState {
  value: {
    friends: InvitedFriend[];
    friendDisplays: FriendDisplay[];
  };
}

const initialState: ProgressState = {
  value: {
    friends: [],
    friendDisplays: [],
  },
};

const friendSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    setFriends: (state, action: PayloadAction<InvitedFriend[]>) => {
      state.value.friends = action.payload;
    },
    setFriendDisplays: (state, action: PayloadAction<FriendDisplay[]>) => {
      state.value.friendDisplays = action.payload;
    },
    resetfriends: (state) => {
      state.value.friends = [];
      state.value.friendDisplays = [];
    },
  },
});

export const { setFriends, setFriendDisplays, resetfriends } =
  friendSlice.actions;

export default friendSlice.reducer;
