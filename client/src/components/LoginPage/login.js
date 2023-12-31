import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { Link } from 'react-router-dom';
import "./login.css";
const { rootURL } = require('../../utils/utils');

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { handleLogin } = props;

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleShowPassword = () => { // added function
    setShowPassword(!showPassword);
  };

  const handleSubmit = useCallback (async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post(`${rootURL}:3000/login`, `name=${username}&password=${password}`);
      handleLogin(response);
    } catch (err) {
      if (err.response.data.error === 'Missing username and password') {
        setErrorMessage('Missing username and password');
      } else {
        setErrorMessage(err.response.data.error || err.message);
      }
      console.log('error', err.message);
    }
  }, [username, password, handleLogin]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        handleSubmit(event);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    }
  }, [handleSubmit]);

  return (
    <div className="login-container">
      <h1 className="heading-text">Penn<span className="buzz-text">Buzz</span></h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form className="login-form" onSubmit={handleSubmit}>
        <p className="sign-text">Sign In</p>
        <p className="registration-text">
          Or <Link to="/register" className="sign-up-text">Sign Up</Link> to make your own account
        </p>
        <div>
          <label className="inputs-text" htmlFor="username" id="Usernametitle">Username</label>
          <input type="text" className="login-inputs" value={username} id="username" onChange={handleUsernameChange} />
        </div>
        <div>
          <label className="inputs-text" htmlFor="password" id="Passwordtitle">Password</label>
          <input type="password" className="login-inputs" value={password} id="password" onChange={handlePasswordChange} />
        </div>
        <button type="submit" className="login-button">Sign In</button>
      </form>
    </div>
  );
}

export default Login;