import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Navigation } from 'lucide-react'

const RouteMap = ({ days }) => {
  return (
    <div className="glass-card p-10 bg-mesh relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 blur-3xl -z-10" />
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
        {days.map((day, idx) => (
          <React.Fragment key={idx}>
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.2 }}
              className="flex flex-col items-center gap-4 group"
            >
              <div className="relative">
                <motion.div 
                   animate={{ scale: [1, 1.2, 1] }}
                   transition={{ duration: 2, repeat: Infinity }}
                   className="absolute inset-0 bg-accent/20 rounded-full blur-md"
                />
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all neon-glow-cyan">
                  <MapPin size={28} />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-[10px] font-bold">
                  D{day.day}
                </div>
              </div>
              <div className="text-center">
                 <span className="block font-bold text-sm truncate max-w-[120px]">{day.title.split(':')[0]}</span>
                 <span className="text-[10px] text-white/40 uppercase tracking-tighter">Day {day.day} Stop</span>
              </div>
            </motion.div>

            {idx < days.length - 1 && (
              <div className="hidden md:flex flex-1 items-center px-4">
                <div className="h-px bg-white/10 flex-1 relative overflow-hidden">
                   <motion.div 
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-accent to-transparent w-full"
                   />
                </div>
                <Navigation size={14} className="text-white/20 rotate-90" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="mt-12 flex items-center justify-center gap-2 text-xs text-white/30 italic">
        <Sparkles size={14} className="text-accent" /> AI calculated optimal route for your DNA profile
      </div>
    </div>
  )
}

export default RouteMap
