import React from 'react';
import { createRoot } from 'react-dom/client';
import './css/style.css';
// Import necessary components
import directMessagingPage from './../client/src/components/direct_messaging';

const container = document.getElementById('root');
const root = createRoot(container);
// Directly render components for UI testing 
root.render(<directMessagingPage />);