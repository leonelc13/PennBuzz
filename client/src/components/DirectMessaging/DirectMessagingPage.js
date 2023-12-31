import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Channel from './Channel';
import ChatWindow from './ChatWindow';
import './style.css';
import { getChannels } from '../../api/DirectMessagesAPI';
const { socketURL, socketPort } = require('../../utils/utils.js');


/**
 * DIRECT MESSAGING PAGE 
 **/

function DirectMessagingPage(props) {

    // Initialize the state
    const [selectedChannel, setSelectedChannel] = useState("");
    const [channels, setChannels] = useState({});
    const [socket, setSocket] = useState(null);


    useEffect(() => {
        getChannels(props.user)
            .then(data => {
                const channels_object = {};
                data.forEach(channel => {
                    channels_object[channel.channel_id] = channel;
                });
                setChannels(channels_object);
            })
            .catch(error => {
                console.error('Error fetching channels data: ', error);
            });
    }, [props.user]);

    // Create Socket Connection
    useEffect(() => {
        const newSocket = new WebSocket(`${socketURL}:${socketPort}`);

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
                    Object.values(channels).map(channel => {

                        return (
                            <Channel
                                key={channel.channel_id}
                                id={channel.channel_id}
                                is_selected_channel={channel.channel_id === selectedChannel}
                                name={channel.name}
                                image_src={channel.img}
                                handleClick={handleChannelSelection}
                            />
                        )
                    })
                }
            </div>

            {selectedChannel ? existingChatHeader() : (<span></span>)}
            <ChatWindow socket={socket} selectedChannel={selectedChannel} user={props.user} />
        </div >
    );
}


export default DirectMessagingPage