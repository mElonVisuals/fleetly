import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [health, setHealth] = useState(null);

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setHealth(data))
      .catch(err => setHealth({ error: err.message }));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Fleetly</h1>
        {health ? (
          <div>
            <p>API Status: {health.status || 'unknown'}</p>
            <p>Database: {health.database || 'unknown'}</p>
            {health.error && <p>Error: {health.error}</p>}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </header>
    </div>
  );
}

export default App;