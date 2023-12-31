import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import "./register.css";
const { rootURL } = require('../../utils/utils');

function Register(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { handleLogin } = props;

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = useCallback (async (event) => {
    event.preventDefault();
    try {
      console.log(username);
      console.log(password);
      const response = await axios.post(`${rootURL}:3000/register`, `name=${username}&password=${password}`)
      handleLogin(response);
    } catch (err) {
      setErrorMessage(err.response.data.error);
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
    <div className='register-container'>
      <h1 className='header-text'>Penn<span className="Buzz">Buzz</span></h1>
      {errorMessage && <p className='error-text'>{errorMessage}</p>}
      <form className="register-form" onSubmit={handleSubmit}>
        <p className="title-text">Sign Up</p>
        <p className="login-text">
          Or <Link to="/login" className='url-text'>Sign In</Link> to your account
        </p>
        <div>
          <label className='titles-text' htmlFor="username" id='user2'>Pick a Username</label>
          <input type="text" value={username} id="username" className="input-edits" onChange={handleUsernameChange} />
        </div>
        <div>
          <label className='titles-text' htmlFor='password' id='password2'>Pick a Password</label>
          <input type="password" value={password} id="password" className="input-edits" onChange={handlePasswordChange} />
        </div>
        <button type="submit" className='btn-edits'>Sign Up</button>
      </form>
    </div>
  );
}

export default Register;