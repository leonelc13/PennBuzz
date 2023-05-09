import axios from 'axios';
const { rootURL, serverPort } = require('../utils/utils.js');

export async function getQuiz(quizId) {
    try {
        const token = localStorage.getItem('token') ?? '';
        let response = await axios.get(
            `${rootURL}:${serverPort}/quiz`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {id: quizId}
            });
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function addComment(quizId, username, comment, timestamp) {
    try {
        const token = localStorage.getItem('token') ?? '';
        let response = await axios.put(
            `${rootURL}:${serverPort}/addcomment`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                quizId: quizId,
                user: username,
                content: comment,
                timestamp: timestamp
            });
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function addUpvote(quizId, username) {
    try {
        const token = localStorage.getItem('token') ?? '';
        let response = await axios.put(
            `${rootURL}:${serverPort}/addupvote`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                quizId: quizId,
                user: username
            });
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function deleteUpvote(quizId, username) {
    try {
        const token = localStorage.getItem('token') ?? '';
        let response = await axios.put(
            `${rootURL}:${serverPort}/deleteupvote`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                quizId: quizId,
                user: username
            });
        return response.data;
    } catch (error) {
        return error;
    }
}


export async function addDownvote(quizId, username) {
    try {
        const token = localStorage.getItem('token') ?? '';
        let response = await axios.put(
            `${rootURL}:${serverPort}/adddownvote`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                quizId: quizId,
                user: username
            });
        return response.data;
    } catch (error) {
        return error;
    }
}


export async function deleteDownvote(quizId, username) {
    try {
        const token = localStorage.getItem('token') ?? '';
        let response = await axios.put(
            `${rootURL}:${serverPort}/deletedownvote`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                quizId: quizId,
                user: username
            });
        return response.data;
    } catch (error) {
        return error;
    }
}

