import Button from "../Common/Button.jsx";
import ProgressBar from "../Common/ProgressBar.jsx";
import ErrorIcon from "../../../../core/assets/icons/ErrorIcon.jsx";
import InputSignup from "../Common/InputSignup.jsx";
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import StepHeader from "./StepHeader.jsx";
import AnimatedCheckbox from "../Common/AnimatedCheckbox.jsx";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordStep({prev, next, step}) {
    const {  formState: { errors, touchedFields }, trigger, watch } = useFormContext();
    const password = watch("password");
    const textClass = "font-poppins text-white"
    const touched = touchedFields.password;
    const [showPassword, setShowPassword] = useState(false);

    const passwordRules = [
        { label: "At least 1 uppercase letter", test: (val) => /[A-Z]/.test(val) },
        { label: "At least 1 lowercase letter", test: (val) => /[a-z]/.test(val) },
        { label: "At least 1 digit", test: (val) => /\d/.test(val) },
        { label: "At least 1 special character (e.g. #?!&@$%^*)", test: (val) => /[^A-Za-z0-9]/.test(val) },
        { label: "Minimum 10 characters", test: (val) => val.length >= 10 },
    ];


    const handleNextClick = async () => {
        const isValid = await trigger("password");
        if (!isValid) return;
        next();
    };

    return (
        <>
            <StepHeader step={step} prev={prev} headerContent="Create a password" />
            <div className="flex flex-col mr-auto w-full">
                <label htmlFor="password" className="font-poppins font-semibold text-white mb-3">
                    Password
                </label>
                <div className="relative">
                    <InputSignup
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
                <div className="relative my-4">
                    {errors.password && touched ? (
                        <div className="absolute top-0 left-0 w-full flex justify-center items-center gap-3">
                            <ErrorIcon className="w-6 h-6 fill-[#F3727F]" />
                            <span className="text-[#F3727F] font-poppins text-sm font-medium mr-auto">
                                    {errors.password.message}
                            </span>
                        </div>) : null}
                </div>

                <div className="flex flex-col mt-5">
                    <p className={textClass + " font-semibold my-4"}>
                        Your password must contain at least
                    </p>
                    <ul className="flex flex-col gap-3">
                        {passwordRules.map((rule, index) => {
                            const passed = rule.test(password || "");
                            return (
                                <li key={index} className="flex items-center gap-2">
                                    <AnimatedCheckbox isPassed={passed} />
                                    <p className="text-white font-poppins text-sm">
                                        {rule.label}
                                    </p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <Button
                onClick={handleNextClick}
                divClass="w-full"
                className="w-full h-13 rounded-full bg-[#1ED760] hover:bg-[#3be477] cursor-pointer"
            >
            <span className="font-poppins font-semibold text-black">
              Next
            </span>
            </Button>
        </>
    );
}