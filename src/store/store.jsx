// import { configureStore } from "@reduxjs/toolkit";
// import bagSlice from "../store/MyBag/bagSlice";
// import bagUiSlice from "../store/MyBag/bagUiSlice";
// import userReducer from "../store/UserSlice/userSlice";

// const store = configureStore({
//   reducer: {
//     bag: bagSlice.reducer,
//     bagUi: bagUiSlice.reducer,
//     user: userReducer,
//   },
// });

// export default store;

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import bagSlice from "../store/MyBag/bagSlice";
import bagUiSlice from "../store/MyBag/bagUiSlice";
import userReducer from "../store/UserSlice/userSlice";

const bagMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type.startsWith("bag/")) {
    const bagState = store.getState().bag;
    localStorage.setItem("bagData", JSON.stringify(bagState));
  }
  return result;
};

const store = configureStore({
  reducer: {
    bag: bagSlice.reducer,
    bagUi: bagUiSlice.reducer,
    user: userReducer,
  },
  middleware: [...getDefaultMiddleware(), bagMiddleware],
});

export default store;
