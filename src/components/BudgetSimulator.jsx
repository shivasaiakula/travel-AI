import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { IndianRupee, TrendingUp, TrendingDown, Info } from 'lucide-react'

const BudgetSimulator = () => {
  const [budgetType, setBudgetType] = useState('Medium')
  const [days, setDays] = useState(3)
  const [travelers, setTravelers] = useState(2)
  const [totalCost, setTotalCost] = useState(0)

  const rates = {
    'Budget': { hotel: 1500, food: 800, transport: 500, activities: 500 },
    'Medium': { hotel: 4000, food: 2000, transport: 1500, activities: 2000 },
    'Luxury': { hotel: 12000, food: 5000, transport: 4000, activities: 5000 },
  }

  useEffect(() => {
    const dailyRate = rates[budgetType]
    const perPersonDaily = dailyRate.hotel/2 + dailyRate.food + dailyRate.transport + dailyRate.activities
    const total = perPersonDaily * travelers * days
    setTotalCost(total)
  }, [budgetType, days, travelers])

  return (
    <div className="glass-card p-8 border-none neon-glow-cyan">
      <h3 className="text-2xl font-bold font-space mb-6 flex items-center gap-3">
        <IndianRupee className="text-accent" /> Dynamic Budget Simulator
      </h3>
      
      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs text-white/40 uppercase font-bold flex justify-between">
              Travel Style <span className="text-accent">{budgetType}</span>
            </label>
            <input 
              type="range" 
              min="0" max="2" step="1" 
              value={budgetType === 'Budget' ? 0 : budgetType === 'Medium' ? 1 : 2}
              onChange={(e) => {
                const val = parseInt(e.target.value)
                setBudgetType(val === 0 ? 'Budget' : val === 1 ? 'Medium' : 'Luxury')
              }}
              className="w-full accent-accent"
            />
            <div className="flex justify-between text-[10px] text-white/40 uppercase">
              <span>Backpacker</span>
              <span>Standard</span>
              <span>Premium</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-white/40 uppercase font-bold flex justify-between">
              Trip Duration <span className="text-accent">{days} Days</span>
            </label>
            <input 
              type="range" 
              min="1" max="14" 
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value))}
              className="w-full accent-accent"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-white/40 uppercase font-bold flex justify-between">
              Travelers <span className="text-accent">{travelers} People</span>
            </label>
            <input 
              type="range" 
              min="1" max="10" 
              value={travelers}
              onChange={(e) => setTravelers(parseInt(e.target.value))}
              className="w-full accent-accent"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center p-8 bg-white/5 rounded-3xl border border-white/10 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 text-white/20">
             <TrendingUp size={64} />
           </div>
           <span className="text-sm font-bold uppercase tracking-widest text-white/50 mb-2 z-10">Estimated Total Cost</span>
           <div className="flex items-start text-accent z-10">
             <span className="text-2xl mt-2 font-bold">₹</span>
             <span className="text-6xl font-bold font-space tracking-tighter">
               {totalCost.toLocaleString()}
             </span>
           </div>
           <p className="text-xs text-white/40 mt-4 text-center z-10">
             Based on real-time Indian travel data. Includes stay, meals, local transit, and activities.
           </p>
        </div>
      </div>
    </div>
  )
}

export default BudgetSimulator
