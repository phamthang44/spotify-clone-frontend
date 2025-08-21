import React, { useState } from 'react';
import Header from '../../app-header/components/Header.jsx'

import {
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Heart,
    Shuffle,
    Repeat,
    Volume2,
    Search,
    Home,
    Plus,
    MoreHorizontal,
    PictureInPicture2,
    Maximize2
} from 'lucide-react';

const SpotifyUI = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [likedSongs, setLikedSongs] = useState(new Set());

    const playlists = [
        { name: "Liked Songs", type: "Playlist", songs: "35 songs", icon: "heart", color: "bg-gradient-to-br from-purple-600 to-blue-600" },
        { name: "Vietnamese playlist", type: "Playlist", user: "Thăng", image: "/api/placeholder/40/40" },
        { name: "Café Playlist", type: "Playlist", user: "uDiscover Vietnam", verified: true, image: "/api/placeholder/40/40" },
        { name: "🌺", type: "Playlist", user: "Muối Muối", image: "/api/placeholder/40/40" },
        { name: "My Playlist #4", type: "Playlist", user: "Thăng", image: "/api/placeholder/40/40" },
        { name: "Chill songs 🌻", type: "Playlist", user: "Roshia", image: "/api/placeholder/40/40" },
        { name: "My playlist #2", type: "Playlist", user: "Thăng", image: "/api/placeholder/40/40" },
        { name: "Ok3i", type: "Playlist", user: "Thăng", image: "/api/placeholder/40/40" }
    ];

    const dailyMixes = [
        { title: "Daily Mix 1", description: "IVE, BLACKPINK, ILLIT and more", image: "/api/placeholder/160/160", number: "01" },
        { title: "Daily Mix 2", description: "RAP VIỆT, Sơn Tùng M-TP, Vũ Cát Tường and more", image: "/api/placeholder/160/160", number: "02" },
        { title: "Daily Mix 4", description: "Lana Del Rey, Lady Gaga, Sabrina Carpenter and...", image: "/api/placeholder/160/160", number: "04" },
        { title: "Daily Mix 5", description: "keshi, Laufey, Thomas, MAX and more", image: "/api/placeholder/160/160", number: "05" }
    ];

    const moreRecommendations = [
        { title: "Thiên Hạ Nghe Gì", description: "Những ca khúc thịnh hành", image: "/api/placeholder/160/160" },
        { title: "V-Pop", description: "Không Thể Thiếu", image: "/api/placeholder/160/160" },
        { title: "Cần một thằng của tùng", description: "", image: "/api/placeholder/160/160" },
        { title: "Đêng xói Tây đây!!", description: "", image: "/api/placeholder/160/160" },
        { title: "K-Pop Ngày Lụi Tụi", description: "Ẻng K-Pop cán cái nhóm", image: "/api/placeholder/160/160" },
        { title: "Today's Top Hits", description: "The hottest 50. Cover: The Weeknd", image: "/api/placeholder/160/160" }
    ];

    const quickAccess = [
        { name: "IVE", image: "/api/placeholder/60/60" },
        { name: "K-Pop ON! (온)", image: "/api/placeholder/60/60" },
        { name: "Liked Songs", image: "/api/placeholder/60/60", isLiked: true },
        { name: "Daily Mix 3", image: "/api/placeholder/60/60" }
    ];

    return (
        <div className="bg-black text-white h-screen flex flex-col">
            {/* Top Navigation */}
            <header>
                <Header />
            </header>
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-64 bg-black p-6">
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-gray-400 font-medium">Your Library</h2>
                            <div className="flex space-x-2">
                                <Plus className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                                <MoreHorizontal className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                            </div>
                        </div>
                        <div className="mb-4">
                            <button className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm mr-2">Playlists</button>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {playlists.map((playlist, index) => (
                            <div key={index} className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded cursor-pointer">
                                {playlist.icon === "heart" ? (
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded flex items-center justify-center">
                                        <Heart className="w-6 h-6 text-white fill-current" />
                                    </div>
                                ) : (
                                    <img src={playlist.image} alt={playlist.name} className="w-12 h-12 rounded" />
                                )}
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium truncate">{playlist.name}</p>
                                    <p className="text-sm text-gray-400 truncate">
                                        {playlist.type} • {playlist.user || playlist.songs}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 bg-gradient-to-b from-gray-900 to-black overflow-y-auto">
                    <div className="p-6">
                        {/* Navigation Pills */}
                        <div className="flex space-x-2 mb-6">
                            <button className="bg-white text-black px-4 py-2 rounded-full font-medium">All</button>
                            <button className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700">Music</button>
                            <button className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700">Podcasts</button>
                        </div>

                        {/* Quick Access */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {quickAccess.map((item, index) => (
                                <div key={index} className="bg-gray-800 rounded-lg p-2 flex items-center hover:bg-gray-700 cursor-pointer group">
                                    {item.isLiked ? (
                                        <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-blue-600 rounded-md flex items-center justify-center mr-4">
                                            <Heart className="w-6 h-6 text-white fill-current" />
                                        </div>
                                    ) : (
                                        <img src={item.image} alt={item.name} className="w-14 h-14 rounded-md mr-4" />
                                    )}
                                    <span className="font-medium">{item.name}</span>
                                    <Play className="w-8 h-8 ml-auto opacity-0 group-hover:opacity-100 transition-opacity bg-green-500 rounded-full p-2 text-black" />
                                </div>
                            ))}
                        </div>

                        {/* Made For Section */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold">Made For</h2>
                                <button className="text-gray-400 hover:text-white text-sm font-medium">Show all</button>
                            </div>
                            <p className="text-gray-400 mb-4">Thăng</p>

                            <div className="grid grid-cols-4 gap-6">
                                {dailyMixes.map((mix, index) => (
                                    <div key={index} className="bg-gray-900 p-4 rounded-lg hover:bg-gray-800 cursor-pointer group">
                                        <div className="relative mb-4">
                                            <img src={mix.image} alt={mix.title} className="w-full aspect-square rounded-lg" />
                                            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                                                <div className="text-6xl font-bold text-white opacity-80">{mix.number}</div>
                                            </div>
                                            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Play className="w-12 h-12 bg-green-500 rounded-full p-3 text-black" />
                                            </div>
                                        </div>
                                        <h3 className="font-bold mb-2">{mix.title}</h3>
                                        <p className="text-sm text-gray-400 line-clamp-2">{mix.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* More of what you like */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold">More of what you like</h2>
                                <button className="text-gray-400 hover:text-white text-sm font-medium">Show all</button>
                            </div>
                            <p className="text-gray-400 mb-4">Hear a little bit of everything you love.</p>

                            <div className="grid grid-cols-6 gap-4">
                                {moreRecommendations.map((item, index) => (
                                    <div key={index} className="bg-gray-900 p-3 rounded-lg hover:bg-gray-800 cursor-pointer group">
                                        <div className="relative mb-3">
                                            <img src={item.image} alt={item.title} className="w-full aspect-square rounded-lg" />
                                            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Play className="w-10 h-10 bg-green-500 rounded-full p-2.5 text-black" />
                                            </div>
                                        </div>
                                        <h3 className="font-medium text-sm mb-1 line-clamp-1">{item.title}</h3>
                                        <p className="text-xs text-gray-400 line-clamp-2">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Player */}
            <div className="bg-black border-t border-gray-800 p-4">
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
        </div>
    );
};

export default SpotifyUI;