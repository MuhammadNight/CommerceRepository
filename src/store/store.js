import { configureStore } from "@reduxjs/toolkit";
import products from "./slices/products";
import pageActions from "./slices/pageActions";
import categoriy from "./slices/categoriy";
import cart from "./slices/cart";
export const store = configureStore({
    reducer: {
        product: products,
        categoriy: categoriy,
        cart:cart,
        pageActions:pageActions
    }
})