import React from 'react';
import { MdSearch } from "react-icons/md";

import './style.css';

const SearchBar = () => {
    const handleExpand = () => {
        const search = document.querySelector(".search-input");
        search.classList.toggle("search-expanded");
    }

    return (
        <div className="container">
            <button className="search-wrapper" onClick={handleExpand}>
                <MdSearch size={30} />
            </button>

            <input
                className="search-input"
                type="text"
                placeholder="Search"
            />
        </div>
    )
}

export default SearchBar;