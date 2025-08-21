import axios from "axios";
import {logout, setCredentials} from "../store/authSlice.js";
import {store} from "../store/store.js";

// Tạo instance axios
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true, // cho phép gửi cookie kèm request
});

// Interceptor thêm accessToken vào header
api.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.accessToken; // lấy từ Redux/Zustand
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor xử lý 401 -> refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const res = await api.post("/users/refresh");
                const newAccessToken = res.data.accessToken;

                store.dispatch(setCredentials({// giữ nguyên user
                    accessToken: newAccessToken,      // update token mới
                }));

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest); // retry request
            } catch (err) {
                store.dispatch(logout()); // nếu refresh fail -> logout
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

export default api;