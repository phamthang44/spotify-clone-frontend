import React, { useState } from 'react';
import Header from '../../header/components/Header.jsx'

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
import {useSelector} from "react-redux";
import Sidebar from "../../sidebar/Sidebar.jsx";
import BottomPlayer from "../../bottom-player/components/BottomPlayer.jsx";

const SpotifyUI = () => {
    return (
        <div className="bg-black text-white h-screen flex flex-col">
        </div>
    );
};

export default SpotifyUI;