export default function Privacy({className, textClass}) {
    return (
        <div className={className}>
            <div className="bg-[#121212] w-full h-full flex justify-center items-center">
                <p className={textClass}>This site is protected by reCAPTCHA and the Google <a className="underline cursor-pointer">Privacy Policy</a> and <a className="underline cursor-pointer">Terms of Service</a> apply.</p>
            </div>
        </div>
    );
}