import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
} from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { bagReducer } from "../store/MyBag/bagSlice";
import bagUiSlice from "../store/MyBag/bagUiSlice";
import userReducer from "../store/UserSlice/userSlice";

const bagMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type.startsWith("bag/")) {
    // const bagState = store.getState().bag;
    // localStorage.setItem("bagData", JSON.stringify(bagState));

    const bagState = store.getState().bag;
    const userId = store.getState().user.user?.id || "default"; // assuming you have a user ID field
    localStorage.setItem(`bagData_${userId}`, JSON.stringify(bagState));
  }
  return result;
};

const rootReducer = combineReducers({
  bag: bagReducer,
  bagUi: bagUiSlice.reducer,
  user: userReducer,
});

// const resettableReducer = (state, action) => {
//   if (action.type === "user/userLogOutState") {
//     state = undefined;
//   }

//   if (action.type === "user/userLogInState") {
//     const persistedBagState = JSON.parse(localStorage.getItem("bagData"));
//     state = {
//       ...state,
//       bag: {
//         ...state.bag,
//         ...persistedBagState,
//       },
//     };
//   }

//   return rootReducer(state, action);
// };
const resettableReducer = (state, action) => {
  if (action.type === "user/userLogOutState") {
    state = undefined;
    localStorage.clear();
  }

  if (action.type === "user/userLogInState") {
    const userId = action.payload.id; // assuming you have a user ID field
    const persistedBagState = JSON.parse(
      localStorage.getItem(`bagData_${userId}`)
    );
    state = {
      ...state,
      bag: {
        ...state.bag,
        ...persistedBagState,
      },
    };
  }

  return rootReducer(state, action);
};
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["bag", "user"],
};

// const persistedReducer = persistReducer(persistConfig, rootReducer);
const persistedReducer = persistReducer(persistConfig, resettableReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [...getDefaultMiddleware(), bagMiddleware],
});

const persistor = persistStore(store);

export { store, persistor };
