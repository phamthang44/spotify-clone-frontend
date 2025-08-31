import Button from "../../../core/components/Button.jsx"
import defaultImage from "../../../../src/assets/images/default-image-song.png"

export default function SearchResult({ title, resultType, artist, coverUrl}) {
    return (
        <div className="p-2 px-4 rounded-md hover:bg-[#3a3a3a] cursor-pointer text-white flex items-center gap-5">
            <div className="w-12 h-10 rounded-md">
                <img src={coverUrl ? coverUrl : defaultImage} alt="" className="w-full h-full object-cover rounded-md" />
            </div>
            <div className="flex items-center justify-between w-full">
                <div className="flex flex-col w-full">
                    <h3 className="text-white font-medium font-poppins text-base hover:underline w-fit">{title}</h3>
                    <p className="text-[#a4a4a4] font-poppins text-medium text-sm w-fit"><span className="hover:underline">{resultType}</span><span className="p-1">•</span><span className="hover:underline">{artist}</span> </p>
                </div>
                <div>
                    <Button className="text-[#a4a4a4] font-semibold font-poppins hover:text-white cursor-pointer">x</Button>
                </div>
            </div>
        </div>
    )
}