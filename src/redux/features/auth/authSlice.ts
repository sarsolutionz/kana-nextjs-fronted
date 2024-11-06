import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    access_token: null,
};

const authSlice = createSlice({
    name: "access_token",
    initialState,
    reducers: {
        setMemberToken: (state, action) => {
            state.access_token = action.payload.access_token
        },
        unSetMemberToken: (state, action) => {
            state.access_token = action.payload.access_token
        },
    }
})

export const { setMemberToken, unSetMemberToken } = authSlice.actions;

export default authSlice.reducer;