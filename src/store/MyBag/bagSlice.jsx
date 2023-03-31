import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Firebase
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const fetchBagItems = createAsyncThunk(
  "bag/fetchBagItems",
  async (userId) => {
    const userBagRef = doc(db, "UserBag", userId);
    const userBagDoc = await getDoc(userBagRef);
    if (userBagDoc.exists()) {
      const bagItems = userBagDoc.data().bag;
      const totalQuantity = bagItems.length; // count the number of items in the bag
      return { bagItems, totalQuantity };
    }
    return initialState;
  }
);

const initialState = {
  bagItems: [],
  totalQuantity: 0, // use for the bag badge, the number of each food item in the bag
  subTotalAmount: 0,
  totalAmount: 0,
};

const bagSlice = createSlice({
  name: "bag",
  initialState: initialState,

  reducers: {
    //------------------ Add Item ------------------//
    addItem(state, action) {
      const newItem = action.payload;
      const existingItemIndex = state.bagItems.findIndex(
        (item) => item.foodId === newItem.foodId
      );

      if (existingItemIndex === -1) {
        state.bagItems.push({
          foodId: newItem.foodId,
          foodName: newItem.foodName,
          img: newItem.img,
          price: newItem.price,
          foodQty: newItem.foodQty,
          totalPrice: newItem.totalPrice,
        });
        // if the item added is not existing, +1 on the bag badge
        state.totalQuantity++;
      } else {
        const existingItem = state.bagItems[existingItemIndex];
        existingItem.foodQty++;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.price);
      }

      state.subTotalAmount = state.bagItems.reduce(
        (subTotal, item) =>
          subTotal + Number(item.price) * Number(item.foodQty),
        0
      );

      state.totalAmount = state.bagItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.foodQty),
        +50,
        0
      );
    },

    //------------------ Remove Item ------------------//
    removeItem(state, action) {
      const itemToRemove = action.payload;
      const existingItem = state.bagItems.find(
        (item) => item.foodId === itemToRemove
      );

      if (existingItem) {
        if (existingItem.foodQty === 1) {
          state.bagItems = state.bagItems.filter(
            (item) => item.foodId !== itemToRemove
          );
          // if the  existing item is remove or reaches the foodQty to 0, then -1 on the bag badge
          state.totalQuantity--;
        } else {
          existingItem.foodQty--;
          existingItem.totalPrice =
            Number(existingItem.totalPrice) - Number(existingItem.price);
        }
      }

      // update localStorage
      // localStorage.setItem("bagItems", JSON.stringify(state.bagItems));

      state.subTotalAmount = state.bagItems.reduce(
        (subTotal, item) =>
          subTotal + Number(item.price) * Number(item.foodQty),
        0
      );
      state.totalAmount = state.bagItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.foodQty),
        0
      );
    },

    //------------------ Delete Item ------------------//
    deleteItem(state, action) {
      const itemToDelete = action.payload;
      const existingItem = state.bagItems.find(
        (item) => item.foodId === itemToDelete
      );

      if (existingItem) {
        state.bagItems = state.bagItems.filter(
          (item) => item.foodId !== itemToDelete
        );
        // if the  existing item is deleted, then -1 on the bag badge
        state.totalQuantity--;
      }

      state.subTotalAmount = state.bagItems.reduce(
        (subTotal, item) =>
          subTotal + Number(item.price) * Number(item.foodQty),
        0
      );

      state.totalAmount = state.bagItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.foodQty),
        +50,
        //initial value should be 0
        0
      );
    },

    setBagItems(state, action) {
      state.bagItems = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchBagItems.fulfilled, (state, action) => {
      state.bagItems = action.payload.bagItems;
      state.totalQuantity = action.payload.totalQuantity;
      state.subTotalAmount = state.bagItems.reduce(
        (subTotal, item) =>
          subTotal + Number(item.price) * Number(item.foodQty),
        0
      );
      state.totalAmount = state.bagItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.foodQty),
        +50,
        0
      );
    });
  },
});

export const bagReducer = bagSlice.reducer;
// export const bagActions = bagSlice.actions;
export const bagActions = {
  ...bagSlice.actions,
  fetchBagItems,
};
export default bagSlice;
