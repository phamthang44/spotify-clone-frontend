import { Outlet } from 'react-router-dom';
import Header from "../../modules/header/components/Header.jsx";
import Sidebar from "../../modules/sidebar/Sidebar.jsx";
import React from "react";
import BottomPlayer from "../../modules/bottom-player/components/BottomPlayer.jsx";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchPlaylists } from "../../modules/playlist/playlistsThunks.js";

export default function MainLayout() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [likedSongs, setLikedSongs] = useState(new Set());
    const [isHomePage, setIsHomePage] = useState(false);
    const userProfile = useSelector(state => state.userProfile);
    const dispatch = useDispatch();

    const onClickSetHomePage = () => {
        setIsHomePage(prevState => !prevState);
    }


    useEffect(() => {
        dispatch(fetchPlaylists());
    }, [dispatch]);


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
            <Header userProfile={userProfile} onClickSetHomePage={onClickSetHomePage} isHomePage={isHomePage} />
            <main className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <Sidebar />
                <Outlet />
            </main>
            {/* Bottom Player */}
            <BottomPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
        </div>
    );
}