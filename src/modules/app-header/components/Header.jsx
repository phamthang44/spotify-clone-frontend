import React from "react";
import SpotifyIcon from "../../../core/assets/icons/SpotifyIcon.jsx";
import IconBrowse from "../../../core/assets/icons/IconBrowse.jsx";
import NotificationIcon from "../../../core/assets/icons/NotificationIcon.jsx";
import HomeIcon from "../../../core/assets/icons/HomeIcon.jsx";
import SearchIcon from "../../../core/assets/icons/SearchIcon.jsx";
import HomeIconNotFill from "../../../core/assets/icons/HomeIconNotFill.jsx";
import DownloadIcon from "../../../core/assets/icons/DownloadIcon.jsx";
import Button from "../../../core/components/Button.jsx";
import { useState } from "react";
import DropDown from "./DropDown.jsx";


export default function Header({altText}) {

    const [isDropdownOpening, setDropdownOpening] = useState(false);

    const onClickDropdown = () => {
        if (!isDropdownOpening) {
            setDropdownOpening(false);
        } else {
            setDropdownOpening(true);
        }
    }

    return (
        <>
            <div className="flex items-center justify-center p-2 bg-black">
                <div className="flex items-center space-x-4 w-full">
                    <Button classCustom="w-8 h-8 bg-[#121212] rounded-full flex items-center justify-center cursor-pointer mr-auto ml-4">
                        <SpotifyIcon/>
                    </Button>
                    <div className="flex space-x-2 mx-auto w-160">
                        <Button classCustom="p-3 rounded-full bg-[#1f1f1f] hover:bg-[#2a2a2a] hover:scale-105 cursor-pointer group">
                            <HomeIconNotFill className="w-6 h-6 fill-[#6f6f6f] group-hover:fill-white"/>
                        </Button>
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
                            <Button classCustom="w-6 h-6 absolute right-5 top-1/2 transform -translate-y-1/2">
                                <IconBrowse className="w-6 h-6 transition-all transition-1s hover:scale-110 fill-[#6f6f6f] hover:fill-white"/>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-4 ml-auto w-70">
                    <Button classCustom={`group font-poppins text-[#B3B3B3] font-semibold text-sm mr-10 transition-all transition-1s hover:scale-110 hover:text-white flex justify-center items-center gap-2`}>
                       <DownloadIcon className="fill-[#B3B3B3] w-4 h-4 group-hover:fill-white"/> Install App
                    </Button>
                    <Button>
                        <NotificationIcon className="w-4 h-4 transition-all transition-1s hover:scale-110 fill-[#B3B3B3] hover:fill-white"/>
                    </Button>
                    <Button onClick={onClickDropdown} classCustom="relative w-12 h-12 bg-[#1e1e1e] rounded-full flex items-center justify-center cursor-pointer mr-auto ml-4 transition-all transition-1s hover:scale-110">
                        <img aria-hidden="false" draggable="false" loading="eager"
                             src="https://scontent-fra3-1.xx.fbcdn.net/v/t1.30497-1/84628273_176159830277856_972693363922829312_n.jpg?stp=c379.0.1290.1290a_cp0_dst-jpg_s50x50_tt6&amp;_nc_cat=1&amp;ccb=1-7&amp;_nc_sid=7565cd&amp;_nc_ohc=wp-GzdYJaTIQ7kNvwGxpAVb&amp;_nc_oc=AdmRJuBUZEC-JCYkN0szjfuzYl1QgFDeldHfAAkCWq5Wo7wg-6IOXuTZT_ehho4P1j-VXMDsAeeB5PyepMCZ2L7f&amp;_nc_zt=24&amp;_nc_ht=scontent-fra3-1.xx&amp;edm=AP4hL3IEAAAA&amp;oh=00_AfV5-yudvV6fm3HHK_uCHdCq-Kp-hkNW4vJV96mHzymIZg&amp;oe=68CE7119"
                             alt={altText}
                            className="w-[32px] h-[32px] rounded-full"
                        />
                        {isDropdownOpening ? <DropDown /> : ""}
                    </Button>
                </div>
            </div>
        </>
    );
}