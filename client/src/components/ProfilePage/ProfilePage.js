import React, { useEffect, useState } from 'react';
import './style.css';
import Quiz from './Quiz';
import ButtonGroup from './ButtonGroup';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getAllQuizzes, getCreatedQuizzes, getFavoriteQuizzes, getProfileByUsername } from '../../api/ProfilePageAPI';

function ProfilePage(props) {
    const username = useParams().username;
    const [profile, setProfile] = useState({});
    const [quizzes, setQuizzes] = useState([]);
    const [selectedButton, setSelectedButton] = useState('Created');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = await getProfileByUsername(username);
                setProfile(profileData);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchProfile();
    }, [username]);

    useEffect(() => {
        // Fetch quizzes data based on selected button
        const getQuizzes = async () => {
            try {
                let quizData = [];
                switch (selectedButton) {
                    case 'Created':
                        quizData = await getCreatedQuizzes(username);
                        break;
                    case 'Recent':
                        quizData = await getAllQuizzes();
                        break;
                    case 'Favorites':
                        quizData = await getFavoriteQuizzes(username);
                        break;
                    default:
                        console.error('Unknown button selected');
                }
                setQuizzes([]);
                setQuizzes(quizData);
            } catch (error) {
                console.error('Error fetching quizzes in profile page: ', error);
            }
        };

        getQuizzes();
    }, [selectedButton, profile]);

    const handleButtonChange = (button) => {
        setSelectedButton(button);
    };

    return (
        <div className='profile-page-container'>
            <div className='profile-section'>
                <div className="profile-image">
                    <img src={profile.profile_img} alt="profile pic" />
                <p>{profile.username}</p>
                </div>
                <div className="profile-biography">
                    <p>{profile.biography}</p>
                </div>
            </div>
            <ButtonGroup onChange={handleButtonChange} />
            <div className="pp-quiz-container">
                {quizzes.length > 0 ? quizzes.map(quiz => <Quiz {...quiz} />) : <p>No quizzes found</p>}
            </div>
        </div>
    ); 
}

export default ProfilePage;