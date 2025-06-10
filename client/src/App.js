import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [health, setHealth] = useState({});

  useEffect(() => {
    // Fetch API message
    fetch('/api')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(console.error);

    // Fetch health status
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setHealth(data))
      .catch(console.error);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Fleetly</h1>
        <p>{message || 'Loading...'}</p>
        <div className="health-status">
          <h3>System Status</h3>
          <p>API: {health.status || 'checking...'}</p>
          <p>Database: {health.database || 'checking...'}</p>
        </div>
      </header>
    </div>
  );
}

export default App;