import api from '../../../core/services/axiosClient.js';
import {configUrl} from '../../../core/config/config.js';

export const userServices = {
    me: async () => {
        return await api.get(configUrl.API_URL + "/users/me", {withCredentials: true});
    }
}