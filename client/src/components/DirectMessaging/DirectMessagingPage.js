import React, { Component } from 'react';
import Message from './Message'
import Channel from './Channel'
import './style/style.css';

/**
 * DIRECT MESSAGING PAGE 
 **/

let messages_data = {
    johnwick: [
        {
            sender: "John Wick",
            timestamp: "8:22pm 12/12/2023",
            text: "Hey John! How are you!"
        },
        {
            sender: "John Doe",
            timestamp: "8:29pm 12/12/2023",
            text: "Hey John! How are you!"
        },
        {
            sender: "John Doe",
            timestamp: "8:30pm 12/12/2023",
            text: "Hey John! How are you! Hey John! How are you! Hey John! How are you! Hey John! How are you!"
        },
        {
            sender: "John Doe",
            timestamp: "8:31pm 12/12/2023",
            text: "Hey John! How are you!"
        },
        {
            sender: "John Wick",
            timestamp: "8:32pm 12/12/2023",
            text: "Hey John! How are you!"
        },
        {
            sender: "John Doe",
            timestamp: "8:36pm 12/12/2023",
            text: "Hey John! How are you!"
        },
        {
            sender: "John Doe",
            timestamp: "8:40pm 12/12/2023",
            text: "Hey John! How are you! Hey John! How are you! Hey John! How are you! Hey John! How are you!"
        },
        {
            sender: "John Doe",
            timestamp: "8:42pm 12/12/2023",
            text: "Hey John! How are you!"
        },
        {
            sender: "John Wick",
            timestamp: "8:51pm 12/12/2023",
            text: "Hey John! How are you!"
        },
        {
            sender: "John Doe",
            timestamp: "8:54pm 12/12/2023",
            text: "Hey John! How are you!"
        },
        {
            sender: "John Doe",
            timestamp: "8:56pm 12/12/2023",
            text: "Hey John! How are you! Hey John! How are you! Hey John! How are you! Hey John! How are you!"
        }
    ],
    jonjones: [
        {
            sender: "Jon Jones",
            timestamp: "8:22pm 12/12/2023",
            text: "Hey Jon! How are you!"
        },
        {
            sender: "John Doe",
            timestamp: "8:56pm 12/12/2023",
            text: "Hey John! Doing Fine!"
        }
    ]
}

let channels = {
    johnwick: {
        name: "John Wick",
        timestamp: "8:54pm 12/12/2023",
        img: "https://drive.google.com/uc?export=view&id=1munwKbM6dQSWE1ruZ_41O79ZeliPXYVe"
    },
    jonjones: {
        name: "Jon Jones",
        timestamp: "8:54pm 12/12/2023",
        img: "https://drive.google.com/uc?export=view&id=1bL48Yx608hc6QK41dVx-7O95XwMPOc25"
    }
}



let selected_channel = "";

let user = "John Doe";


class DirectMessagingPage extends Component {

    constructor(props) {

        super(props);
        console.log("CONSTRUCTOR RUNS");


        // Faked Messaging state for UI testing purposes
        this.state = {
            selected_channel: selected_channel,
            messages: messages_data[selected_channel],
            channels: channels,
            user: user
        };


        // Bind event handlers
        this.handleChannelSelection = this.handleChannelSelection.bind(this);
    }

    /*
        Handles Channel selection by 
    **/
    handleChannelSelection(new_selected_channel) {
        this.setState({ selected_channel: new_selected_channel });
        // Update Messages -- Emulate using local data at first
        this.setState({ messages: messages_data[new_selected_channel] })
        console.log("new selected user: " + this.state.selected_channel + " " + new_selected_channel);
    }

    /*
        Renders empty chat window in the case no channel is currently selected
    **/

    noChannelSelectedChatWindow() {
        return (
            <div id="empty-chat-window">
                <p id="empty-chat-window-text">Create a new chat or select an existing one to chat with your friends!</p>
            </div>
        )
    }

    /*
        Renders chat window for an existing chat
    **/

    chatWindow() {
        return (
            <div id="chat-window" >
                <div id="chat-container">
                    {this.state.messages.map(message => (
                        <Message
                            key={message.sender + message.timestamp + message.user}
                            sender={message.sender}
                            timestamp={message.timestamp}
                            text={message.text}
                            user={this.state.user}
                        />
                    ))}
                </div>
                <div id="input-area">
                    <input type="text" id="message-input" placeholder="Type your message..."></input>
                    <button id="send-button">Send</button>
                </div>
            </div>
        )
    }


    /*
        Renders chat header for an existing chat
    **/
    existingChatHeader() {
        return (

            <div id="chat-header-container">
                <span id="chat-header-img-wrapper">
                    <img src={this.state.channels[this.state.selected_channel].img} alt="channel"></img>
                </span>
                <span className="channel-name">{this.state.channels[this.state.selected_channel].name}</span>
            </div>
        )
    }


    render() {
        return (
            <div className="page-window" >
                <div className="channel-header-container">
                    <span className="channel-text-header">Chats</span>
                    <span className="channel-plus-icon">
                        <i className="fa-solid fa-plus"></i>
                    </span>
                </div>
                <div className="channels-window">
                    {
                        Object.keys(this.state.channels).map(channel_id => {

                            return (
                                <Channel
                                    key={channel_id}
                                    id={channel_id}
                                    is_selected_channel={channel_id === this.state.selected_channel}
                                    name={this.state.channels[channel_id].name}
                                    image_src={this.state.channels[channel_id].img}
                                    handleClick={this.handleChannelSelection}
                                />
                            )
                        })
                    }
                </div>

                {this.state.selected_channel ? this.existingChatHeader() : (<span></span>)}
                {this.state.selected_channel ? this.chatWindow() : this.noChannelSelectedChatWindow()}
            </div >
        );
    }
}


export default DirectMessagingPage