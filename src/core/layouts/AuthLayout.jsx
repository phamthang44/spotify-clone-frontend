import {Outlet, useNavigate} from 'react-router-dom';
import {useSelector} from "react-redux";
import {useEffect} from "react";

export default function AuthLayout() {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/spotify");
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="min-h-screen flex flex-col">
            <div className="h-full flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-[#292929] to-black">
                <Outlet />
            </div>
        </div>
    );
}