/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

export interface AuthState {
  access_token: { access: string | null } | null;  // Structure of the access_token
  user: boolean;  // Boolean for user authentication status
  email: string | null;
}

const initialState: AuthState = {
    access_token: null,
    user: false,  // to track authentication status
    email: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMember: (state, action) => {
            state.access_token = action.payload.access_token;
            state.user = action.payload.user;
            state.email = action.payload.email;
        },
        unSetMember: (state) => {
            state.access_token = null;
            state.user = false;
            state.email = null;
        },
    },
});

const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

export const { setMember, unSetMember } = authSlice.actions;

const persistConfig = {
    key: "auth",
    storage,
}

export const authReducer = persistReducer(persistConfig, authSlice.reducer);

export interface RootState {
  auth: AuthState;  // Auth state is part of the root state
  // other slices go here, e.g. user, settings, etc.
}

// export default authSlice.reducer;