import {
    fetchPlaylistsStart,
    fetchPlaylistsSuccess,
    fetchPlaylistsFailure,
} from "./playlistsSlice";
import { playlistService} from "./PlaylistService.js";
// thunk: gọi API và dispatch actions
export const fetchPlaylists = () => async (dispatch) => {
    try {
        dispatch(fetchPlaylistsStart());
        const response = await playlistService.loadPlaylists();
        if (response.status === 200) {
            dispatch(fetchPlaylistsSuccess(response.data));
        }
    } catch (err) {
        dispatch(fetchPlaylistsFailure(err.message));
    }
};
