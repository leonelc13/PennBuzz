import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import DirectMessagingPage from './components/DirectMessaging/DirectMessagingPage';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

// For UI Testing, insert the parent component of your feature here
root.render(
  <React.StrictMode>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
