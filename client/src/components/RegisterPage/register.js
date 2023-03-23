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

  const handleSubmit = (event) => {
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

  
   // implemented for faked backend
   /* const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });*/
  
    //const data = await response.json();
  
   /* if (data.error) {
      setErrorMessage(data.error);
      return;
    }*/
  
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
          <label className='titles-text'>Pick a Username</label>
          <input type="text" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label className='titles-text'>Pick a Password</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Register;
