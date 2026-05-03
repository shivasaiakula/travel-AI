import React from 'react'
import { motion } from 'framer-motion'
import { Plane, Hotel, Train, ArrowRight, ShieldCheck } from 'lucide-react'

const BookingCard = ({ item, type, onBook }) => {
  const isFlight = type === 'flight'
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-card p-6 border-white/5 hover:border-accent/30 transition-all"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl bg-white/5 ${isFlight ? 'text-primary' : 'text-secondary'}`}>
            {isFlight ? <Plane size={24} /> : <Hotel size={24} />}
          </div>
          <div>
            <h4 className="font-bold text-lg">{item.airline || item.name}</h4>
            <div className="flex items-center gap-1 text-white/40 text-xs">
              <ShieldCheck size={12} className="text-accent" /> Verified Option
            </div>
          </div>
        </div>
        <div className="text-right">
          <span className="block text-2xl font-bold text-accent">{item.price}</span>
          <span className="text-[10px] text-white/40 uppercase">Inc. Taxes</span>
        </div>
      </div>

      {isFlight ? (
        <div className="flex items-center justify-between mb-6 bg-white/5 p-4 rounded-xl">
          <div className="text-center">
            <span className="block font-bold">{item.departure}</span>
            <span className="text-[10px] text-white/40">Departure</span>
          </div>
          <div className="flex-1 flex flex-col items-center px-4">
            <span className="text-[10px] text-white/40 mb-1">{item.duration}</span>
            <div className="w-full h-px bg-white/10 relative">
              <div className="absolute top-1/2 left-0 w-2 h-2 bg-accent rounded-full -translate-y-1/2" />
              <div className="absolute top-1/2 right-0 w-2 h-2 bg-primary rounded-full -translate-y-1/2" />
            </div>
            <span className="text-[10px] text-accent mt-1">Non-stop</span>
          </div>
          <div className="text-center">
            <span className="block font-bold">{item.arrival}</span>
            <span className="text-[10px] text-white/40">Arrival</span>
          </div>
        </div>
      ) : (
        <div className="mb-6">
          <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded-xl mb-4" />
          <div className="flex items-center gap-1 text-yellow-400 mb-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.floor(item.rating) ? 'fill-current' : 'text-white/20'}>★</span>
            ))}
            <span className="text-xs text-white/60 ml-2">{item.rating} Rating</span>
          </div>
        </div>
      )}

      <button 
        onClick={() => onBook(item)}
        className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${isFlight ? 'bg-primary/20 text-primary border border-primary/30 hover:bg-primary hover:text-white' : 'bg-secondary/20 text-secondary border border-secondary/30 hover:bg-secondary hover:text-white'}`}
      >
        Select & Continue <ArrowRight size={18} />
      </button>
    </motion.div>
  )
}

export default BookingCard
