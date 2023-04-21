import axios from 'axios';
const { rootURL, serverPort } = require('../utils/utils.js');

export async function getProfileByUsername(name) {
    try {
        const token = localStorage.getItem('token') ?? '';
        let response = await axios.get(`${rootURL}:${serverPort}/profile`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: { username: name }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error getting profile data: ', error);
        return error;
    }
}


