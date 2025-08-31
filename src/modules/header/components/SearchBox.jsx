import { useState, useEffect } from "react";
import useDebounce from "../../../core/hooks/useDebounce.js";

export default function SearchBox({ className, placeholder, type, onClick, onDebounce }) {
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 500);

    useEffect(() => {
        if (debouncedQuery) {
            // báo lên cha (SearchBar)
            console.log("debouncedQuery", debouncedQuery);
            onDebounce?.(debouncedQuery);
        }
    }, [debouncedQuery]);

    return (
        <input
            type={type}
            className={className}
            placeholder={placeholder}
            onClick={onClick}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    );
}
