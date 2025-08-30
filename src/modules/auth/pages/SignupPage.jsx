import SpotifyIcon from "../../../core/assets/icons/SpotifyIcon.jsx";
import SignupForm from "../components/Signup/SignupForm.jsx";
import { useState } from "react";
import OAuthSection from "../components/Common/OAuthSection.jsx";
import {Link} from "react-router-dom";
import {setOAuthSignupData, clearOAuthSignupData} from "../../../core/store/oauthSlice.js";
import {useDispatch, useSelector} from "react-redux";
import ProgressBar from "../components/Common/ProgressBar.jsx";
import { useNavigate } from "react-router-dom";
import {completeSignup, signup} from "../services/authService.js";
import { useToast } from "../../../core/contexts/ToastContext.jsx";
import {setCredentials} from "../../../core/store/authSlice.js";

function SignupPage() {
    const [step, setStep] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const addToast = useToast();
    const oauthData = useSelector(state => state.oauthSignup);
    const handleLocalSignup = async (data) => {
        const timeFormat = data?.dob.toISOString().split("T")[0]
        const payload = {
            ...data,
            dob: timeFormat,
        }

        const registerDto = {
            email: payload.email,
            displayName: payload.name,
            password: payload.password,
            gender: payload.gender,
            dateOfBirth: payload.dob
        }

        console.log("Final payload:", registerDto);

        // 👉 gọi API signup(registerDto) ở đây
        try {
            let response;
            if (oauthData.email || oauthData.name) {
                response = await completeSignup(registerDto);
            } else {
                response = await signup(registerDto);
            }
            console.log("Signup success:", response);
            dispatch(clearOAuthSignupData())
            navigate("/login");
        } catch (err) {
            console.error("Signup failed:", err);
            const responseError = err.response.data;
            if (err.status === 409) {
                const conflictMessage = responseError.message;
                addToast.error(conflictMessage)
            }
        }
    };


    const handleGoogleLogin = () => {
        const popup = window.open(
            "http://localhost:8080/api/v1/auth/oauth2/google",
            "_blank",
            "width=500,height=600"
        );

        const listener = (event) => {
            if (event.origin !== "http://localhost:8080") return;
            console.log(event.data);

            if (event.data.status === 200 && event.data.message === "Login successful") {
                dispatch(setCredentials({
                    accessToken: event.data.data.accessToken
                }))
                navigate("/");
            }

            const { email, name, requiredFields } = event.data.data;
            dispatch(setOAuthSignupData({ email, name, requiredFields }));

            if (email) {
                console.log(email);
                setStep(1);
            }

            window.removeEventListener("message", listener); // remove listener sau khi nhận
        };

        window.addEventListener("message", listener);
    };


    return (
        <div className="w-full h-full bg-[#121212] flex flex-col flex-1">
            <header className="pt-8 pb-6">
                <div className="flex justify-center items-center">
                    <SpotifyIcon className="w-10 h-10" />
                </div>
            </header>
            <section className="flex flex-col justify-center items-center">
                <div className="w-1/4 px-12 relative">
                    {step === 0 ?
                        <h1 className="text-center text-[48px] text-white font-bold font-poppins text-balance">Sign up to start listening</h1>
                        : <ProgressBar totalSteps={3} step={step} />}
                    <SignupForm step={step} setStep={setStep} onSubmit={handleLocalSignup} />
                </div>
                {step === 3 || step === 2 || step === 1 ? null : (<div className="w-1/5 h-50 py-2 mt-5">
                    {step > 0 ? null : <OAuthSection onClick={handleGoogleLogin} />}
                </div>)}
                {step > 0 ? null : <div className="flex gap-2 justify-center items-center">
                    <p className="font-semibold font-poppins text-[#b3b3b3]">Already have an account?</p>
                    <Link to="/login" className="text-white font-semibold font-poppins underline p-3">Log in here</Link>
                </div>}
            </section>
        </div>
    );
}

export default SignupPage;