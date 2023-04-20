import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Message from './Message';

import { AddMessage, getMessages } from '../../api/DirectMessagesAPI';

import './style.css';

/*
    Renders chat window for an existing chat
**/


export default function ChatWindow(props) {

    const selectedChannel = props.selectedChannel;
    const socket = props.socket;
    const username = props.user;

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");


    // validate socket



    useEffect(() => {
        setMessages([]);
        if (selectedChannel) {
            getMessages(username, selectedChannel)
                .then(data => {
                    console.log("DATA", data);
                    if (data && Array.isArray(data)) {
                        setMessages(data);
                    } else {
                        setMessages([]);
                    }
                })
                .catch(error => {
                    console.error('Error fetching messages data for channel: ', selectedChannel, '\n\n', error);
                });
        } else {
            setMessages([]);
        }
    }, [selectedChannel]);


    /*
        MESSAGE HANDLERS
    */

    // Send Message to socket
    function sendMessage() {
        // Reset input field
        const text = message;
        setMessage("");

        // Return if message is empty
        if (!message) return;
        // Get timestamp
        const date = new Date(); // create a new Date object with the current date and time
        const dateString = date.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
            month: 'numeric',
            day: 'numeric',
            year: 'numeric'
        });

        const body = {
            "sender": username,
            "text": text,
            "timestamp": dateString,
            "channel_id": selectedChannel
        }

        const messageString = JSON.stringify(body);
        if (socket) {
            socket.send(messageString);
            console.log("SEND TO SOCKET: ", messageString)
        }


        // Add message to backend
        AddMessage(body).then(data => {
            // Add message to UI
            setMessages(prev => [...prev, body]);
        }
        ).catch(error => console.log(error));
    }

    if (socket) socket.onmessage = async function (event) {
        const messageString = await event.data.text();
        const messageObject = JSON.parse(messageString);
        // Add message to UI only if the channel equals that of the chat window
        if (messageObject.channel === selectedChannel)
            setMessages(prev => [...prev, messageObject]);
    };

    if (socket) socket.onerror = function (error) {
        console.error('WebSocket error:', error);
    };





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

    if (!selectedChannel) return noChannelSelectedChatWindow()

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
                <input type="text" id="message-input" placeholder="Type your message..." value={message} onChange={e => setMessage(e.target.value)}></input>
                <button id="send-button" onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}