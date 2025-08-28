import api from "../../../core/services/axiosClient.js";
import refreshApi from "../../../core/services/axiosClient.js";
export const login = async (formData) => {
    const res = await api.post("/auth/login", formData, { _skipGlobalErrorHandler: true });
    return res.data; // { accessToken, user, ... }
};

export const refreshToken = async () => {
    const res = await refreshApi.post("/auth/refresh", null, { withCredentials: true, _notified: false, _skipGlobalErrorHandler: true });
    return res.data;
}

export const logoutClient = async () => {
    const res = await api.post("/auth/logout", null, { withCredentials: true });
    return res.data;
}