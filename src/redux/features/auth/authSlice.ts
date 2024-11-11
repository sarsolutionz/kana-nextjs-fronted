import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
    access_token: null,
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMember: (state, action) => {
            state.access_token = action.payload.access_token;
            state.user = action.payload.user;
        },
        unSetMember: (state) => {
            state.access_token = null;
            state.user = null;
        },
    },
})

export const { setMember, unSetMember } = authSlice.actions;

const persistConfig = {
    key: "auth",
    storage,
}

export const authReducer = persistReducer(persistConfig, authSlice.reducer);

// export default authSlice.reducer;