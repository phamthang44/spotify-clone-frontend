import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import oauthReducer from "./oauthSlice.js";
import verifyReducer from "./verifySlice.js";
import userReducer from "./userSlice.js";
import playlistReducer from '../../modules/playlist/playlistSlice.js';
import playlistsReducer from '../../modules/playlist/playlistsSlice.js';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        oauthSignup: oauthReducer,
        verify: verifyReducer,
        userProfile: userReducer,
        playlist: playlistReducer,
        playlists: playlistsReducer,
    },
});