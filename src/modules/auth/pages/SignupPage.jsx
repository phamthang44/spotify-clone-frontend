import SpotifyIcon from "../../../core/assets/icons/SpotifyIcon.jsx";
import SignupForm from "../components/SignupForm.jsx";
import { useState } from "react";
import OAuthSection from "../components/OAuthSection.jsx";
import {Link} from "react-router-dom";
function SignupPage() {
    const [step, setStep] = useState(0);

    return (
        <div className="w-full min-h-screen bg-[#121212]">
            <header className="pt-8 pb-6">
                <div className="flex justify-center items-center">
                    <SpotifyIcon className="w-10 h-10" />
                </div>
            </header>
            <section className="h-screen w-full flex">
                <div className="w-full h-fit flex flex-col justify-center items-center">
                    <div className="w-1/4 px-12">
                        {step === 0 ?
                            <h1 className="text-center text-[48px] text-white font-bold font-poppins text-balance">Sign up to start listening</h1>
                         : null}
                        <SignupForm step={step} setStep={setStep} />
                    </div>
                    <div className="w-1/5 h-50 py-2 mt-5">
                        <OAuthSection />
                    </div>
                    <div className="flex gap-2 justify-center items-center">
                        <p className="font-semibold font-poppins text-[#b3b3b3]">Already have an account?</p>
                        <Link to="/login" className="text-white font-semibold font-poppins underline p-3">Log in here</Link>
                    </div>
                </div>
            </section>
        </div>

    );
}

export default SignupPage;