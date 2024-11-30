import React, { useState } from 'react'
import Login from './screens/login'
import CreateAccount from './screens/createAcc'
import './App.css'

function App() {
  const [currentScreen, setCurrentScreen] = useState('login')

  return (
    <div className="App">
      {currentScreen === 'login' ? (
        <>
          <Login />
          <button 
            onClick={() => setCurrentScreen('createAccount')}
            className="mt-4 text-white underline"
          >
            Don't have an account? Create one
          </button>
        </>
      ) : (
        <>
          <CreateAccount />
          <button 
            onClick={() => setCurrentScreen('login')}
            className="mt-4 text-white underline"
          >
            Already have an account? Log in
          </button>
        </>
      )}
    </div>
  )
}

export default App

