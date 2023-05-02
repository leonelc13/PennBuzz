import React, { useEffect, useState, useRef } from 'react';

import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import MainFeed from './components/MainFeed/MainFeed';
import DirectMessagingPage from './components/DirectMessaging/DirectMessagingPage';
import Header from './components/Header/Header';
import ProfilePage from './components/ProfilePage/ProfilePage'
import CreateQuiz from './components/CreateQuiz/CreateQuiz'
import CreateTest from './components/CreateQuiz/CreateTest'
import Leaderboard from './components/Leaderboard/Leaderboard'
import Login from './components/LoginPage/login'
import Register from './components/RegisterPage/register'
import QuizInfo from './components/QuizInfo/QuizInfo'
import './style/index.css';



function App() {

    const [authenticated, setAuthenticated] = useState(sessionStorage.getItem('app-token') !== null);
    const username = useRef(null);
    const userpic = useRef(null);

    const handleLogout = () => {
        sessionStorage.removeItem('app-token');
        window.location.reload(true);
    };

    const handleLogin = (response) => {
        const { apptoken, username: usernameValue, profile_picture } = response.data
        username.current = usernameValue;
        userpic.current = profile_picture;
        if (apptoken) {
            sessionStorage.setItem('app-token', apptoken);
            setAuthenticated(true);
        }

    }

    // Needs to be modified upons integration with Login/Registration
    let props = {
        user_profile_picture: userpic.current,
        user: username.current,
        handleLogout: handleLogout
    };

    if (authenticated) console.log("META PROPS ", props);

    return (
        <Router>
            {authenticated ? (
                <>
                    <Header {...props} />
                    <Routes>
                        <Route exact path='/create_quiz' element={<CreateQuiz {...props} />} />
                        <Route exact path="/create_quiz/test" element={<CreateTest {...props} />} />
                        <Route exact path='/chat' element={<DirectMessagingPage {...props} />} />
                        <Route exact path='/' element={<MainFeed {...props} />} />
                        <Route exact path='/profile/:username' element={<ProfilePage {...props} />} />
                        <Route exact path='/leaderboard' element={<Leaderboard {...props} />} />
                        <Route path='/quiz/:id' element={<QuizInfo {...props} />} />
                        <Route exact path='*' element={<Navigate to='/' />} />
                    </Routes>
                </>
            ) : (
                <>
                    <Routes>
                        <Route exact path='/login' element={<Login handleLogin={handleLogin} />} />
                        <Route exact path='/register' element={<Register handleLogin={handleLogin} />} />
                        <Route exact path='*' element={<Navigate to='/login' />} />
                    </Routes>
                </>
            )}
        </Router>
    );
}

export default App