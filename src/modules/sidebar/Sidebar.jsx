import {Heart, MoreHorizontal, Plus} from "lucide-react";
import {useState, useRef} from "react";
import Button from "../../core/components/Button.jsx";
import {motion, AnimatePresence} from "framer-motion";
import IconCollapseLibrary from "../../core/assets/icons/IconCollapseLibrary.jsx";
import IconExpandLibrary from "../../core/assets/icons/IconExpandLibrary.jsx";
import SidebarSearch from "./SidebarSearch.jsx";
import PlaylistItem from "./PlaylistItem.jsx";
import CreatePlaylistModal from "./CreatePlaylistModal.jsx";
import {playlistService} from "../playlist/PlaylistService.js"
import { useSelector, useDispatch } from "react-redux";
import {setPlaylistData} from "../playlist/playlistSlice.js";
import {fetchNewPlaylist} from "../playlist/playlistThunks.js";
import {fetchPlaylists} from "../playlist/playlistsThunks.js";


export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isHovering, setHovering] = useState(false);
    const [open, setOpen] = useState(false);
    const { items, loading, error } = useSelector((state) => state.playlists);
    const dispatch = useDispatch();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const buttonRef = useRef(null);

    const handleCreatePlaylist = async () => {
        try {
            const newPlaylist = await playlistService.createNewPlaylist();
            if (newPlaylist.status === 201) {
                dispatch(fetchPlaylists());
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleEditPlaylist = async () => {
        const updatedPlaylist = playlistService;
    }

    const handleDeletePlaylist = async (id) => {
        const response = await playlistService.deletePlaylist(id);
        if (response.status === 204) {
            dispatch(fetchPlaylists());
        }

    }

    return (
        <aside className="h-full">
            <motion.div
                animate={{width: isCollapsed ? 80 : 420}}
                transition={{duration: 0.3, ease: "easeInOut"}}
                className={`bg-[#121212] ${isCollapsed ? "p-2" : "p-4"} mx-2 rounded-md h-full flex flex-col`}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
            >
                {/* Header */}
                <div className={`mb-5 ${isCollapsed ? "px-4 mt-4 " : " flex items-center justify-between"}`}>
                    <div className="flex items-center space-x-3 justify-center relative">
                        <AnimatePresence mode="wait">
                            {(isHovering || isCollapsed) && (
                                <motion.div
                                    key={isCollapsed ? "expand" : "collapse"}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className={
                                        isCollapsed
                                            ? "absolute top-0 left-0 w-full flex items-center justify-center"
                                            : "absolute -top-2 left-3 w-full flex items-center justify-center"
                                    }
                                >
                                    <Button
                                        onClick={() => setIsCollapsed(!isCollapsed)}
                                        className="rounded transition-colors cursor-pointer"
                                    >
                                        {isCollapsed ? (
                                            <IconExpandLibrary className="w-5 h-5 fill-[#b3b3b3] hover:fill-white" />
                                        ) : (
                                            <IconCollapseLibrary className="w-5 h-5 fill-[#b3b3b3] hover:fill-white" />
                                        )}
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        {!isCollapsed && (
                            <motion.h2
                                initial={{ x: 0, opacity: 1 }}
                                animate={{ x: isHovering ? 40 : 0, opacity: 1 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="text-white font-semibold absolute left-0 w-30"
                            >
                                Your Library
                            </motion.h2>
                        )}
                    </div>
                    <div className={isCollapsed ? "flex gap-3 justify-center items-center mt-6" : "flex gap-3 justify-center items-center"}>
                        <div className={`flex justify-center items-center gap-5 flex-col ${isCollapsed ? "mt-4" : ""}`}>
                            {isCollapsed && (
                                <Button className="w-10 h-10 rounded-full bg-[#1f1f1f] flex flex-col justify-center items-center hover:bg-[#252525]">
                                    <Plus className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer"/>
                                </Button>
                                )
                            }
                        </div>
                        {!isCollapsed && (
                            <>
                                <Button
                                    classCustom="w-25 flex items-center justify-center rounded-full bg-[#1f1f1f] p-2 hover:bg-[#252525] group cursor-pointer gap-1 px-2 cursor-pointer"
                                    onClick={handleOpen}
                                    ref={buttonRef}
                                >
                                    <Plus className="w-5 h-5 text-[#b3b3b3]"/>
                                    <span className="text-[#fcfefe] inline-block font-poppins font-semibold">create</span>
                                </Button>
                                <CreatePlaylistModal open={open} onClose={handleClose} anchorRef={buttonRef} onCreatePlaylist={handleCreatePlaylist} />
                                <MoreHorizontal className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer"/>
                            </>
                        )}
                    </div>
                </div>
                {!isCollapsed && (<SidebarSearch />)}

                {/* Playlists */}
                <div className="space-y-3 overflow-y-auto scrollbar-hide">
                    {items.map((playlist, index) => (
                        <PlaylistItem className={
                            `flex items-center hover:bg-[#1f1f1f] p-2 rounded cursor-pointer relative ` +
                            (!isCollapsed ? "space-x-3" : "")
                        } playlist={playlist} key={index} onDeletePlaylist={handleDeletePlaylist} />
                    ))}
                </div>
            </motion.div>
        </aside>
    )
}