import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogInState: (state, action) => {
      state.user = action.payload;
    },
    userLogOutState: (state) => {
      state.user = null;
    },
  },
});

export const { userLogInState, userLogOutState } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
