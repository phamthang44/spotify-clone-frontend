
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "./Button.jsx"


const schema = yup.object().shape({
    email: yup
        .string()
        .required("(*) Email is required !")
        .email("(*) Invalid email format !"),
    password: yup
        .string()
        .required("(*) Password is required")
        .min(6, "(*) Password at least 6 characters"),
});

const submitLoginButton = "w-[320px] h-[50px] rounded-full my-4 bg-[#1ed760] hover:scale-105 opacity-90 hover:opacity-100 text-[#121212] cursor-pointer transition-all transition-1s";

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
            <div>
                <label className="text-white font-poppins font-semibold text-sm mb-1">Email or username</label>
                <input
                    className={`w-full h-[45px] text-[#b3b3b3] font-poppins font-medium pl-3 border rounded-sm 
              transition-all 
              ${errors.email ? "border-red-500 focus:border-red-500" : "border-gray-500 hover:border-white"}
            `}
                    id="email-input"
                    type="text"
                    placeholder="Enter email or username"
                    {...register("email")}
                />
                {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
            </div>
            <div className="mt-3">
                <label className="text-white font-poppins font-semibold text-sm mb-1">
                    Password
                </label>
                <input
                    className={`w-full h-[45px] text-[#b3b3b3] font-poppins font-medium pl-3 border rounded-sm 
              transition-all 
              ${errors.password ? "border-red-500 focus:border-red-500" : "border-gray-500 hover:border-white"}
            `}
                    id="password-input"
                    type="password"
                    placeholder="Enter password"
                    {...register("password")}
                />
                {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
            </div>
            <Button content="Continue" type="submit" className={submitLoginButton} textClassName="font-poppins font-bold text-[#121212]"/>
        </form>
    );
}