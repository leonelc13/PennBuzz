import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import MainFeed from './components/MainFeed/MainFeed';
import DirectMessagingPage from './components/DirectMessaging/DirectMessagingPage';
import Header from './components/header/Header';
import ProfilePage from './components/ProfilePage/ProfilePage'
import './style/index.css';


// Needs to be modified upons integration with Login/Registration
let props = {
    user_profile_picture: "https://drive.google.com/uc?id=1munwKbM6dQSWE1ruZ_41O79ZeliPXYVe&export=download",
    user: "johndoe"
};

function App() {

    return (
        <Router>
            <div>
                <Header {...props} />
                <Routes>
                    <Route exact path="/chat" element={<DirectMessagingPage {...props} />} />
                    <Route exact path="/" element={<MainFeed {...props} />} />
                    <Route exact path="/profile" element={<ProfilePage {...props} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App