import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./login.css";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username && !password) {
      setErrorMessage('Missing username and password');
      return;
    }

    if (!username) {
      setErrorMessage('Missing username');
      return;
    }
  
    if (!password) {
      setErrorMessage('Missing password');
      return;
    }
    
    try {
      const response = await fetch("http://localhost:3000/users?username=" + username + "&password=" + password);
      const data = await response.json();
      if (data.length === 0 || data[0].password !== password || data[0].username !== username) {
        setErrorMessage("Sorry, we don't recognize that combination of username and password. Please try again");
        return;
      }
      props.handleLogin(username);
    } catch (error) {
      console.error(error);
    }
  };

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
          <label className="inputs-text" htmlFor="username">Username</label>
          <input type="text" className="login-inputs" value={username} id="username" onChange={handleUsernameChange} />
        </div>
        <div>
          <label className="inputs-text" htmlFor="password">Password</label>
          <input type="password" className="login-inputs" value={password} id="password" onChange={handlePasswordChange} />
        </div>
        <button type="submit" className="login-button">Sign In</button>
      </form>
    </div>
  );
}

export default Login;
