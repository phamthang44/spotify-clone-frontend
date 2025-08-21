import { useEffect, useRef } from "react";
import { refresh } from "../../modules/auth/services/authService.js";

export const useAuthInit = () => {
    // const dispatch = useDispatch();
    const called = useRef(false);
    useEffect(() => {
        if (called.current) return; // ngăn gọi lần 2
        called.current = true;
        refresh().then((data) => {
            console.log(data);
        });
        refresh().catch(() => {
            console.log("Không thể refresh token, cần login lại");
        });
    }, []);
};
