import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id || item.color !== action.payload.color
      );
    },
    updateQuantity: (state, action) => {
      const { id, color, quantity } = action.payload;
      const item = state.cartItems.find(
        (item) => item.id === id && item.color === color
      );
      if (item) {
        item.quantity += quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
