import React from "react";
import "../../modules/auth/components/Common/CheckBox.css";


export default function AnimatedRadio({
                                          checked = false,
                                          onChange,
                                          className = "",
                                          label,
                                      }) {
    return (
        <label className="flex items-center gap-2 cursor-pointer select-none">
            <div
                className={`check relative w-[18px] h-[18px] border-white rounded-full ${className}`}
                onClick={() => onChange && onChange(true)}
            >
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    className={`transition-all duration-200 ease-linear ${
                        checked ? "stroke-[#4285f4]" : "stroke-[#c8ccd4]"
                    }`}
                >
                    {/* Vòng tròn ngoài */}
                    <circle
                        cx="9"
                        cy="9"
                        r="8"
                        className={checked ? "circle-checked" : "circle-unchecked"}
                    />
                    {/* Chấm tròn bên trong */}
                    {checked && (
                        <circle
                            cx="9"
                            cy="9"
                            r="4"
                            fill="#4285f4"
                            className="transition-all duration-200 ease-linear"
                        />
                    )}
                </svg>
            </div>
            {label && <span>{label}</span>}
        </label>
    );
}
