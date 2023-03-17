import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bagItems: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const bagSlice = createSlice({
  name: "bag",
  initialState: initialState,

  reducers: {
    //------------------ Add Item ------------------//
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.bagItems.find(
        (item) => item.foodId === newItem.foodId
      );
      state.totalQuantity++;

      if (!existingItem) {
        state.bagItems.push({
          foodId: newItem.foodId,
          foodName: newItem.foodName,
          img: newItem.img,
          price: newItem.price,
          foodQty: newItem.foodQty,
          totalPrice: newItem.totalPrice,
        });
      } else {
        existingItem.foodQty++;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.price);
        console.log("increase");
      }

      state.subTotalAmount = state.bagItems.reduce(
        (subTotal, item) =>
          subTotal + Number(item.price) * Number(item.foodQty),
        0
      );

      // state.totalAmount = state.bagItems.reduce(
      //   (total, item) => total + Number(item.price) * Number(item.foodQty),
      //   +50,
      //   0
      // );
      state.totalAmount = state.subTotalAmount + 50;
    },

    //------------------ Remove Item ------------------//
    removeItem(state, action) {
      const itemToRemove = action.payload;
      const existingItem = state.bagItems.find(
        (item) => item.foodId === itemToRemove
      );
      state.totalQuantity--;

      if (existingItem) {
        if (existingItem.foodQty === 1) {
          state.bagItems = state.bagItems.filter(
            (item) => item.foodId !== itemToRemove
          );
          console.log("decrease");
        } else {
          existingItem.foodQty--;
          existingItem.totalPrice =
            Number(existingItem.totalPrice) - Number(existingItem.price);
          console.log("decrease");
        }
      }

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
        state.totalQuantity = state.totalQuantity - existingItem.foodQty;
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
  },
});

export const bagActions = bagSlice.actions;
export default bagSlice;
