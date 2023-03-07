import { configureStore } from "@reduxjs/toolkit";
import bagSlice from "../store/MyBag/bagSlice";
import bagUiSlice from "../store/MyBag/bagUiSlice";
import userReducer from "../store/UserSlice/userSlice";

const store = configureStore({
  reducer: {
    bag: bagSlice.reducer,
    bagUi: bagUiSlice.reducer,
    user: userReducer,
  },
});

export default store;
