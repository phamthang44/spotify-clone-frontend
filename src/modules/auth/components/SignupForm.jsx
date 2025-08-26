import { useState, useEffect, useRef } from 'react';
import EmailStep from "./EmailStep.jsx";
import PasswordStep from "./PasswordStep.jsx";
import FinalStep from "./FinalStep.jsx";
import ProfileStep from "./ProfileStep.jsx";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
    email: yup
        .string()
        .required("This email is invalid. Make sure it's written like example@email.com")
        .matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", "This email is invalid. Make sure it's written like example@email.com"),

});

export default function SignupForm({step, setStep}) {

    const [formData, setFormData] = useState({ email: "", password: "", name: "", dob: "", gender: "" });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onBlur",
        reValidateMode: "onChange",
    });

    return (
        <form>
            <div className="flex flex-col items-center gap-5 mt-10">
                {step === 0 && <EmailStep errors={errors} register={register} data={formData} setData={setFormData} next={() => setStep(1)} />}
                {step === 1 && <PasswordStep errors={errors} register={register} data={formData} setData={setFormData} next={() => setStep(2)} prev={() => setStep(0)} step={step}/>}
                {step === 2 && <ProfileStep data={formData} setData={setFormData} next={() => setStep(3)} prev={() => setStep(1)} />}
                {step === 3 && <FinalStep data={formData} />}
            </div>
        </form>
    );
}