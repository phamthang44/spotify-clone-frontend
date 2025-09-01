import {Heart, Shuffle, SkipBack, Play, SkipForward, Repeat, PictureInPicture2, Volume2, Maximize2} from "lucide-react"

export default function BottomPlayer({isPlaying, setIsPlaying}) {
    return (
        <div className="bg-black p-4 mt-2">
            <div className="flex items-center justify-between">
                {/* Currently Playing */}
                <div className="flex items-center space-x-3 w-1/3">
                    <img src="/api/placeholder/56/56" alt="ATTITUDE" className="w-14 h-14 rounded" />
                    <div>
                        <p className="font-medium">ATTITUDE</p>
                        <p className="text-sm text-gray-400">Music video • IVE</p>
                    </div>
                    <Heart className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                </div>

                {/* Controls */}
                <div className="flex flex-col items-center w-1/3">
                    <div className="flex items-center space-x-6 mb-2">
                        <Shuffle className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
                        <SkipBack className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                        >
                            {isPlaying ?
                                <Pause className="w-4 h-4 text-black" /> :
                                <Play className="w-4 h-4 text-black ml-0.5" />
                            }
                        </button>
                        <SkipForward className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                        <Repeat className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
                    </div>
                    <div className="flex items-center space-x-2 w-full max-w-md">
                        <span className="text-xs text-gray-400">0:00</span>
                        <div className="flex-1 bg-gray-600 rounded-full h-1">
                            <div className="bg-white rounded-full h-1 w-0"></div>
                        </div>
                        <span className="text-xs text-gray-400">3:14</span>
                    </div>
                </div>

                {/* Volume and Options */}
                <div className="flex items-center space-x-4 w-1/3 justify-end">
                    <PictureInPicture2 className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
                    <Volume2 className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
                    <div className="bg-gray-600 rounded-full h-1 w-20">
                        <div className="bg-white rounded-full h-1 w-16"></div>
                    </div>
                    <Maximize2 className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
                </div>
            </div>
        </div>
    );
}