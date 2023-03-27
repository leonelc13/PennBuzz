import React, { useEffect, useState } from 'react';
import './style.css';
import Quiz from './Quiz';
import ButtonGroup from './ButtonGroup';
import axios from 'axios';
/**
 * React Component for Header displayed to a logged in user
 **/


function ProfilePage(props) {

    // Initialize state    
    const [profile, setProfile] = useState({});
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        // Fetch profile data
        axios.get(`http://localhost:3000/profile`,
            {
                params: {
                    name: "johnwick"
                }
            })
            .then(response => {
                setProfile(response.data[0]);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, [props.user]);

    useEffect(() => {
        // Fetch quizzes data
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
        <div className='profile-page-container'>
            <div className='profile-section'>
                <div className="profile-image">
                    <img src={profile.profile_img} alt="profile pic" />
                    <p>{profile.name}</p>
                </div>
                <div className="profile-biography">
                    <p>{profile.biography}</p>
                </div>
            </div>
            <ButtonGroup />
            <div className="pp-quiz-container">
                {
                    quizzes.map(quiz => (
                        <Quiz {...quiz} />
                    ))
                }
            </div>
        </div>
    );
}

export default ProfilePage;