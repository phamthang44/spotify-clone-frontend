import Button from '../components/Common/Button.jsx';
import GoogleIcon from "../../../core/assets/icons/GoogleIcon.jsx";
import AppleIcon from "../../../core/assets/icons/AppleIcon.jsx";
import FacebookIcon from "../../../core/assets/icons/FacebookIcon.jsx";
import {Link, useNavigate} from "react-router-dom";
import LoginForm from "../components/Login/LoginForm.jsx";
import { useDispatch } from "react-redux";
import * as authService from "../services/authService.js";
import { setCredentials } from "../../../core/store/authSlice.js";
import SpotifyIcon from "../../../core/assets/icons/SpotifyIcon.jsx";
import { useToast } from '../../../core/contexts/ToastContext.jsx';
import { useState } from "react";
import { format } from "../../../core/components/utils/helper.js";
import LinkButton from "../../../core/components/LinkButton.jsx";




const buttonsContent = [
    {
        content : "Continue with Facebook",
        altText: "facebook",
        icon : <FacebookIcon />,
    },
    {
        content : "Continue with Apple",
        altText : "apple",
        icon : <AppleIcon />,
    },
    {
        content : "Continue with phone number",
        altText : "phone number",
        icon: ""
    }
]

const classBtn = "w-[320px] h-[50px] p-4 rounded-full border-1 border-[#3e3e3e] flex items-center justify-center hover:border-white cursor-pointer"
const classText = "mx-auto font-poppins font-bold text-white";

function LoginPage() {

    const href= "";
    const navigate = useNavigate();
    const { addToast } = useToast();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const handleLogin = async (formData, e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        try {
            const res = await authService.login(formData);
            if (res.status === 200 && res.data.status === "unverified") {
                navigate("/verify");
            }
            dispatch(setCredentials({
                accessToken: res.accessToken,
                isAuthenticated: true,
                isLoading: false,
            }));
            if (res.status === 200) {
                addToast.success(res.message, {
                    style: {
                        color: "green",
                        fontSize: "14px",
                        fontWeight: "600",
                    }
                });
            }

        } catch (err) {
            const data = err.response.data;
            if (data.status === 401) {
                addToast.error(format.formatMessageBadCredentials(data.message), {
                    style: {
                        color: "red",
                        fontSize: "14px",
                        fontWeight: "600",
                    }
                });
            } else if (data.status === 500) {
                addToast.error(format.formatMessageBadCredentials(data.message), {
                    style: {
                        color: "red",
                        fontSize: "14px",
                        fontWeight: "600",
                    }
                });
            } else if (data.status === 400) {
                addToast.error(data.message, {
                    style: {
                        color: "red",
                        fontSize: "14px",
                        fontWeight: "600",
                    }
                })
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="h-full w-full flex flex-col justify-center items-center">
            <div className="w-190 h-185 mb-8 mt-9 rounded-lg px-[205px] bg-[#121212]">
                <div className="flex flex-col items-center justify-center mt-2">
                    <div className="flex flex-col justify-center items-center gap-3 py-4">
                        <Link to="/auth/login" className="flex justify-center items-center w-[40px] h-[40px]">
                            <SpotifyIcon className="w-8 h-8" />
                        </Link>
                        <h1 className="font-poppins font-bold text-white text-3xl">Log in to Spotify</h1>
                    </div>
                    <div className="flex flex-col gap-3">
                        <LinkButton href={href} className={classBtn}>
                            <GoogleIcon altText="Google"/>
                            <span className={classText} >Continue with Google</span>
                        </LinkButton>
                        {buttonsContent.map((item, index) => (
                            <Button className={classBtn} key={index} content={item.content} icon={item.icon} textClassName={classText}/>
                        ))}
                    </div>
                    <div className="w-[533px] border-b-1 border-[#3e3e3e] my-5"></div>
                    <div className="w-full flex flex-col gap-2 justify-start">
                        <LoginForm onSubmit={handleLogin} />
                        <div className="flex gap-2">
                            <p className="font-semibold text-[15px] font-poppins text-[#b3b3b3]">Don't have an account?</p>
                            <Link to="/signup" className="text-white font-semibold font-poppins underline">Sign up for Spotify</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;