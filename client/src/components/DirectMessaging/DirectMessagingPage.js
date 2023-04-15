import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Channel from './Channel';
import ChatWindow from './ChatWindow';
import './style.css';
const { socketURL, serverPort } = require('../../utils/utils.js');


/**
 * DIRECT MESSAGING PAGE 
 **/

function DirectMessagingPage(props) {

    // Initialize the state
    const [selectedChannel, setSelectedChannel] = useState("");
    const [channels, setChannels] = useState({});
    const [socket, setSocket] = useState(null);


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

    // Create Socket Connection
    useEffect(() => {
        const newSocket = new WebSocket(`${socketURL}:${serverPort}`);

        newSocket.onopen = () => {
            console.log('WebSocket connection opened');
            setSocket(newSocket);
        };

        newSocket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            newSocket.close();
            setSocket(null);
        };
    }, []);


    /*
        Handles Channel selection by 
    **/
    function handleChannelSelection(new_selected_channel) {
        setSelectedChannel(new_selected_channel);
        console.log("new selected user: " + selectedChannel + " " + new_selected_channel);
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
            <ChatWindow socket={socket} selectedChannel={selectedChannel} user={props.user} />\
        </div >
    );
}


export default DirectMessagingPage