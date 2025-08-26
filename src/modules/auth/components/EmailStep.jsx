import ErrorIcon from "../../../core/assets/icons/ErrorIcon.jsx";
import Button from "./Button.jsx";


export default function EmailStep({register, next, errors, setData, data}) {
    return (
        <>
            <div className="flex flex-col mr-auto w-full">
                <label htmlFor="email" className="font-poppins font-semibold text-white mb-3">Email address</label>
                <input
                    {...register("email", {
                        onChange: (e) =>
                            setData((prev) => ({ ...prev, email: e.target.value })),
                    })}
                    id="email"
                    type="text"
                    defaultValue={data.email}
                    className={`h-12 text-white p-4 border text-[#b3b3b3] border-[#666] 
              focus:outline focus:outline-2 focus:border-[#666]
              rounded-sm
              ${errors.email ? "border border-[#df2a3c] focus:outline-[#ed2c3f]" : "border focus:outline-white"}`}
                    placeholder="Enter email address"
                />
                <div className="flex justify-center items-center my-3 gap-3">
                    {errors.email ? (<>
                        <ErrorIcon className="w-6 h-6 fill-[#F3727F]" />
                        <span className="text-[#F3727F] font-poppins font-medium text-sm mr-auto">{errors.email.message}</span>
                    </>) : null}
                </div>
            </div>
            <Button onClick={errors.email ? null : next} divClass="w-full" className="w-full h-13 rounded-full bg-[#1ED760] hover:bg-[#3be477] cursor-pointer">
                <span className="font-poppins font-semibold text-black">
                    Next
                </span>
            </Button>
        </>
    );
}