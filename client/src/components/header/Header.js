import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
/**
 * React Component for Header displayed to a logged in user
 **/



function Header(props) {

    return (
        <div id="header-container">

            <span id="pennbuzz-name">
                <Link to="/">
                    Penn
                    <span id="buzz-name">
                        Buzz
                    </span>
                </Link>
            </span>

            <input type="text" id="search-input" placeholder="Search for Friends, Quizzes, and more"></input>

            <span className="navbar-text">
                <Link to="/leaderboard">
                    Leaderboard
                </Link >
            </span>
            <span className="navbar-text">
                <Link to="/chat">
                    Chats
                </Link>
            </span>
            <span id="user-profile-picture-wrapper">

                <Link to={`/profile`} >
                    <img src={props.user_profile_picture} alt=" profile-pic"></img>
                </Link>
            </span>

        </div >
    );
}

export default Header