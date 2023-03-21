import React, { useState } from "react";
import "./login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      /**const response = await fetch("http://localhost:3001/users?username=" + username + "&password=" + password);
      const data = await response.json(); */
      if (data.length === 0 || users[0].password !== password) {
        setErrorMessage("Sorry, we don't recognize that combination of username and password. Please try again");
        return;
      }
      // redirect to the homepage
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>PennBuzz</h1>
      {errorMessage && <p>{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <p className="title-text">Sign In</p>
        <p className="registration-text">
          Or <a href="/register">Sign up</a> to make your own account
        </p>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default Login;