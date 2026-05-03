import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Train, Search, ArrowRightLeft, Clock, Calendar, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { searchTrains } from '../services/railwayService'

const RailwaySearch = () => {
  const [search, setSearch] = useState({ from: '', to: '', date: '' })
  const [trains, setTrains] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const results = await searchTrains(search.from, search.to, search.date)
      setTrains(results)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-12">
      {/* Search Bar */}
      <div className="glass-card p-8 neon-glow-cyan">
        <form onSubmit={handleSearch} className="grid md:grid-cols-4 gap-6 items-end">
          <div className="space-y-2">
            <label className="text-xs text-white/40 uppercase font-bold">From Station</label>
            <div className="relative">
              <Train className="absolute left-4 top-1/2 -translate-y-1/2 text-accent" size={18} />
              <input 
                type="text" 
                placeholder="e.g. New Delhi" 
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:border-accent transition-all outline-none"
                value={search.from}
                onChange={(e) => setSearch({...search, from: e.target.value})}
              />
            </div>
          </div>

          <div className="flex justify-center md:pb-3">
            <button type="button" className="p-2 rounded-full bg-white/5 border border-white/10 hover:border-accent text-accent transition-all">
              <ArrowRightLeft size={20} />
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-white/40 uppercase font-bold">To Station</label>
            <div className="relative">
              <Train className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
              <input 
                type="text" 
                placeholder="e.g. Mumbai Central" 
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:border-primary transition-all outline-none"
                value={search.to}
                onChange={(e) => setSearch({...search, to: e.target.value})}
              />
            </div>
          </div>

          <button className="btn-primary py-3">
            {loading ? <Loader2 className="animate-spin" /> : <Search size={20} />} Search Trains
          </button>
        </form>
      </div>

      {/* Results */}
      <div className="grid gap-6">
        <AnimatePresence>
          {trains.map((train, idx) => (
            <motion.div
              key={train.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-6 border-white/5 hover:border-accent/30 transition-all group overflow-hidden relative"
            >
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl -z-10" />

              <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                {/* Train Info */}
                <div className="flex items-center gap-6">
                   <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-accent">
                      <Train size={32} />
                   </div>
                   <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold px-2 py-0.5 bg-accent/20 text-accent rounded uppercase">{train.type}</span>
                        <span className="text-xs text-white/40 font-mono">#{train.number}</span>
                      </div>
                      <h4 className="text-xl font-bold font-space group-hover:text-accent transition-colors">{train.name}</h4>
                   </div>
                </div>

                {/* Timeline */}
                <div className="flex items-center gap-8 flex-1 justify-center max-w-md">
                   <div className="text-center">
                      <span className="block text-2xl font-bold">{train.departure}</span>
                      <span className="text-[10px] text-white/40 uppercase">Departure</span>
                   </div>
                   <div className="flex-1 flex flex-col items-center px-4">
                      <span className="text-[10px] text-white/40 mb-1 flex items-center gap-1">
                        <Clock size={10} /> {train.duration}
                      </span>
                      <div className="w-full h-px bg-white/10 relative">
                        <div className="absolute top-1/2 left-0 w-2 h-2 bg-accent rounded-full -translate-y-1/2" />
                        <div className="absolute top-1/2 right-0 w-2 h-2 bg-primary rounded-full -translate-y-1/2" />
                      </div>
                   </div>
                   <div className="text-center">
                      <span className="block text-2xl font-bold">{train.arrival}</span>
                      <span className="text-[10px] text-white/40 uppercase">Arrival</span>
                   </div>
                </div>

                {/* Pricing & Booking */}
                <div className="text-center md:text-right flex flex-col gap-2">
                   <span className="text-2xl font-bold text-accent">{train.price}</span>
                   <div className="flex items-center gap-1 text-[10px] justify-center md:justify-end">
                      {train.availability.includes('Available') ? (
                        <CheckCircle size={12} className="text-green-500" />
                      ) : (
                        <AlertCircle size={12} className="text-yellow-500" />
                      )}
                      <span className={train.availability.includes('Available') ? 'text-green-400' : 'text-yellow-400'}>
                        {train.availability}
                      </span>
                   </div>
                   <button className="mt-2 text-xs font-bold text-white/40 hover:text-white transition-colors">
                      View Routes
                   </button>
                </div>
              </div>

              {/* Classes */}
              <div className="mt-6 pt-6 border-t border-white/5 flex gap-3">
                {train.classes.map(cls => (
                  <button key={cls} className="px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold hover:border-accent hover:text-accent transition-all">
                    {cls}
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default RailwaySearch
