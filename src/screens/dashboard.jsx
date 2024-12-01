import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadWalletData = async () => {
      if (window.getOfflineSigner) {
        try {
          const chainId = "cosmoshub-4"; // Update to your chain ID
          const offlineSigner = window.getOfflineSigner(chainId);
          const accounts = await offlineSigner.getAccounts();

          setWalletAddress(accounts[0].address);

          // Fetch balance or other relevant data here
          const fetchedBalance = await fetchBalance(accounts[0].address);
          setBalance(fetchedBalance);
        } catch (err) {
          console.error("Error fetching wallet data:", err);
          alert("Error fetching wallet data.");
          navigate("/login"); // Redirect to login if wallet is not connected
        }
      } else {
        alert("Keplr is not connected. Please connect your Keplr wallet.");
        navigate("/login"); // Redirect to login if wallet is not connected
      }
    };

    loadWalletData();
  }, [navigate]);

  const fetchBalance = async (address) => {
    // Example function to fetch balance from the blockchain via Keplr
    // You need to implement fetching balance logic for Agoric or other chains
    return "1000"; // Return a mock balance for now
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="bg-white rounded-xl shadow-md overflow-hidden w-full max-w-md mb-6">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Welcome to Your Dashboard
          </h2>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-semibold">Wallet Address:</span>
              <span className="ml-2 text-sm break-all">{walletAddress}</span>
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Balance:</span>
              <span className="ml-2">{balance}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          onClick={() => navigate("/CreateEvent")}
        >
          Host Event
        </button>
        <button
          className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition"
        >
          Buy Ticket
        </button>
      </div>
    </div>
  );
}
