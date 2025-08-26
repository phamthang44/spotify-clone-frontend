import Button from "./Button.jsx";
import LeftArrowIcon from "../../../core/assets/icons/LeftArrowIcon.jsx";

const icon = <LeftArrowIcon className="w-5 h-5 fill-white"/>

export default function ProgressBar({step, prev}) {

    const textClass = "font-poppins text-white";

    return (
        <>
            <div className="relative w-full">
                <div className="h-15 flex flex-col justify-center">
                    <p className={textClass}>Step {step ? step : null} of 3</p>
                    <p className={textClass + " font-semibold"}>Create a password</p>
                </div>
                <Button divClass="absolute top-5 -left-8" onClick={prev} icon={icon}>
                </Button>
            </div>
        </>
    );
}