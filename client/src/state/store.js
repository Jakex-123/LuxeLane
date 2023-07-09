import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './cartSlice.js'

const Store = configureStore({
    reducer: {
        cart: cartSlice
    }
})

export default Store;