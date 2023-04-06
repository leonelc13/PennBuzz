import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function SearchResult(props) {
    const navigate = useNavigate();

    function handleClick() {
        console.log("RUN");
        props.resetQuery();
    }

    return (
        <Link to={props.type == "quiz" ? `/quiz/${props.id}` : `/profile/${props.id}`}>
            <div className='search-result-container' onClick={handleClick}>
                {props.title}
                <span>
                    {props.type}
                </span>
            </div>
        </Link>

    );
}  