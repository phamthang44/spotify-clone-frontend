import Button from "./Button.jsx";
import ProgressBar from "./ProgressBar.jsx";
import ErrorIcon from "../../../core/assets/icons/ErrorIcon.jsx";


export default function PasswordStep({prev, next, data, setData, step, register, errors}) {

    const textClass = "font-poppins text-white"

    const conditions = [
        {
            pattern: "",
            content: "1 letter"
        },
        {
            pattern: "[0-9]*",
            content: "1 number or special character (example: #?!&)"
        },
        {
            pattern: "[0-9]*",
            content: "10 characters",
        }
    ]

    return (
        <>
            <ProgressBar prev={prev} step={step}/>
            <div className="flex flex-col mr-auto w-full">
                <label htmlFor="password" className="font-poppins font-semibold text-white mb-3">Password</label>
                <input
                    {...register("password", {
                        onChange: (e) =>
                            setData((prev) => ({ ...prev, password: e.target.value })),
                    })}
                    id="password"
                    type="text"
                    defaultValue={data.password}
                    className={`h-12 text-white p-4 border text-[#b3b3b3] border-[#666] 
              focus:outline focus:outline-2 focus:border-[#666]
              rounded-sm
              ${errors.password ? "border border-[#df2a3c] focus:outline-[#ed2c3f]" : "border focus:outline-white"}`}
                    placeholder="Enter email address"
                />
                <div className="flex flex-col mt-4">
                    <p className={textClass + " font-semibold my-4"}>Your password must contains at least</p>
                    <ul className="flex flex-col gap-3">
                        {conditions.map((item, index) => (
                            <li key={index} className="flex">

                                <p className={textClass}>{item.content}</p>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
            <Button onClick={errors.password ? null : next} divClass="w-full" className="w-full h-13 rounded-full bg-[#1ED760] hover:bg-[#3be477] cursor-pointer">
                <span className="font-poppins font-semibold text-black">
                    Next
                </span>
            </Button>
        </>
    );
}