import {EditIcon, Trash} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import Button from "../../core/components/Button.jsx";

export default function MoreOptionsModal({ open, onClose, anchorRef, onEditPlaylist, onDeletePlaylist, playlist }) {

    const [coords, setCoords] = useState({ top: 0, right: 0 });

    useEffect(() => {
        if (open && anchorRef?.current) {
            const rect = anchorRef.current.getBoundingClientRect();
            setCoords({
                top: rect.bottom + 6,
                right: rect.right,
            });
        }
    }, [open, anchorRef]);

    if (typeof document === "undefined") return null;

    return createPortal(
        <AnimatePresence>
            {open && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black z-40"
                        onClick={onClose}
                    />

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.2 }}
                        style={{ top: coords.top, left: coords.left }}
                        className="fixed top-24 left-24 w-85 bg-[#282828] rounded-lg shadow-lg p-2 z-50"
                    >
                        <ul className="text-white">
                            <li className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 cursor-pointer">
                                <EditIcon size={20} />
                                <Button
                                    classCustom="flex flex-col text-left font-poppins"
                                    onClick={() => {
                                        onEditPlaylist?.(); //invoke callback from parent
                                        onClose();
                                    }}
                                >
                                    <p className="font-medium">Playlist</p>
                                    <p className="text-sm text-gray-400">
                                        Edit current playlist
                                    </p>
                                </Button>
                            </li>
                            <li className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 cursor-pointer">
                                <Trash size={20} />
                                <Button
                                    classCustom="flex flex-col text-left font-poppins"
                                    onClick={() => {
                                        onDeletePlaylist?.(playlist.id); //invoke callback from parent
                                        onClose();
                                    }}
                                >
                                    <p className="font-medium">Remove</p>
                                    <p className="text-sm text-gray-400">
                                        Remove this playlist
                                    </p>
                                </Button>
                            </li>
                        </ul>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
}
