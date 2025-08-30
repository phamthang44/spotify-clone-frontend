import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, logout } from "../store/authSlice.js";
import {refreshToken} from "../../modules/auth/services/authService.js";
import {useNavigate} from "react-router-dom";
import SpinnerLoading from "./SpinnerLoading.jsx";
import {useToast} from "../contexts/ToastContext.jsx";
import { format } from "./utils/helper.js";
import { useLocation } from "react-router-dom";

function AuthChecker({ children }) {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { accessToken } = useSelector((state) => state.auth);
    const [initDone, setInitDone] = useState(false); // kiểm soát chỉ gọi refresh 1 lần
    const calledRef = useRef(false);
    const { addToast } = useToast();
    const isAuthPage = location.pathname.includes("/signup") || location.pathname.includes("/login");
    const isVerifying = location.pathname.includes("/verify");
    useEffect(() => {
        const initAuth = async () => {
            try {
                if (!isVerifying) {
                    const res = await refreshToken();
                    dispatch(setCredentials({
                        accessToken: res.accessToken,
                        isAuthenticated: true,
                        isLoading: false,
                    }));
                }
            } catch (err) {
                if (err.response?.data?.status === 401) {
                    if (err.response?.data?.message.includes("No refresh token provided")) {
                        navigate("/login");
                    } else if (err.response?.data?.message.includes("Invalid or revoked refresh token")) {
                        navigate("/login");
                    } else if (err.response?.data?.message.includes("verification")) {
                        navigate("/verify");
                    }
                } else if (err.response?.data?.status === 500) {
                    navigate("/login");
                } else if (err.response?.data?.status === 403 && err.response?.data?.message.includes("not verified")) {
                    navigate("/verify")
                }
                dispatch(logout());
            } finally {
                setInitDone(true); // đã thử refresh xong 1 lần
            }
        };
        if (isAuthPage) {
            setInitDone(true);
            return;
        }
        if (!accessToken && !calledRef.current) {
            calledRef.current = true;
            initAuth();
        } else {
            setInitDone(true);
        }
    }, [accessToken, dispatch, isAuthPage]);

    // Hiển thị loading cho đến khi check xong refresh
    if (!initDone) {
        return <SpinnerLoading />
    };
    return children;
}

export default AuthChecker;