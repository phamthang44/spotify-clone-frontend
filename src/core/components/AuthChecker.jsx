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
    const { accessToken } = useSelector((state) => state.auth);
    const [initDone, setInitDone] = useState(false); // kiểm soát chỉ gọi refresh 1 lần
    const calledRef = useRef(false);
    const { addToast } = useToast();
    const isAuthPage = location.pathname.includes("/signup") || location.pathname.includes("/login");
    useEffect(() => {
        const initAuth = async () => {
            try {
                const res = await refreshToken();
                dispatch(setCredentials({
                    accessToken: res.accessToken,
                    isAuthenticated: true,
                    isLoading: false,
                }));
            } catch (err) {
                if (err.response?.data?.status === 401) {
                    addToast.error(format.formatMessageInvalidExpiredRefreshToken(err.response.data.message));
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