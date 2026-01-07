import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// thunk: fetch all products
export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
  const res = await axios.get(`${API}/products`);
  return res.data;
});

// thunk: fetch single product
export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id) => {
    const res = await axios.get(`${API}/products/${id}`);
    return res.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    selected: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelected(state) {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // all
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load products";
      })

      // single
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchProductById.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load product";
      });
  },
});

export const { clearSelected } = productsSlice.actions;
export default productsSlice.reducer;