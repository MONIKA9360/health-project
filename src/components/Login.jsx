import React, { useState } from 'react'
import { Heart } from 'lucide-react'
import { login } from '../services/api'

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await login(username, password)
    
    if (result.success) {
      onLogin()
    } else {
      setError('Invalid credentials! Only Moni & Surya can access ❤️💙')
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 relative overflow-hidden">
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute heart-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${20 + Math.random() * 30}px`,
              opacity: 0.3,
            }}
          >
            {i % 2 === 0 ? '❤️' : '💙'}
          </div>
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-2 mb-4">
              <Heart className="text-red-500 heart-pulse" size={40} fill="currentColor" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
                SUMO
              </h1>
              <Heart className="text-blue-500 heart-pulse" size={40} fill="currentColor" />
            </div>
            <p className="text-gray-600 text-lg">Daily life tracker for Moni & Surya</p>
            <div className="mt-2 text-3xl">❤️💙</div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition"
                placeholder="Enter password"
              />
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-500 to-blue-500 text-white font-bold py-3 rounded-lg hover:from-red-600 hover:to-blue-600 transition transform hover:scale-105 disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login ❤️💙'}
            </button>
          </form>

          <div className="mt-6 text-center text-gray-500 text-sm">
            Made with love for Moni & Surya 💕
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
