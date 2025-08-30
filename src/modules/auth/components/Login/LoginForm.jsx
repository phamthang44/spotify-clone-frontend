
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../Common/Button.jsx"
import ShowErrorPartLogin from "../Common/ShowErrorPartLogin.jsx";
import InputLogin from "../Common/InputLogin.jsx";

const schema = yup.object().shape({
    email: yup
        .string()
        .required("(*) Email is required !")
        .email("(*) Invalid email format !"),
    password: yup
        .string()
        .required("(*) Password is required")
});

const submitLoginButton = "w-full h-12 rounded-full my-4 bg-[#1ed760] hover:scale-105 opacity-90 hover:opacity-100 text-[#121212] cursor-pointer transition-all transition-1s";

export default function LoginForm({onSubmit}) {
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="mb-8 flex flex-col gap-2">
                <label className="text-white font-poppins font-semibold text-sm mb-1">Email or username</label>
                <InputLogin
                    error={errors.email}
                    id="email-input"
                    type="text"
                    placeholder="Enter your email"
                    register={{...register("email")}}
                />
                <ShowErrorPartLogin error={errors.email} />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-white font-poppins font-semibold text-sm">
                    Password
                </label>
                <InputLogin
                    error={errors.password}
                    id="password-input"
                    type="password"
                    placeholder="Enter password"
                    register={{...register("password")}}
                />
                <ShowErrorPartLogin error={errors.password} />
            </div>
            <Button content="Continue" type="submit" className={submitLoginButton} textClassName="font-poppins font-bold text-[#121212]"/>
        </form>
    );
}