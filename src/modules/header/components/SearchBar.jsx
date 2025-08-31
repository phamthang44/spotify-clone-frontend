import IconBrowse from "../../../core/assets/icons/IconBrowse.jsx";
import Button from "../../auth/components/Common/Button.jsx";
import SearchIcon from "../../../core/assets/icons/SearchIcon.jsx";
import SearchResultDropDown from "./SearchResultDropDown.jsx";
import { forwardRef, useState } from "react";
import SearchBox from "./SearchBox.jsx"
import {searchServices} from "../../../core/services/searchService.js";
import {format} from "../../../core/components/utils/helper.js";
const SearchBar = forwardRef(({onClick, isDropDownSearch}, ref) => {
    const [searchResults, setSearchResults] = useState([]);
    const [totalFounded, setTotalFounded] = useState(0);
    const handleDebounce = async (query) => {
        if (!query) {
            setSearchResults([]); // clear khi user xóa hết input
            return;
        }
        console.log("Gọi API với:", query);
        const results = await searchServices.searchByKeyword(query);
        if (results.status === 200 && results.data.data) {
            let normalizedResults;
            const totalFound = results.data.data.total;
            if (results.data.data.results.length > 0) {
                normalizedResults = format.normalizeSearchResults(results.data.data.results);
            }
            setSearchResults(normalizedResults);
            setTotalFounded(totalFound);
        }
    };

    return (
        <div ref={ref} className="relative">
            <div className="relative">
                <div className="relative group">
                    <SearchIcon className="w-6 h-6 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 fill-[#6f6f6f] group-hover:fill-gray-300" />
                    <SearchBox
                        onClick={onClick}
                        type="text"
                        placeholder="What do you want to play?"
                        className="bg-[#1f1f1f] rounded-full py-3 pl-12 pr-4 w-120 hover:outline-1 outline-[#363636] hover:bg-[#2a2a2a] text-white placeholder-[#868686] focus:outline-none focus:ring-2 focus:ring-white font-poppins font-semibold"
                        onDebounce={handleDebounce}
                    />
                </div>
                <div className="absolute top-3 right-15 h-6 w-[1px] bg-[#6f6f6f]"></div>
                {isDropDownSearch ? <SearchResultDropDown totalFound={totalFounded} results={searchResults} isSearchDropDown={isDropDownSearch}/> : null}
            </div>
            <Button divClass="absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer mt-[2px]" className="w-6 h-6" icon={<IconBrowse className="w-6 h-6 transition-all transition-1s hover:scale-110 fill-[#6f6f6f] hover:fill-white"/>}></Button>
        </div>
    );
});

export default SearchBar;