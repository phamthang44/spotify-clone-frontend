import Button from "../../core/components/Button.jsx";
import {Heart, PlayIcon} from "lucide-react";
import {AnimatePresence, motion} from "framer-motion";
import {useState} from "react";
import playlistDefaultImage from "../../assets/images/default-playlist.png";


export default function PlaylistItem({className, onPlay, playlist, isCollapsed}) {
    const [isHover, setIsHover] = useState(false);

    return (
        <div
            className={className}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <div className="relative w-12 h-12">
                {playlist.icon === "heart" ? (
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded flex items-center justify-center">
                        <Heart className="w-6 h-6 text-white fill-current"/>
                    </div>
                ) : (
                    <img src={playlist.image ? playlist.image : playlistDefaultImage} alt={playlist.name} className="w-12 h-12 rounded"/>
                )}
                <AnimatePresence>
                    {isHover && (
                        <motion.div
                            key="overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/10 rounded"
                        />
                    )}
                </AnimatePresence>

                {/* Hiển thị nút Play khi hover */}
                <AnimatePresence>
                    {isHover && (
                        <motion.div
                            key="play-btn"
                            initial={{opacity: 0, scale: 0.8}}
                            animate={{opacity: 1, scale: 1}}
                            exit={{opacity: 0, scale: 0.8}}
                            className={
                                isCollapsed
                                    ? "absolute inset-0 flex items-center justify-center"
                                    : "absolute top-3 left-3"
                            }
                        >
                            <Button onClick={onPlay} classCustom="cursor-pointer">
                                <PlayIcon className="fill-[#fbfbfb]"/>
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

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
    );
}
