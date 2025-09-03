import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index.js";
import shopCartSlice from "./shop/cart-slice/index.js";
import shopProductsSlice from "./shop/products-slice/index.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    shopCart: shopCartSlice,
    shopProducts: shopProductsSlice,
  },
});

export default store;
