import { Outlet } from 'react-router-dom';
export default function AuthLayout() {
    return (
        <div className="h-screen flex flex-col overflow-hidden">
            {/* Phần trên: login form */}
            <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-[#292929] to-black">
                <Outlet />
            </div>

            {/* Phần dưới: privacy */}
            <div className="h-20">
                <div className="bg-[#121212] w-full h-full flex justify-center items-center">
                    <p className="text-[#cbc6bc] text-[12px] font-poppins font-[500]">This site is protected by reCAPTCHA and the Google <a className="underline cursor-pointer">Privacy Policy</a> and <a className="underline cursor-pointer">Terms of Service</a> apply.</p>
                </div>
            </div>
        </div>
    );
}