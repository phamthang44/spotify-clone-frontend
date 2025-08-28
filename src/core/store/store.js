import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import oauthReducer from "./oauthSlice.js";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        oauthSignup: oauthReducer,
    },
});