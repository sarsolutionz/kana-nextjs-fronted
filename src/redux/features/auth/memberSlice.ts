import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: "",
    name: "",
}

export const memberSlice = createSlice({
    name: "member_info",
    initialState,
    reducers: {
        setMemberInfo: (state, action) => {
            state.email = action.payload.email
            state.name = action.payload.name
        },
        unsetMemberInfo: (state, action) => {
            state.email = action.payload.email
            state.name = action.payload.name
        },
    }
})

export const { setMemberInfo, unsetMemberInfo } = memberSlice.actions;

export default memberSlice.reducer;