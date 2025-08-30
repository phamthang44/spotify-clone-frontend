import React from "react";
import "./CheckBox.css";

export default function AnimatedCheckbox({
                                             checked = false,
                                             onChange,
                                             className = "",
                                             label,
                                         }) {
    return (
        <label className="flex items-center gap-2 cursor-pointer select-none">
            <div
                className={`bg-[#121212] check relative w-[18px] h-[18px] border rounded-sm flex items-center justify-center ${className}`}
                onClick={() => onChange && onChange(!checked)}
            >
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                >
                    {/* ô vuông */}
                    <rect
                        x="1.5"
                        y="1.5"
                        width="15"
                        height="15"
                        rx="2"
                        className={checked ? "checkbox-box-checked" : "checkbox-box"}
                    />
                    {/* dấu tick */}
                    <polyline
                        points="4.5 9 7.5 12 13.5 6"
                        className={checked ? "tick-checked" : "tick-unchecked"}
                    />
                </svg>
            </div>
            {label && <span>{label}</span>}
        </label>
    );
}
