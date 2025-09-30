import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, logout } from "../store/authSlice.js";
import {refreshToken} from "../../modules/auth/services/authService.js";
import {useNavigate} from "react-router-dom";
import SpinnerLoading from "./SpinnerLoading.jsx";
import {useToast} from "../contexts/ToastContext.jsx";
import {format} from './utils/helper.js'
import { useLocation } from "react-router-dom";
import {userServices} from "../../modules/user/services/userService.js";
import {setUserProfileInfo} from "../store/userSlice.js";

function AuthChecker({ children }) {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { accessToken } = useSelector((state) => state.auth);
    const [initDone, setInitDone] = useState(false); // kiểm soát chỉ gọi refresh 1 lần
    const calledRef = useRef(false);

    const isAuthPage = location.pathname.includes("/signup") || location.pathname.includes("/login");
    const isVerifying = location.pathname.includes("/verify");
    useEffect(() => {
        const initAuth = async () => {
            try {
                if (!isVerifying) {
                    const res = await refreshToken();

                    dispatch(setCredentials({
                        accessToken: res.data.accessToken,
                        isAuthenticated: true,
                        isLoading: false,
                    }));

                    const userInfoResponse = await userServices.me();
                    const user = userInfoResponse.data.data;
                    dispatch(setUserProfileInfo({
                        avatarUrl: user.avatarUrl,
                        displayName: user.displayName,
                        dateOfBirth: format.formatDateOfBirth(user.dateOfBirth),
                        email: user.email,
                        phone: user.phoneNumber,
                    }));

                }
            } catch (err) {
                console.log(err);
                const status = err.response?.status;
                const msg = err.response?.data?.message;

                if (status === 401 && msg?.includes("refresh token")) {
                    dispatch(logout());
                    navigate("/login");
                } else if (status === 403 && msg?.includes("not verified")) {
                    console.log(msg)
                    navigate("/verify");
                } else if (status === 200) {
                    console.log(err)
                }
                else {
                    // ❌ không logout bừa, chỉ log warning
                    console.error("Unexpected refresh error:", err);
                }

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
        }
    }, [accessToken, dispatch, isAuthPage, isVerifying, navigate]);

    // Hiển thị loading cho đến khi check xong refresh
    if (!initDone) {
        return <SpinnerLoading />
    };
    return children;
}

export default AuthChecker;