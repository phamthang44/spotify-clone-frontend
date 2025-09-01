import BottomPlayer from "../../bottom-player/components/BottomPlayer.jsx";
import React from "react";

export default function MainContent() {
    return (
        <>
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
        </>
    );
}