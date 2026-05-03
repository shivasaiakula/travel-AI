import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, LogIn, ArrowRight, Github } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await signIn({ email, password })
    if (error) setError(error.message)
    else navigate('/dashboard')
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-10 w-full max-w-md neon-glow-purple"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold font-space mb-2">Welcome Back</h2>
          <p className="text-white/40">Log in to access your AI itineraries.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs text-white/40 uppercase font-bold">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
              <input 
                type="email" 
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-primary transition-all"
                placeholder="traveler@india.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-white/40 uppercase font-bold">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
              <input 
                type="password" 
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-primary transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary w-full py-4 text-lg"
          >
            {loading ? 'Authenticating...' : <><LogIn size={20} /> Sign In</>}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-white/5">
          <button className="w-full py-3 rounded-xl border border-white/10 flex items-center justify-center gap-3 hover:bg-white/5 transition-all text-sm font-bold">
            <Github size={20} /> Continue with GitHub
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-white/40">
          Don't have an account? <Link to="/register" className="text-accent hover:underline">Register here</Link>
        </p>
      </motion.div>
    </div>
  )
}

export default Login
