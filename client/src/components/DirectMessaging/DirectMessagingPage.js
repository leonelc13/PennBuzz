import React, { Component } from 'react';



/**
 * DIRECT MESSAGING PAGE 
 **/

class DirectMessagingPage extends Component {

    render() {
        return (
            <div id="chat-window" >
                <div id="channel-window"></div>
                <div class="message-bubble">
                    <div class="sender-name">John Doe</div>
                    Hi, how are you doing today?
                </div>

                <div class="message-bubble">
                    <div class="sender-name">John Doe</div>
                    Doing fine. How about you?
                </div>

                <chatMessage text="Doing Fine. How about you?" author="John Wick" />

                <div id="input-area">
                    <input type="text" id="message-input" placeholder="Type your message..."></input>
                    <button id="send-button">Send</button>
                </div>
            </div>
        );
    }
}


export default DirectMessagingPage