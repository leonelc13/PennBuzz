import React, { useEffect, useState } from 'react';
import './style.css';
import Quiz from './Quiz';
import ButtonGroup from './ButtonGroup';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getProfileByUsername } from '../../api/ProfilePageAPI';

function ProfilePage(props) {
    const username = useParams().username;
    const [profile, setProfile] = useState({});
    const [quizzes, setQuizzes] = useState([]);

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
    

   /* useEffect(() => {
        // Fetch quizzes data
        axios.get('/api/quizzes', {
                params: {
                    user: props.user
                }
            })
            .then(response => {
                setQuizzes(response.data ? response.data : []);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);*/

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
            <ButtonGroup />
            <div className="pp-quiz-container">
                {quizzes.map(quiz => <Quiz {...quiz} />)}
            </div>
        </div>
    );
}

export default ProfilePage;