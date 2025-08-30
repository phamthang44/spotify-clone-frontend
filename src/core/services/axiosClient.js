import axios from "axios";
import {logout, setCredentials} from "../store/authSlice.js";
import {setVerifyInformation} from "../store/verifySlice.js";
import {store} from "../store/store.js";
import toast from "react-hot-toast";

// Tạo instance axios
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true, // cho phép gửi cookie kèm request
});

const refreshApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

// Interceptor thêm accessToken vào header
api.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.accessToken; // lấy từ Redux/Zustand
        if (token) {
            console.log(token);
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor xử lý 401 -> refresh
api.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;
        if (import.meta.env.MODE === "development") {
            if (error.response.status === 403 && error.response.data.message.includes("Email not verified")) {
                const parts = error.response.data.message.split(": ");
                const email = parts[1] || null;
                store.dispatch(setVerifyInformation({
                    email,
                    message: error?.response?.data?.message,
                }));
                toast.error(error.response.data.message);
            }

            console.error(
                `[API ${error.response?.status}]`,
                error.response?.data?.message || error.message
            );
        }
        if (originalRequest._skipGlobalErrorHandler) {
            return Promise.reject(error);
        }

        //handle refresh token
        if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes("/refresh")) {
            originalRequest._retry = true;
            try {
                const res = await refreshApi.post("/users/refresh"); // cookie tự động gửi
                const newAccessToken = res.data.accessToken;

                store.dispatch(setCredentials({ accessToken: newAccessToken, isAuthenticated: true, isLoading: false }));

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest); // retry request gốc
            } catch (err) {
                store.dispatch(logout());
                if (!originalRequest._notified) {
                    originalRequest._notified = true;
                    // dùng toast hoặc alert
                    if (err.status === 403) {
                        //toast.error("Session has been expired. Please login again.");
                    }
                }
                toast.error("Session expired. Please login again.");
                return Promise.reject(err);
            }
        }

        if ([401, 403].includes(error.response?.status)) {
            store.dispatch(logout());
            toast.error("Session expired. Please login again.");
        }

        // --- Xử lý lỗi khác (404, 500) ---
        if ([404, 500].includes(error.response?.status)) {
            toast.error(error.response?.data?.message || "Something went wrong!");
        }

        return Promise.reject(error);
    }
);



export default api;