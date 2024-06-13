import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";

const UserSlice = createSlice({
    name: "UserSlice",
    initialState: { auth: JSON.parse(localStorage.getItem("auth")) },

    reducers: {},
    extraReducers: builder => builder
        .addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
            state.auth = payload
        })
        .addMatcher(authApi.endpoints.logout.matchFulfilled, (state, { payload }) => {
            state.auth = null
        })



})

export default UserSlice.reducer