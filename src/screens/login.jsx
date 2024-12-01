import React, { useState, useEffect } from "react";
import { AlertCircle } from 'lucide-react';

export default function Login({ onLoginSuccess }) {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!window.getOfflineSigner) {
      setError("Keplr wallet is not installed. Please install it to continue.");
    }
  }, []);

  const loginWithKeplr = async () => {
    setIsLoggingIn(true);
    setError(null);

    if (window.getOfflineSigner) {
      try {
        const chainId = "cosmoshub-4";  // Use the appropriate Agoric chain ID
        const offlineSigner = window.getOfflineSigner(chainId);
        const accounts = await offlineSigner.getAccounts();

        console.log("Logged in with Keplr", accounts);
        alert("You have connected with Keplr wallet!");
        onLoginSuccess();
      } catch (err) {
        setError(`Failed to login: ${err.message || err}`);
        console.error("Login failed", err);
      }
    } else {
      setError("Keplr wallet is not available. Please install it to continue.");
    }

    setIsLoggingIn(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-8">
        <div className="space-y-1 text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Welcome to Fair Pass</h1>
          <p className="text-gray-500">Login with your wallet to get started</p>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <button
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            onClick={loginWithKeplr}
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Logging in..." : "Login with Keplr"}
          </button>
          {error && (
            <div className="flex items-center space-x-2 text-red-500">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

