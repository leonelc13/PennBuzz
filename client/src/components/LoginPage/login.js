import React, { useState } from "react";
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
      const response = await fetch("http://localhost:3001/users?username=" + username + "&password=" + password);
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
    <div>
      <h1>Penn<a className="Buzz">Buzz</a></h1>
      {errorMessage && <p className="error-text">{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <p className="title-text">Sign In</p>
        <p className="registration-text">
          Or <a href="/register">Sign up</a> to make your own account
        </p>
        <div>
          <label className="titles-text" htmlFor="username">Username</label>
          <input type="text" value={username} id="username" onChange={handleUsernameChange} />
        </div>
        <div>
          <label className="titles-text" htmlFor="password">Password</label>
          <input type="password" value={password} id="password" onChange={handlePasswordChange} />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default Login;
