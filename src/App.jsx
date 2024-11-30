import React, { useState } from 'react';
import Login from './screens/login';
import CreateAccount from './screens/createAcc';
import Dashboard from './screens/dashboard';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('login');

  // Handle successful login and navigate to createAccount screen
  const handleLoginSuccess = () => {
    setCurrentScreen('createAccount');
  };

  // Handle successful account creation and navigate to dashboard
  const handleCreateSuccess = () => {
    setCurrentScreen('dashboard');
  };

  return (
    <div className="App">
      {currentScreen === 'login' && (
        <>
          <Login onLoginSuccess={handleLoginSuccess} />
          <button 
            onClick={() => setCurrentScreen('createAccount')}
            className="mt-4 text-white underline"
          >
            Don't have an account? Create one
          </button>
        </>
      )}
      
      {currentScreen === 'createAccount' && (
        <>
          <CreateAccount onCreateSuccess={handleCreateSuccess} />
          <button 
            onClick={() => setCurrentScreen('login')}
            className="mt-4 text-white underline"
          >
            Already have an account? Log in
          </button>
        </>
      )}

      {currentScreen === 'dashboard' && <Dashboard />}
    </div>
  );
}

export default App;

