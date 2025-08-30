export default function ShowErrorPartLogin({error}) {
    return (
        <>
            <div className="relative">
                {error && (
                    <p className="absolute text-[#F3727F] text-sm">{error.message}</p>
                )}
            </div>
        </>
    );
}