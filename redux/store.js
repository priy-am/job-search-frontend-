import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice"
import searchFilterReducer from "./searchFilterSlice"
import userReducer from "./userSlice"

export const store = configureStore({
    reducer:{
        category: categoryReducer,
        searchFilter: searchFilterReducer,
        user: userReducer,
    },
})