import { useEffect, useRef } from "react";
import { refreshToken } from "../../modules/auth/services/authService.js";

export const useAuthInit = () => {
    // const dispatch = useDispatch();
    const called = useRef(false);
    useEffect(() => {
        if (called.current) return; // ngăn gọi lần 2
        called.current = true;
        refreshToken().then((data) => {
            console.log(data);
        });
        refreshToken().catch(() => {
            console.log("Refresh token failed");
        });
    }, []);
};
