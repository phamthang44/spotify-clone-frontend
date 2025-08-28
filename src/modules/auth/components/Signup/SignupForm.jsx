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
        .matches(/^(?=.*[A-Za-z])(?=.*[\d#?!&]).{10,}$/, "Password must be at least 10 characters, 1 letter, 1 number or special character"),
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


export default function SignupForm({step, setStep}) {
    const oauthData = useSelector(state => state.oauthSignup);
    const [formData, setFormData] = useState({ email: "", password: "", name: "", dob: "", gender: "" });

    useEffect(() => {
        if (oauthData?.email) {
            setFormData(prev => ({
                ...prev,
                email: oauthData?.email,
                name: oauthData?.name || prev.name
            }));
            setStep(1);
        }
    }, [oauthData?.email, oauthData?.name, setStep]);

    const methods = useForm({
        resolver: yupResolver(schema),
        mode: "onBlur",
        reValidateMode: "onChange",
        defaultValues: formData, // để sync giữa local state và react-hook-form
    });

    const onSubmit = (data) => {
        console.log("Final form data:", data);
        // gọi API signup ở đây
    };
    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <div className="flex flex-col items-center gap-5 mt-10">
                    {step === 0 && <EmailStep data={formData} setData={setFormData} next={() => setStep(1)} />}
                    {step === 1 && <PasswordStep data={formData} setData={setFormData} next={() => setStep(2)} prev={() => setStep(0)} step={step}/>}
                    {step === 2 && <ProfileStep data={formData} setData={setFormData} next={() => setStep(3)} prev={() => setStep(1)} step={step} />}
                    {step === 3 && <FinalStep data={formData} prev={() => setStep(2)} step={step}/>}
                </div>
            </form>
        </FormProvider>
    );
}