import React from 'react'
import { motion } from 'framer-motion'
import { LayoutDashboard, Wallet, Map, Calendar, TrendingUp, Clock, CheckCircle } from 'lucide-react'
import BudgetSimulator from '../components/BudgetSimulator'

const Dashboard = () => {
  const stats = [
    { label: 'Total Trips', value: '12', icon: Map, color: 'text-primary' },
    { label: 'Upcoming', value: '2', icon: Calendar, color: 'text-accent' },
    { label: 'Budget Spent', value: '₹1.2L', icon: Wallet, color: 'text-secondary' },
    { label: 'Hours Planned', value: '450', icon: Clock, color: 'text-white' },
  ]

  const recentTrips = [
    { id: 1, name: 'Rajasthan Cultural Tour', date: 'May 12, 2024', status: 'Confirmed', cost: '₹45,000' },
    { id: 2, name: 'Kerala Backwaters', date: 'June 05, 2024', status: 'Pending', cost: '₹28,500' },
    { id: 3, name: 'Leh Ladakh Adventure', date: 'July 20, 2024', status: 'Planned', cost: '₹62,000' },
  ]

  return (
    <div className="pt-32 pb-20 container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold font-space mb-2">Traveler <span className="text-gradient">Dashboard</span></h1>
          <p className="text-white/50 text-lg">Welcome back! Here's an overview of your Indian adventures.</p>
        </div>
        <button className="btn-primary">Plan New Trip</button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card p-6 flex items-center gap-6"
          >
            <div className={`p-4 rounded-2xl bg-white/5 ${stat.color}`}>
              <stat.icon size={28} />
            </div>
            <div>
              <span className="block text-white/40 text-sm font-medium">{stat.label}</span>
              <span className="text-3xl font-bold font-space">{stat.value}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mb-12">
        <BudgetSimulator />
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Analytics Chart (Stylized Mock) */}
        <div className="lg:col-span-2 glass-card p-8 neon-glow-purple">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-bold font-space flex items-center gap-2">
              <TrendingUp size={20} className="text-primary" /> Budget Analytics
            </h3>
            <select className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-4">
             {[60, 40, 85, 50, 70, 95].map((height, i) => (
               <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                 <div className="relative w-full">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="w-full bg-gradient-to-t from-primary to-accent rounded-t-xl opacity-40 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                      ₹{(height * 1000).toLocaleString()}
                    </div>
                 </div>
                 <span className="text-xs text-white/40 font-medium">Month {i + 1}</span>
               </div>
             ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-card p-8">
          <h3 className="text-xl font-bold font-space mb-8">Recent Trips</h3>
          <div className="space-y-6">
            {recentTrips.map((trip) => (
              <div key={trip.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <Map size={20} className="text-white/60" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm group-hover:text-accent transition-colors">{trip.name}</h4>
                    <span className="text-[10px] text-white/40">{trip.date}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block font-bold text-sm">{trip.cost}</span>
                  <span className={`text-[10px] px-2 py-1 rounded-full ${trip.status === 'Confirmed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                    {trip.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 text-sm font-bold text-white/50 hover:text-white transition-colors">
            View All Trips
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
