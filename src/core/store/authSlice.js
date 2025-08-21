import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: null,
    isAuthenticated: false,
    isLoading: true,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.isAuthenticated = true;
            state.isLoading = false;
        },
        logout: (state) => {
            state.accessToken = null;
            state.isAuthenticated = false;
            state.isLoading = false;
        },
        finishLoading: (state) => { // nếu refresh fail
            state.isLoading = false;
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;