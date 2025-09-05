import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import SearchIcon from "../../core/assets/icons/SearchIcon.jsx";
import Button from "../../core/components/Button.jsx";
import InputCommon from "../../core/components/InputCommon.jsx";

export default function SidebarSearch() {
    const [isSearching, setIsSearching] = useState(false);
    const inputRef = useRef(null);
    const containerRef = useRef(null);

    const openSearchInput = () => setIsSearching(true);

    // Đóng khi click ra ngoài
    useEffect(() => {
        function handleClickOutside(e) {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsSearching(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Auto focus khi mở
    useEffect(() => {
        if (isSearching && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isSearching]);

    return (
        <div ref={containerRef} className="relative py-4 mt-2">
            {isSearching ? (
                <motion.div
                    initial={{ width: 40 }}
                    animate={{ width: 200 }} // đổi size tuỳ ý
                    exit={{ width: 40 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute flex items-center bg-[#2a2a2a] rounded-md px-2 py-1 -top-3 left-2"
                >
                    <SearchIcon className="h-4 w-4 fill-[#b3b3b3] mr-2" />
                    <InputCommon
                        ref={inputRef}
                        className="bg-transparent outline-none text-sm w-full"
                        placeholder="Search in Your Library"
                    />
                </motion.div>
            ) : (
                <Button
                    classCustom="absolute group p-2 rounded-full hover:bg-[#272727] cursor-pointer -top-3 left-0"
                    onClick={openSearchInput}
                >
                    <SearchIcon className="h-4 w-4 fill-[#b3b3b3] group-hover:fill-[#e8e8e8]" />
                </Button>
            )}
        </div>
    );
}
