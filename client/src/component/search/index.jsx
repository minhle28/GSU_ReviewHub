import React from 'react'
import './search.css';
import { Link } from 'react-router-dom';

export const Search = () => {
    return (
        <div className="search">
            <div className="search-container">
                <input type="text" className="search-input" placeholder="Search..." />
                <i className="search-icon fas fa-search" />
            </div>
        </div>
    );
}