import { useState, useEffect, useRef } from 'react';
import EmailStep from "./EmailStep.jsx";
import PasswordStep from "./PasswordStep.jsx";
import FinalStep from "./FinalStep.jsx";
import ProfileStep from "./ProfileStep.jsx";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { FormProvider } from "react-hook-form";


const emailSchema = yup.object({
    email: yup.string()
        .required("This email is invalid. Make sure it's written like example@email.com")
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "This email is invalid. Make sure it's written like example@email.com"),
});

const passwordSchema = yup.object({
    password: yup.string()
        .required("Password is required")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{10,}$/,
            "Password must be 10+ characters, include upper/lowercase, digit, and special character."),
});

const profileSchema = yup.object({
    name: yup.string().required("Enter a name for your profile."),
    dob: yup
        .date()
        .nullable()
        .required("Please enter your date of birth."),
    gender: yup.string().required("Select your gender."),
});

const schema = emailSchema.concat(passwordSchema).concat(profileSchema);


export default function SignupForm({step, setStep, onSubmit}) {
    const oauthData = useSelector(state => state.oauthSignup);

    const methods = useForm({
        resolver: yupResolver(schema),
        mode: "onBlur",
        reValidateMode: "onChange",
        shouldUnregister: false,
        defaultValues: {
            email: oauthData?.email || "",
            password: "",
            name: oauthData?.name || "",
            dob: "",
            gender: "",
        },
    });

    useEffect(() => {
        if (oauthData?.email && step === 0) {
            setStep(1);
            methods.reset({ // reset luôn form với oauth data
                email: oauthData.email,
                name: oauthData.name || "",
                password: "",
                dob: "",
                gender: "",
            });
        }
    }, [oauthData, methods, setStep]);

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <div className="flex flex-col items-center gap-5 mt-10">
                    {step === 0 && <EmailStep next={() => setStep(1)} />}
                    {step === 1 && <PasswordStep next={() => setStep(2)} prev={() => setStep(0)} step={step}/>}
                    {step === 2 && <ProfileStep next={() => setStep(3)} prev={() => setStep(1)} step={step} />}
                    {step === 3 && <FinalStep prev={() => setStep(2)} step={step}/>}
                </div>
            </form>
        </FormProvider>
    );
}