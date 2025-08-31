import Button from "../../../core/components/Button.jsx";
import LinkHrefIcon from "../../../core/assets/icons/LinkHrefIcon.jsx";
import { motion, AnimatePresence } from "framer-motion";

export default function DropDownUserAvatar({handleLogout, isDropDownOpening}) {
    const classLiItem = "flex justify-between items-center p-2 font-poppins text-[15px] hover:bg-[#3e3e3e] group";
    const classButton = "hover:underline";
    return (
        <AnimatePresence>
            {isDropDownOpening && (<motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.1, ease: "easeOut" }}
                className="absolute top-14 right-1 inline-block group text-left bg-[#282828] z-10 w-45 p-1 rounded-lg shadow-lg transition-opacity"
            >
                <ul>
                    <li className={classLiItem}>
                        <Button classCustom={classButton}>Account</Button>
                        <span><LinkHrefIcon className="w-4 h-4 fill-[#e9e9e9]" /></span>
                    </li>
                    <li className={classLiItem}>
                        <Button classCustom={classButton}>Profile</Button>
                    </li>
                    <li className={classLiItem}>
                        <Button classCustom={classButton}>Settings</Button>
                    </li>
                    <li>
                        <div className="my-2 w-full border-b border-[#3e3e3e]"></div>
                    </li>
                    <li className={classLiItem} onClick={handleLogout}>
                        <Button classCustom={classButton}>Log out</Button>
                    </li>
                </ul>
            </motion.div>)}
        </AnimatePresence>

    );
}