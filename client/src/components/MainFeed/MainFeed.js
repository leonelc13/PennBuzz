import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import Quiz from './Quiz';
import { Link } from 'react-router-dom';
/**
 * React Component for Header displayed to a logged in user
 **/



function MainFeed(props) {
    console.log("MAIN FEED " + props.user);
    // Initialize state    
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/getfeed',
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
            <div className='create-quiz-container'>

                <Link to="/create_quiz">
                    <button className='create-quiz-button'>
                        Create Quiz
                    </button>
                </Link>

            </div>
            {
                quizzes.map(quiz => (
                    <Quiz {...quiz} username={props.user} id={quiz.id} />
                ))
            }
        </div >
    );
}

export default MainFeed