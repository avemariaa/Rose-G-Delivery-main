import { createSlice } from "@reduxjs/toolkit";

const bagUiSlice = createSlice({
  name: "bagUi",
  initialState: { bagIsVisible: false },

  reducers: {
    toggle(state) {
      state.bagIsVisible = !state.bagIsVisible;
    },
  },
});

export const bagUiActions = bagUiSlice.actions;
export default bagUiSlice;
