import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, MapPin, Calendar, Wallet, Users, Loader2, Sparkles } from 'lucide-react'
import { generateItinerary } from '../lib/gemini'

const AIPlannerForm = ({ onResult, dna }) => {
  const [formData, setFormData] = useState({
    destination: '',
    days: '',
    budget: 'Medium',
    travelers: '1'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const itinerary = await generateItinerary(
        formData.destination,
        formData.days,
        formData.budget,
        formData.travelers,
        dna
      )
      onResult(itinerary)
    } catch (err) {
      console.error('Failed to generate itinerary:', err)
      setError(err.message || 'Failed to connect to the AI Engine. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="glass-card p-8 neon-glow-purple"
    >
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-white/60 text-sm font-medium flex items-center gap-2">
            <MapPin size={14} className="text-accent" /> Where to?
          </label>
          <input 
            type="text" 
            placeholder="e.g. Rajasthan, Kerala, Leh Ladakh" 
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-white"
            value={formData.destination}
            onChange={(e) => setFormData({...formData, destination: e.target.value})}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-white/60 text-sm font-medium flex items-center gap-2">
            <Calendar size={14} className="text-accent" /> For how many days?
          </label>
          <input 
            type="number" 
            placeholder="e.g. 5" 
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-white"
            value={formData.days}
            onChange={(e) => setFormData({...formData, days: e.target.value})}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-white/60 text-sm font-medium flex items-center gap-2">
            <Wallet size={14} className="text-accent" /> Budget
          </label>
          <select 
            className="w-full bg-[#0d0d1a] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-white appearance-none"
            value={formData.budget}
            onChange={(e) => setFormData({...formData, budget: e.target.value})}
          >
            <option value="Economy">Economy (Budget Friendly)</option>
            <option value="Medium">Medium (Balanced)</option>
            <option value="Luxury">Luxury (Premium)</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-white/60 text-sm font-medium flex items-center gap-2">
            <Users size={14} className="text-accent" /> Travelers
          </label>
          <input 
            type="number" 
            placeholder="e.g. 2" 
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-white"
            value={formData.travelers}
            onChange={(e) => setFormData({...formData, travelers: e.target.value})}
            required
          />
        </div>

        <div className="md:col-span-2 pt-4">
          <button 
            type="submit" 
            className="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin relative z-10" /> 
                <span className="relative z-10">Neural Route Optimization...</span>
              </>
            ) : (
              <>
                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> 
                <span className="glitch-text">Generate AI Itinerary</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* AI Processing Modal */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-xl"
          >
            <div className="text-center space-y-8 max-w-md px-6">
              <div className="relative w-32 h-32 mx-auto">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-t-2 border-primary rounded-full"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-4 border-b-2 border-accent rounded-full opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="text-primary animate-pulse" size={40} />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold font-space text-gradient mb-2">Analyzing India Nodes</h3>
                <p className="text-white/40 text-sm animate-pulse">Scanning 45,000+ travel points, hotels, and flight paths for your DNA profile...</p>
              </div>
              <div className="space-y-2">
                {['Synthesizing Route', 'Optimizing Budget', 'Calculating Weather'].map((step, i) => (
                   <motion.div 
                     key={i}
                     initial={{ x: -20, opacity: 0 }}
                     animate={{ x: 0, opacity: 1 }}
                     transition={{ delay: i * 0.5 }}
                     className="flex items-center gap-3 text-xs text-white/60 font-mono"
                   >
                     <div className="w-1 h-1 bg-green-500 rounded-full" /> {step}... [OK]
                   </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default AIPlannerForm
