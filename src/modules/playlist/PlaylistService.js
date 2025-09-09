import api from "../../core/services/axiosClient.js"

export const playlistService = {

    getUserPlaylists: () => {
        return api.get(`/playlists`)
    },
    createNewPlaylist: async () => {
        const res = await api.post(`/playlists`);
        return res.data;
    },
    getPlaylistById: async (id) => {
        return await api.get(`/playlists/${id}`);
    },
    loadPlaylists: async () => {
        const res  = await api.get(`/playlists`);
        return res.data;
    },
    updatePlaylist: async (playlistId) => {
        const res = await api.put(`/playlists/${playlistId}`);
        return res.data;
    },
    deletePlaylist: async (id) => {
        return await api.delete(`/playlists/${id}`);
    }
}


