import {useFormContext} from "react-hook-form";

export default function InputSignup({id, placeholder, type, oauthSignup}) {

    const { register, formState: { errors }, watch } = useFormContext();
    const watchValue = watch(id);

    const inputValue = oauthSignup && oauthSignup[id] ? oauthSignup[id] : watchValue || "";

    return (
        <>
        <input
            {...register(id)}
            id={id}
            type={type}
            value={inputValue}
            className={`h-12 bg-[#121212] text-white p-4 border text-[#b3b3b3] border-[#666] 
          focus:outline focus:outline-2 focus:border-[#666]
          rounded-sm w-full
          ${errors[id] ? "border-[#df2a3c] focus:outline-[#ed2c3f]" : watchValue ? "focus:outline-green-500" :"focus:outline-white"}`}
            placeholder={placeholder}
            autoComplete="new-password"
        />
        </>
    );
}