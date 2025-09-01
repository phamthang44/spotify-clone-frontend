import Button from "../../../core/components/Button.jsx";
import SearchResult from "./SearchResult.jsx";
import { motion, AnimatePresence } from "framer-motion";
import {useEffect, useState} from "react";
import {format} from "../../../core/components/utils/helper.js"

export default function SearchResultDropDown({ results, isSearchDropDown, totalFound, onClearAll, onClear }) {


    return (
        <AnimatePresence>
            {isSearchDropDown && (
                <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.1, ease: "easeOut" }}
                    className="absolute top-14 left-0 inline-block text-left bg-[#282828] z-10 w-full py-4 px-6 h-fit rounded-lg shadow-2xl"
                >
                    <div className="flex justify-between items-center">
                        <h3 className="font-poppins text-white font-semibold">Recent searches</h3>
                        <span className="font-poppins text-white text-sm">{totalFound ? totalFound : 0} - found</span>
                    </div>
                    <div className="mt-4 space-y-2 text-white">
                        {results?.length > 0 ? (
                            results.map((r) => (
                                <SearchResult key={r.data.id}
                                              id={r.data.id}
                                              title={r.data.title ? r.data.title : r.data.name}
                                              resultType={format.formatUppercaseFirstLetter(r.type)}
                                              artist={r.data.artistName ? r.data.artistName: r.data.country}
                                              onClear={onClear}
                                />
                            ))
                        ) : (
                            <p className="text-[#565656] font-montserrat text-2xl">No result found!</p>
                        )}
                    </div>
                    <Button onClick={onClearAll} classCustom="px-4 py-1.5 cursor-pointer flex justify-center items-center border border-[#565656] rounded-full hover:border-white hover:scale-103 transition-transform mt-4">
                        <span className="font-poppins text-sm font-semibold">Clear recent searches</span>
                    </Button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
