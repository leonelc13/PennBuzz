import axios from 'axios';
const { rootURL, serverPort } = require('../utils/utils.js');

export async function addQuiz(quiz) {
    try {
        const token = localStorage.getItem('token') ?? '';
        let response = await axios.post(
            `${rootURL}:${serverPort}/create_quiz/test`,
            quiz,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
        return "Failed in API: " + error;
    }
}
