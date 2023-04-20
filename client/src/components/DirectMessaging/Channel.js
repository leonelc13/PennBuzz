import React from 'react';
/**
 * React Component for individual message
 **/

function Channel(props) {

    return (
        <div className={`channel-container ${props.is_selected_channel ? 'selected-channel' : ''}`} onClick={() => props.handleClick(props.id)}>
            <span className="channel-img-wrapper">
                <img src={props.image_src} alt="channel"></img>
            </span>
            <span className="channel-name">{props.name}</span>
            <i className="channel-icon fa-regular fa-ellipsis-vertical" alt="menu-icon"></i>
        </div >
    );
}

export default Channel