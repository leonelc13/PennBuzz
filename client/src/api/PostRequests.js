import axios from 'axios';
const { rootURL, serverPort } = require('../utils/utils.js');

export async function AddMessage(messageJSON) {
    try {
        const token = localStorage.getItem('token') ?? '';
        let response = await axios.post(
            `${rootURL}:${serverPort}/addcomment`,
            messageJSON,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        return response.data;
    } catch (error) {
        return error;
    }
}