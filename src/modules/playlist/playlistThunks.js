import {playlistService} from "./PlaylistService";
import { setPlaylistData } from "./playlistSlice";


export const fetchPlaylist = (id) => async (dispatch) => {
    try {
        const data = await playlistService.getPlaylistById(id);
        dispatch(setPlaylistData(data));
    } catch (err) {
        console.error(err);
    }
};

export const fetchNewPlaylist = (playlist) => async (dispatch) => {
    dispatch(setPlaylistData(playlist));
}
