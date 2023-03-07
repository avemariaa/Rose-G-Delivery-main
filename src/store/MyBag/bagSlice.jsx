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
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.bagItems.find(
        (item) => item.id === newItem.id
      );
      state.totalQuantity++;

      if (!existingItem) {
        state.bagItems.push({
          id: newItem.id,
          title: newItem.title,
          image01: newItem.image01,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.price);
      }

      state.subTotalAmount = state.bagItems.reduce(
        (subTotal, item) =>
          subTotal + Number(item.price) * Number(item.quantity),
        0
      );

      state.totalAmount = state.bagItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        +50,
        0
      );
    },

    //===== remove item =====
    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.bagItems.find((item) => item.id === id);
      state.totalQuantity--;

      if (existingItem.quantity === 1) {
        state.bagItems = state.bagItems.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) - Number(existingItem.price);
      }

      state.subTotalAmount = state.bagItems.reduce(
        (subTotal, item) =>
          subTotal + Number(item.price) * Number(item.quantity),
        0
      );

      state.totalAmount = state.bagItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        +50,
        //initial value should be 0
        0
      );
    },

    //===== delete item =====
    deleteItem(state, action) {
      const id = action.payload;
      const existingItem = state.bagItems.find((item) => item.id === id);

      if (existingItem) {
        state.bagItems = state.bagItems.filter((item) => item.id !== id);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }

      state.subTotalAmount = state.bagItems.reduce(
        (subTotal, item) =>
          subTotal + Number(item.price) * Number(item.quantity),
        0
      );

      state.totalAmount = state.bagItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        +50,
        //initial value should be 0
        0
      );
    },
  },
});

export const bagActions = bagSlice.actions;
export default bagSlice;
