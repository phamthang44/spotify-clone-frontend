import React from "react";

export default function ProgressBar({ step, totalSteps }) {
    const progressPercent = ((step) / totalSteps) * 100;

    return (
        <div className="absolute w-full flex flex-col items-center left-0 top-7">
            {/* Thanh progress */}
            <div className="w-full bg-gray-600 h-[2px] rounded-full relative">
                <div
                    className="h-[2px] bg-green-500 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                />
            </div>
        </div>
    );
}
