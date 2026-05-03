import React, { useState } from 'react'
import { motion } from 'framer-motion'
import LanguageBridge from '../components/LanguageBridge'
import { Train, Plane, MapPin, Languages } from 'lucide-react'

const Discover = () => {
  const [activeTab, setActiveTab] = useState('railway')

  return (
    <div className="pt-32 pb-20 container mx-auto px-6">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold font-space mb-6"
        >
          Discover <span className="text-gradient">Indian Hubs</span>
        </motion.h1>
        <p className="text-white/60 text-lg">
          From high-speed rail to local dialects, our AI bridges every distance across the subcontinent.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 mb-12">
        <button 
          onClick={() => setActiveTab('railway')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all font-bold ${activeTab === 'railway' ? 'bg-primary/20 border border-primary/40 text-white' : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'}`}
        >
          <Train size={20} /> Railways
        </button>
        <button 
          onClick={() => setActiveTab('language')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all font-bold ${activeTab === 'language' ? 'bg-accent/20 border border-accent/40 text-white' : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'}`}
        >
          <Languages size={20} /> AI Language Bridge
        </button>
        <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/50 font-bold opacity-50 cursor-not-allowed">
          <Plane size={20} /> Flights (Beta)
        </button>
      </div>

      <div className="max-w-5xl mx-auto">
        {activeTab === 'railway' ? <RailwaySearch /> : <LanguageBridge />}
      </div>
    </div>
  )
}

export default Discover
