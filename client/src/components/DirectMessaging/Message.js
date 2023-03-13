import React from 'react';

/**
 * React Component for individual message
 **/

function Message(props) {
    return (
        <div className="message-container">
            <div
                className={`message-bubble ${props.sender === props.user ? 'sender' : 'recipient'}`} >

                <div className="text-message-body ">{props.text}</div>
            </div >
            <span className={`message-timestamp ${props.sender === props.user ? 'sender' : 'recipient'}`}>{props.timestamp}</span>
        </div >
    );
}
export default Message