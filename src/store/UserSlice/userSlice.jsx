import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogInState: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    userLogOutState: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { userLogInState, userLogOutState } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
