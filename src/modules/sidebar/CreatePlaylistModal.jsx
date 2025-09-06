import { PlusCircle, Users, Folder } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import Button from "../../core/components/Button.jsx";

export default function CreatePlaylistModal({ open, onClose, anchorRef, onCreatePlaylist }) {

    const [coords, setCoords] = useState({ top: 0, left: 0 });

    useEffect(() => {
        if (open && anchorRef?.current) {
            const rect = anchorRef.current.getBoundingClientRect();
            setCoords({
                top: rect.bottom + 6, // lệch xuống 6px
                left: rect.left,
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
                                <PlusCircle size={20} />
                                <Button
                                    classCustom="flex flex-col text-left font-poppins"
                                    onClick={() => {
                                        onCreatePlaylist?.(); //invoke callback from parent
                                        onClose();
                                    }}
                                >
                                    <p className="font-medium">Playlist</p>
                                    <p className="text-sm text-gray-400">
                                        Create a playlist with songs or episodes
                                    </p>
                                </Button>
                            </li>
                            <li className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 cursor-pointer">
                                <Users size={20} />
                                <div>
                                    <p className="font-medium">Blend</p>
                                    <p className="text-sm text-gray-400">
                                        Combine your friends' tastes into a playlist
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 cursor-pointer">
                                <Folder size={20} />
                                <div>
                                    <p className="font-medium">Folder</p>
                                    <p className="text-sm text-gray-400">
                                        Organize your playlists
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
}
