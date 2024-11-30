import React, { useState } from 'react'
import { AlertCircle } from 'lucide-react'

export default function CreateAccount() {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    password: ''
  })
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const createAccountWithMetaMask = async (e) => {
    e.preventDefault()
    setIsCreating(true)
    setError(null)

    if (typeof window.ethereum !== 'undefined') {
      try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' })

        // Here you would typically send the form data to your backend
        // along with the MetaMask address for account creation
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        const address = accounts[0]

        console.log('Account created with MetaMask address:', address)
        console.log('Form data:', formData)

        // TODO: Send formData and address to your backend for account creation

        // Reset form after successful creation
        setFormData({ name: '', phoneNumber: '', password: '' })
      } catch (err) {
        setError('Failed to create account. Please try again.')
        console.error(err)
      }
    } else {
      setError('MetaMask is not installed. Please install it to continue.')
    }

    setIsCreating(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6">
        <div className="space-y-1 text-center mb-6">
          <h1 className="text-2xl font-bold">Create Your Account</h1>
          <p className="text-gray-500">
            Sign up with MetaMask and provide your details
          </p>
        </div>
        <form onSubmit={createAccountWithMetaMask} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                         focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                         focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                         focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <button 
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isCreating}
          >
            {isCreating ? 'Creating Account...' : 'Create Account with MetaMask'}
          </button>
        </form>
        {error && (
          <div className="mt-4 flex items-center space-x-2 text-red-500">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}
        <p className="mt-6 text-center text-sm text-gray-500">
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}
