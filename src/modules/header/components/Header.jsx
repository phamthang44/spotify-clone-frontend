import React, {useRef, useEffect} from "react";
import SpotifyIcon from "../../../core/assets/icons/SpotifyIcon.jsx";
import NotificationIcon from "../../../core/assets/icons/NotificationIcon.jsx";
import HomeIconNotFill from "../../../core/assets/icons/HomeIconNotFill.jsx";
import DownloadIcon from "../../../core/assets/icons/DownloadIcon.jsx";
import Button from "../../../core/components/Button.jsx";
import { useState } from "react";
import DropDown from "./DropDown.jsx";
import { logoutClient } from "../../auth/services/authService.js";
import SearchBar from "./SearchBar.jsx";
import { useDispatch } from "react-redux";
import { logout } from "../../../core/store/authSlice.js";
import { useToast } from '../../../core/contexts/ToastContext.jsx';

export default function Header({altText}) {
    const dispatch = useDispatch();
    const {addToast} = useToast();
    const [isDropdownOpening, setDropdownOpening] = useState(false);
    const dropDownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
                setDropdownOpening(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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
            <div className="flex items-center justify-center p-2 bg-black">
                <div className="flex items-center space-x-4 w-full">
                    <Button classCustom="w-8 h-8 bg-[#121212] rounded-full flex items-center justify-center cursor-pointer mr-auto ml-4">
                        <SpotifyIcon/>
                    </Button>
                    <div className="flex space-x-2 mx-auto w-160 just-center items-center">
                        <Button classCustom="p-3 rounded-full bg-[#1f1f1f] hover:bg-[#2a2a2a] hover:scale-105 cursor-pointer group">
                            <HomeIconNotFill className="w-6 h-6 fill-[#6f6f6f] group-hover:fill-white"/>
                        </Button>
                        <SearchBar />
                    </div>
                </div>
                <div className="flex items-center space-x-4 ml-auto w-70">
                    <Button classCustom={`group font-poppins text-[#B3B3B3] font-semibold text-sm mr-10 transition-all transition-1s hover:scale-110 hover:text-white flex justify-center items-center gap-2`}>
                       <DownloadIcon className="fill-[#B3B3B3] w-4 h-4 group-hover:fill-white"/> Install App
                    </Button>
                    <Button>
                        <NotificationIcon className="w-4 h-4 transition-all transition-1s hover:scale-110 fill-[#B3B3B3] hover:fill-white"/>
                    </Button>
                    <div ref={dropDownRef} className="relative">
                        <Button onClick={onClickDropdown} classCustom="w-12 h-12 bg-[#1e1e1e] rounded-full flex items-center justify-center cursor-pointer mr-auto ml-4 transition-all transition-1s hover:scale-110">
                            <img aria-hidden="false" draggable="false" loading="eager"
                                 src="https://scontent-fra3-1.xx.fbcdn.net/v/t1.30497-1/84628273_176159830277856_972693363922829312_n.jpg?stp=c379.0.1290.1290a_cp0_dst-jpg_s50x50_tt6&amp;_nc_cat=1&amp;ccb=1-7&amp;_nc_sid=7565cd&amp;_nc_ohc=wp-GzdYJaTIQ7kNvwGxpAVb&amp;_nc_oc=AdmRJuBUZEC-JCYkN0szjfuzYl1QgFDeldHfAAkCWq5Wo7wg-6IOXuTZT_ehho4P1j-VXMDsAeeB5PyepMCZ2L7f&amp;_nc_zt=24&amp;_nc_ht=scontent-fra3-1.xx&amp;edm=AP4hL3IEAAAA&amp;oh=00_AfV5-yudvV6fm3HHK_uCHdCq-Kp-hkNW4vJV96mHzymIZg&amp;oe=68CE7119"
                                 alt={altText}
                                 className="w-[32px] h-[32px] rounded-full"
                            />
                        </Button>
                        {isDropdownOpening ? <DropDown handleLogout={handleLogout} /> : ""}
                    </div>
                </div>
            </div>
        </>
    );
}