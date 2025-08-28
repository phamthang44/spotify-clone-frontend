// Common/ValidatedInput.jsx
import ErrorIcon from "../../../../core/assets/icons/ErrorIcon.jsx";
import { useFormContext } from "react-hook-form";

export default function ValidatedInput({
                                           id,
                                           label,
                                           placeholder,
                                           watchValue,
                                           onChange,
                                       }) {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className="flex flex-col mr-auto w-full">
            {label && <label htmlFor={id} className="font-poppins font-semibold text-white mb-3">{label}</label>}

            <input
                {...register(id, { onChange })}
                id={id}
                type="text"
                defaultValue={watchValue}
                placeholder={placeholder}
                className={`h-12 text-white p-4 border text-[#b3b3b3] border-[#666] 
          focus:outline focus:outline-2 focus:border-[#666]
          rounded-sm
          ${errors[id] ? "border border-[#df2a3c] focus:outline-[#ed2c3f]" : "border focus:outline-white"}`}
            />
            <div className="flex justify-center items-center my-3 gap-3">
            {errors[id] ? (<>
                <ErrorIcon className="w-6 h-6 fill-[#F3727F]" />
                <span className="text-[#F3727F] font-poppins font-medium text-sm mr-auto">
                    {errors[id].message}
                </span>
            </>) : null}
            </div>
        </div>
    );
}
