import Button from "../Common/Button.jsx";
import ProgressBar from "../Common/ProgressBar.jsx";
import ErrorIcon from "../../../../core/assets/icons/ErrorIcon.jsx";
import Input from "../Common/Input.jsx";
import { useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";
import StepHeader from "./StepHeader.jsx";
import AnimatedCheckbox from "../Common/AnimatedCheckbox.jsx";


export default function PasswordStep({prev, next, data, setData, step}) {
    const { register, formState: { errors }, setError, trigger, watch, clearErrors } = useFormContext();
    const password = watch("password");
    const textClass = "font-poppins text-white"
    const [touched, setTouched] = useState(false);

    const passwordRules = [
        { label: "1 letter", test: (val) => /[a-zA-Z]/.test(val), key: "hasLetter" },
        { label: "1 number or special character (example: #?!&)", test: (val) => /(?=.*[\d#?!&])/.test(val), key: "hasNumberOrSpecial" },
        { label: "Minimum 10 characters", test: (val) => val.length >= 10, key: "minLength" },
    ];

    const handleNextClick = async () => {
        const isValid = await trigger("password");
        if (!isValid) return;
        next();
    };

    useEffect(() => {
        if (password && !touched) {
            setTouched(true); // khi bắt đầu nhập thì set touched
        }
    }, [password, touched]);


    return (
        <>
            <StepHeader step={step} prev={prev} headerContent="Create a password" />
            <div className="flex flex-col mr-auto w-full">
                <label htmlFor="password" className="font-poppins font-semibold text-white mb-3">
                    Password
                </label>
                <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    watchValue={data.password}
                    {...register("password", {
                        validate: {
                            hasLetter: (val) =>
                                /[a-zA-Z]/.test(val) || "Password must contain at least 1 letter",
                            hasNumberOrSpecial: (val) =>
                                /(?=.*[\d#?!&])/.test(val) ||
                                "Password must contain at least 1 number or special char",
                            minLength: (val) =>
                                val.length >= 10 || "Password must be at least 10 characters",
                        },
                    })}
                    onChange={(e) => {
                        setData((prev) => ({ ...prev, password: e.target.value }))
                        clearErrors("password");
                        }
                    }
                />
                <div className="relative my-4">
                    {errors.password ? (
                        <div className="absolute top-0 left-0 w-full flex justify-center items-center gap-3">
                            <ErrorIcon className="w-6 h-6 fill-[#F3727F]" />
                            <span className="text-[#F3727F] font-poppins text-sm font-medium mr-auto">
                                    {errors.password.message}
                            </span>
                        </div>) : null}
                </div>

                <div className="flex flex-col mt-4">
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