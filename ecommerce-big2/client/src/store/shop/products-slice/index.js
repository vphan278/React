import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
  isLoading: false,
};

export const fetchAllProducts = createAsyncThunk("products/fetchAll", async () => {
  const res = await axios.get("http://localhost:5000/api/shop/products");
  return res.data?.data || [];
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (s)=>{ s.isLoading=true; })
      .addCase(fetchAllProducts.fulfilled, (s,a)=>{ s.isLoading=false; s.productList=a.payload; })
      .addCase(fetchAllProducts.rejected, (s)=>{ s.isLoading=false; s.productList=[]; });
  },
});

export default productsSlice.reducer;
