import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import Quiz from './Quiz';
/**
 * React Component for Header displayed to a logged in user
 **/



function MainFeed(props) {

    // Initialize state    
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/quizzes',
            {
                params: {
                    user: props.user
                }
            })
            .then(response => {
                setQuizzes(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });

    }, [props.user]);

    return (
        <div className="main-feed-container">
            {
                quizzes.map(quiz => (
                    <Quiz {...quiz} />
                ))
            }
        </div >
    );
}

export default MainFeed