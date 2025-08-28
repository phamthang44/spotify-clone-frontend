import React from "react";
import "./CheckBox.css";

export default function AnimatedCheckbox({ isPassed, className = "" }) {
    return (
        <div className={`check relative w-[18px] h-[18px] border-white ${className}`}>
            <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                className={`transition-all duration-200 ease-linear ${
                    isPassed ? "stroke-[#4285f4]" : "stroke-[#c8ccd4]"
                }`}
            >
                {/* Vẽ vòng tròn */}
                <circle
                    cx="9"
                    cy="9"
                    r="8"
                    className={isPassed ? "circle-checked" : "circle-unchecked"}
                />
                {/* Vẽ tick */}
                <polyline
                    points="4.5 9 7.5 12 13.5 6"
                    className={isPassed ? "tick-checked" : "tick-unchecked"}
                />
            </svg>
        </div>
    );
}
