export default function InputLogin({error, register, id, type, placeholder}) {
    return (
        <>
            <input
                className={`w-full h-[45px] text-[#b3b3b3] font-poppins font-medium pl-3 border rounded-sm 
              transition-all focus:outline focus:outline-2 focus:border-[#666]
              ${error ? "border-[#df2a3c] focus:outline-[#ed2c3f]" : "border-gray-500 focus:outline-white"}
            `}
                id={id}
                type={type}
                placeholder={placeholder}
                {...register}
            />
        </>
    );
}