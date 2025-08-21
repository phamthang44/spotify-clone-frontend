import api from "../../../core/services/axiosClient.js";
import { store } from "../../../core/store/store.js";
import { setCredentials, logout } from "../../../core/store/authSlice.js";

export const login = async (formData) => {
    const res = await api.post("/users/login", formData);
    return res.data; // { accessToken, user, ... }
};

export const refresh = async () => {
    try {
        const res = await api.post("/users/refresh");
        const newAccessToken = res.data.data.accessToken;

        store.dispatch(setCredentials(newAccessToken));
        return newAccessToken;
    } catch (err) {
        console.error("Refresh failed:", err);
        store.dispatch(logout());
        return null;
    }
};