import React, { useState, useEffect } from 'react';
import { getSearchResults } from '../../api/SearchBar';
import { Link } from 'react-router-dom';
import { SearchResult } from './SearchResult';


function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    useEffect(() => {
        console.log(" I RAN");
        setResults([]);
        if (query) {
            getSearchResults(query)
                .then(data => {
                    console.log("DATA" + data);
                    setResults(data[0].results)
                })
                .catch(error => console.log(error));
        }

    }, [query]);

    function handleInputChange(event) {
        setQuery(event.target.value);
    }

    return (
        <div className="search-container">
            <input type="text" id="search-input" placeholder="Search for Friends, Quizzes, and more" value={query} onChange={handleInputChange}></input>

            <ul className="search-results">
                {results.map(result => (
                    <Link to="/">
                        <SearchResult {...result} resetQuery={() => setQuery("")} />
                    </Link>
                ))}
            </ul>
        </div>
    );
}

export default SearchBar;
