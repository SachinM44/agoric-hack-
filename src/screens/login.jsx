import React, { useState } from "react";
import { AlertCircle } from "lucide-react";
import metamaskLogo from "../assets/metamask.png";

export default function Login() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState(null);

  const loginWithMetaMask = async () => {
    setIsLoggingIn(true);
    setError(null);

    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log("Logged in with MetaMask");
      } catch (err) {
        setError("Failed to login. Please try again.");
        console.error(err);
      }
    } else {
      setError("MetaMask is not installed. Please install it to continue.");
    }

    setIsLoggingIn(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6">
        <div className="space-y-1 text-center mb-6">
          <h1 className="text-2xl font-bold">Welcome to Fair Pass</h1>
          <p className="text-gray-500">
            Login with your wallet to get started
          </p>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <img
            src={metamaskLogo}
            alt="MetaMask Logo"
            className="w-24 h-24"
          />
          <button
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            onClick={loginWithMetaMask}
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Logging in..." : "Login with MetaMask"}
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
