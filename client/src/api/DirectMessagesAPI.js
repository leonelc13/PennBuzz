import axios from 'axios';
const { rootURL, serverPort } = require('../utils/utils.js');

export async function AddMessage(messageJSON) {
    try {
        const token = localStorage.getItem('token') ?? '';
        let response = await axios.post(
            `${rootURL}:${serverPort}/addmessage`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                ...messageJSON
            }

        );
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function getChannels(user) {
    try {
        const token = localStorage.getItem('token') ?? '';
        let response = await axios.get(`${rootURL}:${serverPort}/channels`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: { user: user }
            }
        );
        return response.data;
    } catch (error) {
        console.log("Error getting channels: ", error);
        return error;
    }
}

export async function getMessages(user, channel) {

    try {
        let response = await axios.get(`http://localhost:3000/messages?channel=${channel}`, { params: { user: user } })
        return response.data;
    } catch (error) {
        return error;
    }
}