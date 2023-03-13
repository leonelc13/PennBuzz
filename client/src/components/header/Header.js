import React, { Component } from 'react';
import './style.css';
/**
 * React Component for Header displayed to a logged in user
 **/

class Header extends Component {


    render() {
        return (
            <div id="header-container">
                <span id="pennbuzz-name">
                    Penn
                    <span id="buzz-name">
                        Buzz
                    </span>
                </span>


                <input type="text" id="search-input" placeholder="Search for Friends, Quizzes, and more"></input>
                <span class="navbar-text">
                    Leaderboard
                </span>
                <span class="navbar-text">
                    Chats
                </span>
                <span id="user-profile-picture-wrapper">
                    <img src="https://drive.google.com/uc?id=1munwKbM6dQSWE1ruZ_41O79ZeliPXYVe&export=download" alt="profile-pic"></img>
                </span>



            </div >
        );
    }
}

export default Header