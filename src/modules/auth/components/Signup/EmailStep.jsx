import ErrorIcon from "../../../../core/assets/icons/ErrorIcon.jsx";
import Button from "../Common/Button.jsx";
import { useFormContext } from "react-hook-form";
import Input from "../Common/Input.jsx";
import ShowErrorPart from "../Common/ShowErrorPart.jsx";

export default function EmailStep({setData, data, next}) {

    const {formState: { errors }, trigger } = useFormContext();
    // console.log(data);

    const handleNextClick = async () => {
        const isValid = await trigger("email"); // chỉ validate email
        if (!isValid) return;
        next();
    };

    return (
        <>
            <div className="flex flex-col mr-auto w-full">
                <label htmlFor="email" className="font-poppins font-semibold text-white mb-3">Email address</label>
                <Input
                    id="email"
                    type="text"
                    placeholder="Enter email address"
                    watchValue={data.email}
                    onChange={(e) =>
                        setData((prev) => ({ ...prev, email: e.target.value }))
                    }
                />
                <ShowErrorPart error={errors.email} divClass={"flex justify-center items-center mb-10 mt-3 relative"}/>
            </div>
            <Button onClick={handleNextClick} divClass="w-full" className="w-full h-13 rounded-full bg-[#1ED760] hover:bg-[#3be477] cursor-pointer">
                <span className="font-poppins font-semibold text-black">
                    Next
                </span>
            </Button>
        </>
    );
}