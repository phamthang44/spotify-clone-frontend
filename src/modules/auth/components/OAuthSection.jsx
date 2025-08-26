import LinkButton from "../../../core/components/LinkButton.jsx";
import GoogleIcon from "../../../core/assets/icons/GoogleIcon.jsx";

export default function OAuthSection({href}) {
    return (
        <>
            <div className="relative w-full">
                <div className="before:block before:w-full before:h-[1px] bg-[#7C7C7c] flex items-center justify-center rounded-full my-4">
                    <span className="absolute px-4 bg-[#121212] font-poppins text-white">or</span>
                </div>
                <LinkButton
                    href={href}
                    className="p-5 w-full h-14 border-1 border-[#6e6e6e] rounded-full hover:border-[#d2d2d2] cursor-pointer flex justify-center items-center mt-11"
                    >
                    <GoogleIcon altText="Google"/><span className="mx-auto font-poppins font-bold text-white">Sign up with Google</span>
                </LinkButton>
                <div className="mt-10 h-10 before:block before:w-full before:h-[1px] before:bg-[#292929]"></div>
                <div className="flex justify-center items-center">

                </div>
            </div>
        </>
    );
}