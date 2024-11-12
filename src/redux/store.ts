"use client"

import { apiSlice } from "./features/api/apiSlice";
import { persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "@/redux/features/auth/authSlice";
import memberReducer from "@/redux/features/auth/memberSlice";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        user: memberReducer,
    },
    devTools: false,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})

export const persistor = persistStore(store);
export default store;