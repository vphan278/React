import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

function loadCartFromStorageRaw() {
  try { const raw = localStorage.getItem("cart"); return raw ? JSON.parse(raw) : { items: [] }; } catch { return { items: [] }; }
}
function saveCartToStorage(cart) { try { localStorage.setItem("cart", JSON.stringify(cart)); } catch {} }

const initialState = { cartItems: { items: [] }, isLoading: false };

export const addToCart = createAsyncThunk("cart/addToCart", async ({ userId, productId, quantity }) => {
  const response = await axios.post("http://localhost:5000/api/shop/cart/add", { userId, productId, quantity });
  return response.data;
});
export const fetchCartItems = createAsyncThunk("cart/fetchCartItems", async (userId) => {
  const response = await axios.get(`http://localhost:5000/api/shop/cart/get/${userId}`);
  return response.data;
});
export const updateCartQuantity = createAsyncThunk("cart/updateCartQuantity", async ({ userId, productId, quantity }) => {
  const response = await axios.put("http://localhost:5000/api/shop/cart/update-cart", { userId, productId, quantity });
  return response.data;
});
export const deleteCartItem = createAsyncThunk("cart/deleteCartItem", async ({ userId, productId }) => {
  const response = await axios.delete(`http://localhost:5000/api/shop/cart/${userId}/${productId}`);
  return response.data;
});

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    loadFromStorage: (state) => { state.cartItems = loadCartFromStorageRaw(); },
    addItemLocal: (state, action) => {
      const { product, quantity = 1 } = action.payload || {};
      if (!product) return;
      const cart = loadCartFromStorageRaw();
      const items = Array.isArray(cart.items) ? cart.items.slice() : [];
      const pid = product?._id || product?.id;
      const idx = items.findIndex((i) => i.productId === pid);
      if (idx >= 0) items[idx] = { ...items[idx], quantity: items[idx].quantity + quantity };
      else items.push({ productId: pid, title: product?.title, image: Array.isArray(product?.images) ? product.images[0] : product?.image, price: product?.price ?? 0, salePrice: product?.salePrice ?? 0, quantity });
      const next = { ...cart, items }; saveCartToStorage(next); state.cartItems = next;
    },
    updateItemLocal: (state, action) => {
      const { productId, quantity } = action.payload || {};
      const cart = loadCartFromStorageRaw();
      const items = (cart.items || []).map((i) => i.productId === productId ? { ...i, quantity } : i).filter((i) => i.quantity > 0);
      const next = { ...cart, items }; saveCartToStorage(next); state.cartItems = next;
    },
    removeItemLocal: (state, action) => {
      const { productId } = action.payload || {};
      const cart = loadCartFromStorageRaw();
      const items = (cart.items || []).filter((i) => i.productId !== productId);
      const next = { ...cart, items }; saveCartToStorage(next); state.cartItems = next;
    },
    clearLocal: (state) => { const next = { items: [] }; saveCartToStorage(next); state.cartItems = next; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (s)=>{ s.isLoading = true; })
      .addCase(addToCart.fulfilled, (s,a)=>{ s.isLoading=false; s.cartItems = a.payload?.data || { items: [] }; })
      .addCase(addToCart.rejected, (s)=>{ s.isLoading=false; s.cartItems = { items: [] }; })
      .addCase(fetchCartItems.pending, (s)=>{ s.isLoading = true; })
      .addCase(fetchCartItems.fulfilled, (s,a)=>{ s.isLoading=false; s.cartItems = a.payload?.data || { items: [] }; })
      .addCase(fetchCartItems.rejected, (s)=>{ s.isLoading=false; s.cartItems = { items: [] }; })
      .addCase(updateCartQuantity.pending, (s)=>{ s.isLoading=true; })
      .addCase(updateCartQuantity.fulfilled, (s,a)=>{ s.isLoading=false; s.cartItems = a.payload?.data || { items: [] }; })
      .addCase(updateCartQuantity.rejected, (s)=>{ s.isLoading=false; s.cartItems = { items: [] }; })
      .addCase(deleteCartItem.pending, (s)=>{ s.isLoading=true; })
      .addCase(deleteCartItem.fulfilled, (s,a)=>{ s.isLoading=false; s.cartItems = a.payload?.data || { items: [] }; })
      .addCase(deleteCartItem.rejected, (s)=>{ s.isLoading=false; s.cartItems = { items: [] }; });
  },
});
export const { loadFromStorage, addItemLocal, updateItemLocal, removeItemLocal, clearLocal } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
