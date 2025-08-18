import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice"
import searchFilterReducer from "./slices/searchFilterSlice"
import userReducer from "./slices/userSlice"
import allJobsReducer from "./slices/allJobsSlice"

export const store = configureStore({
    reducer:{
        category: categoryReducer,
        searchFilter: searchFilterReducer,
        user: userReducer,
        job: allJobsReducer,
    },
})