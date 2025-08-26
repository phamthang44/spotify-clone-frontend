import IconBrowse from "../../../core/assets/icons/IconBrowse.jsx";
import Button from "../../auth/components/Button.jsx";
import SearchIcon from "../../../core/assets/icons/SearchIcon.jsx";

export default function SearchBar() {
    return (
        <>
        <div className="relative">
            <div className="relative group">
                <SearchIcon className="w-6 h-6 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 fill-[#6f6f6f] group-hover:fill-gray-300" />
                <input
                    type="text"
                    placeholder="What do you want to play?"
                    className="bg-[#1f1f1f] rounded-full py-3 pl-12 pr-4 w-120 hover:outline-1 outline-[#363636] hover:bg-[#2a2a2a] text-white placeholder-[#868686] focus:outline-none focus:ring-2 focus:ring-white font-poppins font-semibold"
                />
            </div>
            <div className="absolute top-3 right-15 h-6 w-[1px] bg-[#6f6f6f]"></div>
        </div>
        <Button divClass="relative" className="w-6 h-6 absolute right-7 top-1/2 transform -translate-y-1/2" icon={<IconBrowse className="w-6 h-6 transition-all transition-1s hover:scale-110 fill-[#6f6f6f] hover:fill-white"/>}></Button>
        </>
    );
}