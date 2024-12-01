import React, { useState } from "react";

import CreateAccount from "./screens/createAcc"
import Dashboard from "./screens/dashboard";
import Login from "./screens/login";
import CreateEvent from "./screens/createEvent";


function App() {
  const [currentScreen, setCurrentScreen] = useState("login");

  const handleLoginSuccess = () => {
    setCurrentScreen("createAccount");
  };

  const handleCreateSuccess = () => {
    setCurrentScreen("dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
      <div className="w-full max-w-md">
        {currentScreen === "login" && (
          <>
            <Login onLoginSuccess={handleLoginSuccess} />
            <button
              onClick={() => setCurrentScreen("createAccount")}
              className="mt-4 text-white underline text-center w-full"
            >
              Don't have an account? Create one
            </button>
          </>
        )}

        {currentScreen === "createAccount" && (
          <>
            <CreateAccount onCreateSuccess={handleCreateSuccess} />
            <button
              onClick={() => setCurrentScreen("login")}
              className="mt-4 text-white underline text-center w-full"
            >
              Already have an account? Log in
            </button>
          </>
        )}

        {currentScreen === "dashboard" && <Dashboard />}
      </div>
    </div>
  );
}

export default App;

