import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],   // chứa list playlists
    loading: false,
    error: null,
};

const playlistsSlice = createSlice({
    name: "playlists",
    initialState,
    reducers: {
        fetchPlaylistsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchPlaylistsSuccess(state, action) {
            state.loading = false;
            state.items = action.payload;
        },
        fetchPlaylistsFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        clearPlaylists(state) {
            state.items = [];
        },
    },
});

export const {
    fetchPlaylistsStart,
    fetchPlaylistsSuccess,
    fetchPlaylistsFailure,
    clearPlaylists,
} = playlistsSlice.actions;

export default playlistsSlice.reducer;
