import React, { useState } from 'react';

import { Routes, Route, BrowserRouter as Router, Navigate} from 'react-router-dom';
import MainFeed from './components/MainFeed/MainFeed';
import DirectMessagingPage from './components/DirectMessaging/DirectMessagingPage';
import Header from './components/header/Header';
import ProfilePage from './components/ProfilePage/ProfilePage'
import Login from './components/LoginPage/login'
import Register from './components/RegisterPage/register'
import './style/index.css';



function App() {
    
    const [authenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState("");

    const handleLogout = () => {
        setAuthenticated(false);
    };
    
    const handleLogin = (username) => {
        setUsername(username);
        setAuthenticated(true);
    }

    // Needs to be modified upons integration with Login/Registration
    let props = {
        user_profile_picture: "https://drive.google.com/uc?id=1munwKbM6dQSWE1ruZ_41O79ZeliPXYVe&export=download",
        user: username,
        handleLogout: handleLogout
    };


    return (
        <Router>
            {authenticated ? (
                <>
                <Header {...props} />
                <Routes>
                    <Route exact path='/chat' element={<DirectMessagingPage {...props} />} />
                    <Route exact path='/' element={<MainFeed {...props} />} />
                    <Route exact path='/profile' element={<ProfilePage {...props} />} />
                </Routes>
                </>
            ) : (
                <>
                <Routes>
                    <Route exact path='/' element={<Navigate to='/login' />} />
                    <Route exact path='/login' element={<Login handleLogin={handleLogin} />} />
                    <Route exact path='/register' element={<Register handleLogin={handleLogin}/>} />
                </Routes>
                </>
            )}
        </Router>
    );
}

export default App