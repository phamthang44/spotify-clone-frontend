import AnimatedCheckbox from "../../../../core/components/AnimatedCheckbox.jsx";
import StepHeader from "./StepHeader.jsx";
import { useState } from "react";
import Button from "../Common/Button.jsx";


export default function FinalStep({prev, step}) {

    const [marketingOptOut, setMarketingOptOut] = useState(false);
    const [shareData, setShareData] = useState(false);

    return (
        <>
            <StepHeader step={step} prev={prev} headerContent="Terms & Conditions" />
            <div className="flex flex-col mr-auto w-full gap-3">
                <div className="bg-[#2A2A2A] p-5 rounded-lg">
                    <div className="flex gap-5">
                        <AnimatedCheckbox className="mb-5" checked={marketingOptOut} onChange={setMarketingOptOut}></AnimatedCheckbox>
                        <p className="text-white font-montserrat text-sm">I would prefer not to receive marketing messages from Spotify</p>
                    </div>
                </div>
                <div className="bg-[#2A2A2A] p-5 rounded-lg">
                    <div className="flex gap-5">
                        <AnimatedCheckbox className="mb-10" checked={shareData} onChange={setShareData}></AnimatedCheckbox>
                        <p className="text-white font-montserrat text-sm">Share my registration data with Spotify's
                            content providers for marketing purposes.</p>
                    </div>
                </div>
                <div>
                    <span className="font-montserrat text-sm text-white">By clicking on sign-up, you agree to Spotify's <span className="text-[#1DB954] underline cursor-pointer">Terms and Conditions of Use</span></span>
                </div>
                <div>
                    <span className="font-montserrat text-sm text-white">To learn more about how Spotify collects, uses, shares
                        and protects your personal data, please see <span className="text-[#1DB954] underline cursor-pointer">Spotify's Privacy Policy</span></span>
                </div>
                <Button divClass="w-full mt-10" className="w-full h-13 rounded-full bg-[#1ED760] hover:bg-[#3be477] cursor-pointer" type="submit">
                    <span className="font-poppins font-semibold text-black">Sign up</span>
                </Button>
            </div>
        </>
    );
}