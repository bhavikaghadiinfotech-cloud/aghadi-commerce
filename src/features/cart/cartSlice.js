import { createSlice } from "@reduxjs/toolkit";
import { loadFromStorage, saveToStorage } from "../../utils/storage";

const initial = loadFromStorage("cart", { items: [] });

const cartSlice = createSlice({
  name: "cart",
  initialState: initial,
  reducers: {
    addToCart(state, action) {
      const p = action.payload;
      const found = state.items.find((x) => x.id === p.id);
      if (found) {
        found.qty += 1;
      } else {
        state.items.push({
          id: p.id,
          title: p.title,
          price: p.price,
          image: p.image,
          qty: 1,
        });
      }
      saveToStorage("cart", state);
    },
    removeFromCart(state, action) {
      const id = action.payload;
      state.items = state.items.filter((x) => x.id !== id);
      saveToStorage("cart", state);
    },
    setQty(state, action) {
      const { id, qty } = action.payload;
      const item = state.items.find((x) => x.id === id);
      if (!item) return;
      item.qty = Math.max(1, Number(qty) || 1);
      saveToStorage("cart", state);
    },
    clearCart(state) {
      state.items = [];
      saveToStorage("cart", state);
    },
  },
});

export const { addToCart, removeFromCart, setQty, clearCart } = cartSlice.actions;

export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, x) => sum + x.qty, 0);

export const selectCartTotal = (state) =>
  state.cart.items.reduce((sum, x) => sum + x.price * x.qty, 0);

export default cartSlice.reducer;
