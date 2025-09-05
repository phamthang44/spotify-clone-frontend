import api from "../../core/services/axiosClient.js"

const PlayerService = {

    getUserPlaylists: () => {
        return api.get(`/playlists`)
    }


}


