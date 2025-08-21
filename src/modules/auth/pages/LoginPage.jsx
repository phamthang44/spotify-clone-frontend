import Button from '../components/Button.jsx'
import IconSpotify from '../assets/icons/IconSpotify.jsx'
import GoogleIcon from "../assets/icons/GoogleIcon.jsx";
import AppleIcon from "../assets/icons/AppleIcon.jsx"
import FacebookIcon from "../assets/icons/FacebookIcon.jsx"
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm.jsx";
import { useDispatch } from "react-redux";
import * as authService from "../services/authService.js";
import { setCredentials } from "../../../core/store/authSlice.js";

const buttonsContent = [
    {
        content : "Continue with Google",
        altText: "google",
        icon : <GoogleIcon />,
    },
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

const classBtn = "w-[320px] h-[50px] rounded-full border-1 border-[#3e3e3e] flex items-center justify-center hover:border-white cursor-pointer"


function LoginPage() {
    const dispatch = useDispatch();
    const handleLogin = async (formData) => {
        try {
            const data = await authService.login(formData);
            console.log(data);
            dispatch(setCredentials({
                accessToken: data.accessToken,
            }));
        } catch (err) {
            console.error("Login failed:", err);
        }
    };
    return (
        <div className="w-[736px] h-[750px] bg-[#121212] mb-13 rounded-lg px-[205px] bg-[#121212]">
            <div className="flex flex-col items-center justify-center mt-2">
                <div className="flex flex-col justify-center items-center gap-3 py-4">
                    <a href="#!" className="block w-[40px] h-[40px]">
                        <IconSpotify />
                    </a>
                    <h1 className="font-poppins font-bold text-white text-3xl">Log in to Spotify</h1>
                </div>
                <div className="flex flex-col gap-3">
                    {buttonsContent.map((item, index) => (
                        <Button className={classBtn} key={index} content={item.content} img={item.icon} textClassName="font-poppins font-bold text-white"/>
                    ))}
                </div>
                <div className="w-[533px] border-b-1 border-[#3e3e3e] my-5"></div>
                <div className="w-full flex flex-col gap-2 justify-start">
                    <LoginForm onSubmit={handleLogin} />
                    <div className="flex gap-2">
                        <p className="font-medium font-poppins text-[#b3b3b3]">Don't have an account?</p>
                        <Link to="/auth/signup" className="text-white font-semibold font-poppins underline">Sign up for Spotify</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;