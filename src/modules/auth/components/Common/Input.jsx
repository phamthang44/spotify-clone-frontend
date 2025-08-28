import {useFormContext} from "react-hook-form";

export default function Input({id, onChange, watchValue, placeholder, type}) {

    const { register, formState: { errors } } = useFormContext();

    return (
        <>
        <input
            {...register(id, { onChange })}
            id={id}
            type={type}
            defaultValue={watchValue}
            className={`h-12 text-white p-4 border text-[#b3b3b3] border-[#666] 
          focus:outline focus:outline-2 focus:border-[#666]
          rounded-sm
          ${errors[id] ? "border border-[#df2a3c] focus:outline-[#ed2c3f]" : "border focus:outline-white"}`}
            placeholder={placeholder}
        />
        </>
    );
}