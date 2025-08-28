import ErrorIcon from "../../../../core/assets/icons/ErrorIcon.jsx";

export default function ShowErrorPart({error, divClass}) {
    return (
        <div className={divClass}>
            {error ? (
                <div className="absolute top-0 left-0 w-full flex justify-center items-center gap-1">
                    <ErrorIcon className="w-4 h-4 fill-[#F3727F]" />
                    <span className="text-[#F3727F] font-poppins text-sm font-medium mr-auto">
                                    {error.message}
                            </span>
                </div>) : null}
        </div>
    );
}