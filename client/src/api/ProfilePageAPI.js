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

export async function getAllQuizzes() {
    try {
        const token = localStorage.getItem('token') ?? '';
        let response = await axios.get(`${rootURL}:${serverPort}/profileQuizzes`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error getting quizzes in API: ', error);
        return error;
    }
}

export async function getCreatedQuizzes(name) {
    try {
        const token = localStorage.getItem('token') ?? '';
        let response = await axios.get(`${rootURL}:${serverPort}/profileCreatedQuizzes`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: { author_name: name }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error getting quizzes in API: ', error);
        return error;
    }
}

export async function getFavoriteQuizzes(name) {
    try {
        const token = localStorage.getItem('token') ?? '';
        let response = await axios.get(`${rootURL}:${serverPort}/profileFavoriteQuizzes`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: { upvotes: { $in: [name] } }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error getting quizzes in API: ', error);
        return error;
    }
}


