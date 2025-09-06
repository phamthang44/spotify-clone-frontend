import { createSlice } from "@reduxjs/toolkit";

const playlistSlice = createSlice({
    name: 'playlist',
    initialState: {
        id: null,
        title: null,
        image: null,
        description: null,
        ownerName: null,
        songs: [],
    },
    reducers: {
        setPlaylistData(state, action) {
            return { ...state, ...action.payload };
        },
        clearPlaylistData(state) {
            return {
                id: null,
                title: null,
                image: null,
                description: null,
                ownerName: null,
                songs: [],
            };
        },
    },
});

export const { setPlaylistData, clearPlaylistData } = playlistSlice.actions;
export default playlistSlice.reducer;
