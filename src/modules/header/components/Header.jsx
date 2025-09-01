import React, {useRef, useEffect} from "react";
import SpotifyIcon from "../../../core/assets/icons/SpotifyIcon.jsx";
import NotificationIcon from "../../../core/assets/icons/NotificationIcon.jsx";
import HomeIconNotFill from "../../../core/assets/icons/HomeIconNotFill.jsx";
import DownloadIcon from "../../../core/assets/icons/DownloadIcon.jsx";
import Button from "../../../core/components/Button.jsx";
import { useState } from "react";
import DropDownUserAvatar from "./DropDownUserAvatar.jsx";
import { logoutClient } from "../../auth/services/authService.js";
import SearchBar from "./SearchBar.jsx";
import { useDispatch } from "react-redux";
import { logout } from "../../../core/store/authSlice.js";
import { useToast } from '../../../core/contexts/ToastContext.jsx';
import defaultAvatar from "../../../assets/images/default_avatar.jpg";
import useOnClickOutside from "../../../core/hooks/useOnClickOutside.js";
import HomeIcon from "../../../core/assets/icons/HomeIcon.jsx";
export default function Header({altText, userProfile, onClickSetHomePage, isHomePage}) {
    const dispatch = useDispatch();
    const {addToast} = useToast();
    const [isDropdownOpening, setDropdownOpening] = useState(false);
    const dropDownRef = useRef(null);

    const [isSearchDropdownOpening, setSearchDropdownOpening] = useState(false);
    const searchBarRef = useRef(null);

    useOnClickOutside([dropDownRef], () => setDropdownOpening(false));
    useOnClickOutside([searchBarRef], () => setSearchDropdownOpening(false));

    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && setSearchDropdownOpening(false);
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, []);

    const onClickSearchDropdown = () => setSearchDropdownOpening(true);

    const onClickDropdown = () => setDropdownOpening(prev => !prev);

    const handleLogout = async () => {
        try {
            const res = await logoutClient();
            console.log(res);
            if (res.status === 200) {
                addToast.success("Logged out successfully.");
                dispatch(logout());
            }
        } catch (error) {
            if (error.status === 401) {
                addToast.error(error.message, {
                    style: {
                        color: "red",
                        fontSize: "14px",
                    }
                })
            }
        }
    }

    return (
        <>
            <header className="flex items-center justify-center p-2 bg-black">
                <div className="flex items-center space-x-4 w-full">
                    <Button classCustom="w-8 h-8 bg-[#121212] rounded-full flex items-center justify-center cursor-pointer mr-auto ml-4">
                        <SpotifyIcon/>
                    </Button>
                    <div className="flex space-x-2 mx-auto w-160 just-center items-center">
                        <Button classCustom="p-3 rounded-full bg-[#1f1f1f] hover:bg-[#2a2a2a] hover:scale-105 cursor-pointer group" onClick={onClickSetHomePage}>
                            {isHomePage ? <HomeIcon className="w-6 h-6 fill-[#6f6f6f] group-hover:fill-white" /> :<HomeIconNotFill className="w-6 h-6 fill-[#6f6f6f] group-hover:fill-white"/>}
                        </Button>
                        <SearchBar ref={searchBarRef} onClick={onClickSearchDropdown} isDropDownSearch={isSearchDropdownOpening}/>
                    </div>
                </div>
                <div className="flex items-center space-x-4 ml-auto w-70">
                    <Button classCustom={`group font-poppins text-[#B3B3B3] font-semibold text-sm mr-10 transition-all transition-1s hover:scale-110 hover:text-white flex justify-center items-center gap-2 cursor-pointer`}>
                       <DownloadIcon className="fill-[#B3B3B3] w-4 h-4 group-hover:fill-white"/> Install App
                    </Button>
                    <Button classCustom="cursor-pointer">
                        <NotificationIcon className="w-4 h-4 transition-all transition-1s hover:scale-110 fill-[#B3B3B3] hover:fill-white"/>
                    </Button>
                    <div ref={dropDownRef} className="relative">
                        <Button onClick={onClickDropdown} classCustom="w-12 h-12 bg-[#1e1e1e] rounded-full flex items-center justify-center cursor-pointer mr-auto ml-4 transition-all transition-1s hover:scale-110">
                            <img aria-hidden="false" draggable="false" loading="eager"
                                 src={userProfile.avatarUrl ? userProfile.avatarUrl : defaultAvatar}
                                 alt={altText}
                                 className="w-[32px] h-[32px] rounded-full"
                            />
                        </Button>
                        {isDropdownOpening ? <DropDownUserAvatar handleLogout={handleLogout} isDropDownOpening={isDropdownOpening}/> : ""}
                    </div>
                </div>
            </header>
        </>
    );
}