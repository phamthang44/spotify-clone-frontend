import {Heart, MoreHorizontal, Plus} from "lucide-react";
import {useState} from "react";
import Button from "../../core/components/Button.jsx";
import {motion, AnimatePresence} from "framer-motion";
import IconCollapseLibrary from "../../core/assets/icons/IconCollapseLibrary.jsx";
import IconExpandLibrary from "../../core/assets/icons/IconExpandLibrary.jsx";


export default function Sidebar({playlists}) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    return (
        <aside className="h-full">
            <motion.div
                animate={{width: isCollapsed ? 80 : 420}}
                transition={{duration: 0.3, ease: "easeInOut"}}
                className={`bg-[#121212] ${isCollapsed ? "p-2" : "p-4"} mx-2 rounded-md h-full flex flex-col`}
            >
                {/* Header */}
                <div className={`mb-6 ${isCollapsed ? "px-4" : ""}flex items-center justify-between`}>
                    <div className="flex items-center space-x-2">
                        <AnimatePresence>
                            {!isCollapsed && (
                                <motion.h2
                                    key="library"
                                    initial={{opacity: 0, x: -10}}
                                    animate={{opacity: 1, x: 0}}
                                    exit={{opacity: 0, x: -10}}
                                    className="text-white font-semibold"
                                >
                                    Your Library
                                </motion.h2>
                            )}
                        </AnimatePresence>
                    </div>
                    <div className="flex gap-3 justify-center items-center ">
                        <div className={`flex justify-center items-center gap-5 flex-col ${isCollapsed ? "mt-4" : ""}`}>
                        <Button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="rounded transition-colors cursor-pointer"
                        >
                            {isCollapsed ? (
                                <IconExpandLibrary className="w-5 h-5 fill-[#b3b3b3] hover:fill-white"/>
                            ) : (
                                <IconCollapseLibrary className="w-5 h-5 fill-[#b3b3b3] hover:fill-white"/>
                            )}
                        </Button>
                        {isCollapsed && (
                            <Button className="w-10 h-10 rounded-full bg-[#1f1f1f] flex flex-col justify-center items-center hover:bg-[#252525]">
                                <Plus className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer"/>
                            </Button>
                        )
                        }
                        </div>
                        {!isCollapsed && (
                            <>
                                <Plus className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer"/>
                                <MoreHorizontal className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer"/>
                            </>
                        )}
                    </div>
                </div>

                {/* Playlists */}
                <div className="space-y-3 overflow-y-auto scrollbar-hide">
                    {playlists.map((playlist, index) => (
                        <div
                            key={index}
                            className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded cursor-pointer"
                        >
                            {playlist.icon === "heart" ? (
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded flex items-center justify-center">
                                    <Heart className="w-6 h-6 text-white fill-current"/>
                                </div>
                            ) : (
                                <img src={playlist.image} alt={playlist.name} className="w-12 h-12 rounded"/>
                            )}

                            {/* Animate text collapse */}
                            <AnimatePresence>
                                {!isCollapsed && (
                                    <motion.div
                                        key="playlist-text"
                                        initial={{opacity: 0, x: -10}}
                                        animate={{opacity: 1, x: 0}}
                                        exit={{opacity: 0, x: -10}}
                                        className="flex-1 min-w-0"
                                    >
                                        <p className="font-medium truncate">{playlist.name}</p>
                                        <p className="text-sm text-gray-400 truncate">
                                            {playlist.type} • {playlist.user || playlist.songs}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </motion.div>
        </aside>
    )
}