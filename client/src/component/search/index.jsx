// Search.js
import React from 'react';
import './search.css';

export const Search = ({ handleSearch }) => {
    return (
        <div className="search">
            <div className="search-container">
                <input type="text" className="search-input" placeholder="Search..." onChange={handleSearch} />
                <i className="search-icon fas fa-search" />
            </div>
        </div>
    );
};
