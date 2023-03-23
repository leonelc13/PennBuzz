import React, { useState } from 'react';
import "./register.css";

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username && !password) {
      setErrorMessage('Please enter both a username and password');
      return;
    }

    if (!username) {
      setErrorMessage('Please enter a username');
      return;
    }
  
    if (!password) {
      setErrorMessage('Please enter a password');
      return;
    }

  
    try {
      const response = await fetch('http://localhost:3001/users');
      const data = await response.json();

      if (data.find((user) => user.username === username)) {
        setErrorMessage('Username is already taken');
        return;
      }

      const postResponse = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
  
      const postData = await postResponse.json();
  
      if (postData.error) {
        setErrorMessage(postData.error);
        return;
      }
  
      // handle successful registration
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred while registering. Please try again later.');
    }
  
  };

  return (
    <div>
      <h1>Penn<a className="Buzz">Buzz</a></h1>
      {errorMessage && <p className='error-text'>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <p className="title-text">Sign Up To PennBuzz</p>
        <p className="login-text">
          Or <a href="/login">sign in</a> to your account
        </p>
        <div>
          <label className='titles-text' htmlFor="username">Pick a Username</label>
          <input type="text" value={username} id="username" onChange={handleUsernameChange} />
        </div>
        <div>
          <label className='titles-text' htmlFor='password'>Pick a Password</label>
          <input type="password" value={password} id="password" onChange={handlePasswordChange} />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Register;
