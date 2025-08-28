import React from "react";

export default function ProgressBar({ step, totalSteps }) {
    const progressPercent = ((step) / totalSteps) * 100;

    return (
        <div className="w-full flex flex-col items-center">
            {/* Thanh progress */}
            <div className="w-full bg-gray-600 h-1 rounded-full relative">
                <div
                    className="h-1 bg-green-500 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                />
            </div>
        </div>
    );
}
