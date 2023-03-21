import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Message from './Message';
import Channel from './Channel';
import './style.css';

/**
 * DIRECT MESSAGING PAGE 
 **/


function DirectMessagingPage(props) {

    // Initialize the state
    const [selectedChannel, setSelectedChannel] = useState("");
    const [messages, setMessages] = useState([]);
    const [channels, setChannels] = useState({});


    useEffect(() => {
        axios.get('http://localhost:3000/channels',
            {
                params: {
                    user: props.user
                }
            })
            .then(response => {
                setChannels(response.data);
            })
            .catch(error => {
                console.error('Error fetching channels data: ', error);
            });
    }, [props.user]);

    useEffect(() => {
        if (selectedChannel) {
            axios.get(`http://localhost:3000/messages?channel_id=${selectedChannel}`)
                .then(response => {
                    setMessages(response.data[0].messages);
                })
                .catch(error => {
                    console.error('Error fetching messages data for channel: ', selectedChannel, '\n\n', error);
                });
        } else {
            setMessages([]);
        }

    }, [selectedChannel]);

    /*
        Handles Channel selection by 
    **/
    function handleChannelSelection(new_selected_channel) {
        setSelectedChannel(new_selected_channel);
        console.log("new selected user: " + selectedChannel + " " + new_selected_channel);
    }

    /*
        Renders empty chat window in the case no channel is currently selected
    **/

    function noChannelSelectedChatWindow() {
        return (
            <div id="empty-chat-window">
                <p id="empty-chat-window-text">Create a new chat or select an existing one to chat with your friends!</p>
            </div>
        )
    }

    /*
        Renders chat window for an existing chat
    **/

    function chatWindow() {
        return (
            <div id="chat-window" >
                <div id="chat-container">
                    {messages.map(message => (
                        <Message
                            key={message.sender + message.timestamp + props.user}
                            sender={message.sender}
                            timestamp={message.timestamp}
                            text={message.text}
                            user={props.user}
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
    function existingChatHeader() {
        return (

            <div id="chat-header-container">
                <span id="chat-header-img-wrapper">
                    <img src={channels[selectedChannel].img} alt="channel"></img>
                </span>
                <span className="channel-name">{channels[selectedChannel].name}</span>
            </div>
        )
    }


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
                    Object.keys(channels).map(channel_id => {

                        return (
                            <Channel
                                key={channel_id}
                                id={channel_id}
                                is_selected_channel={channel_id === selectedChannel}
                                name={channels[channel_id].name}
                                image_src={channels[channel_id].img}
                                handleClick={handleChannelSelection}
                            />
                        )
                    })
                }
            </div>

            {selectedChannel ? existingChatHeader() : (<span></span>)}
            {selectedChannel ? chatWindow() : noChannelSelectedChatWindow()}
        </div >
    );
}


export default DirectMessagingPage