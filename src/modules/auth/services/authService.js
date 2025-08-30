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

export async function verifyToken(token) {
    const res = await api.get("/auth/verify-email?token=" + token, { withCredentials: true });
    return res.data;
}

export async function resendVerification(email) {
    const res = await api.post("/auth/resend-verification", {email: email}, { withCredentials: true });
    return res.data;
}

export async function getEmailFromRefreshToken() {
    const res = await api.get("/auth/email-from-cookie", { withCredentials: true });
    return res.data;
}


export async function signup(registerDto) {
    if (!registerDto) throw new Error("Invalid data request");

    for (const [key, value] of Object.entries(registerDto)) {
        if (value === undefined || value === null || value === "") {
            throw new Error(`${key} is required`);
        }
    }

    try {
        const res = await api.post("/auth/register", registerDto, { withCredentials: true });
        if (!(res.status === 201)) {
            const errorData = await res.data
            throw new Error(errorData.message || "Signup failed");
        }
        return res.data;
    } catch (error) {
        console.log("Signup API error:", error);
        throw error;
    }
}

export async function getUserStatus() {
    const res = await api.get("/auth/users/status", { withCredentials: true });
    return res.data;
}

export async function completeSignup(registerDto) {
    if (!registerDto) throw new Error("Invalid data request");

    for (const [key, value] of Object.entries(registerDto)) {
        if (value === undefined || value === null || value === "") {
            throw new Error(`${key} is required`);
        }
    }

    try {
        const res = await api.post("/auth/complete-signup", registerDto, { withCredentials: true });
        if (!(res.status === 200)) {
            const errorData = await res.data
            throw new Error(errorData.message || "Signup failed");
        }
        return res.data;
    } catch (error) {
        console.log("Complete Signup API error:", error);
        throw error;
    }
}