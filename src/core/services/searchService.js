import api from './axiosClient.js';
import {configUrl} from '../config/config.js';

export const searchServices = {
    searchByKeyword: async (query) => {
        return await api.get(configUrl.API_URL + "/search/query=" + query, {withCredentials: true});
    }
}