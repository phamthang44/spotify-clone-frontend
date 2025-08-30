import { Outlet } from 'react-router-dom';
import Privacy from "../components/Privacy.jsx";
export default function AuthLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="h-full flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-[#292929] to-black">
                <Outlet />
            </div>
        </div>
    );
}