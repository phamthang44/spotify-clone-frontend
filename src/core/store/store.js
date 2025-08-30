import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import oauthReducer from "./oauthSlice.js";
import verifyReducer from "./verifySlice.js";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        oauthSignup: oauthReducer,
        verify: verifyReducer,
    },
});