import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Hotel, Car, CheckCircle2, DollarSign, CloudSun, Camera, Sparkles } from 'lucide-react'
import WeatherWidget from './WeatherWidget'
import { getThemedPhoto } from '../services/imageService'
import RouteMap from './RouteMap'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import SmartPackingList from './SmartPackingList'

const ItineraryDisplay = ({ itinerary }) => {
  if (!itinerary) return null
  const { user } = useAuth()
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState(null) // { type: 'error' | 'success', message: '' }

  const handleSaveTrip = async () => {
    setSaveStatus(null)
    if (!user) {
      setSaveStatus({ type: 'error', message: 'Please log in to save your trips!' })
      return
    }
    
    setSaving(true)
    try {
      const { error } = await supabase.from('trips').insert({
        user_id: user.id,
        destination: itinerary.trip_name,
        itinerary: itinerary,
        budget_type: 'Medium', // Default or from state
        status: 'planned'
      })
      
      if (error) throw error
      setSaveStatus({ type: 'success', message: 'Trip saved to your profile!' })
    } catch (error) {
      console.error('Error saving trip:', error)
      setSaveStatus({ type: 'error', message: 'Failed to save trip. Make sure you have run the schema in Supabase.' })
    } finally {
      setSaving(false)
    }
  }

  const handleDownload = () => {
    window.print();
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-20 space-y-12 printable-area"
    >
      {/* Hero Image Banner */}
      <div className="relative h-96 rounded-3xl overflow-hidden glass-card border-none">
        <img 
          src={getThemedPhoto(itinerary.trip_name)} 
          alt={itinerary.trip_name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="absolute bottom-8 left-8">
           <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/80 backdrop-blur-md text-xs font-bold mb-4">
              <Camera size={14} /> AI Visualized Destination
           </div>
           <h2 className="text-5xl font-bold font-space text-white">{itinerary.trip_name}</h2>
        </div>
      </div>

      {/* Header Summary */}
      <div className="glass-card p-10 neon-glow-cyan">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <p className="text-white/70 text-lg max-w-2xl">{itinerary.summary}</p>
          </div>
          <div className="flex flex-col gap-4 min-w-[250px]">
            <WeatherWidget city={itinerary.trip_name.split(' ')[0]} />
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl text-center">
              <span className="block text-xs text-white/40 uppercase tracking-widest mb-1">Estimated Cost</span>
              <span className="text-3xl font-bold text-accent">{itinerary.estimated_total_cost}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-4">
          {saveStatus && (
            <div className={`p-4 rounded-xl text-sm font-medium flex items-center gap-2 ${saveStatus.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'}`}>
              {saveStatus.type === 'success' ? <CheckCircle2 size={16} /> : <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
              {saveStatus.message}
            </div>
          )}
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={handleSaveTrip}
              disabled={saving}
              className="btn-primary no-print disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save to My Trips'}
            </button>
            <button 
              onClick={handleDownload}
              className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/5 transition-all font-medium no-print"
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* Smart Packing List */}
      <SmartPackingList destination={itinerary.trip_name} />

      {/* Interactive Route Map */}
      <RouteMap days={itinerary.days} />

      {/* Day Wise Details */}
      <div className="space-y-8">
        <h3 className="text-3xl font-bold font-space flex items-center gap-3">
          <Calendar className="text-primary" /> Day-by-Day Plan
        </h3>
        
        <div className="grid gap-8">
          {itinerary.days.map((day, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative pl-8 md:pl-0"
            >
              {/* Timeline Line */}
              <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 z-0" />
              
              <div className="grid md:grid-cols-2 gap-8 items-start relative z-10">
                <div className={`space-y-4 ${idx % 2 === 0 ? 'md:text-right' : 'md:order-2'}`}>
                   <div className={`inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-bold mb-2`}>
                     Day {day.day}
                   </div>
                   <h4 className="text-2xl font-bold font-space">{day.title}</h4>
                   <ul className={`space-y-2 text-white/60 ${idx % 2 === 0 ? 'md:ml-auto' : ''}`}>
                     {day.activities.map((activity, i) => (
                       <li key={i} className="flex items-center gap-2 justify-start md:justify-end">
                         {idx % 2 === 0 ? (
                            <>{activity} <CheckCircle2 size={16} className="text-accent shrink-0" /></>
                         ) : (
                            <><CheckCircle2 size={16} className="text-accent shrink-0" /> {activity}</>
                         )}
                       </li>
                     ))}
                   </ul>
                </div>

                <div className={`space-y-4 ${idx % 2 === 0 ? '' : 'md:text-right'}`}>
                   <div className="glass-card p-6 border-white/5 hover:border-primary/30 transition-all group">
                      <div className={`flex items-center gap-3 mb-4 ${idx % 2 === 0 ? '' : 'md:justify-end'}`}>
                         <Hotel size={20} className="text-secondary" />
                         <span className="font-bold">Accommodation</span>
                      </div>
                      <p className="text-white/80 font-medium">{day.suggested_hotel.name}</p>
                      <p className="text-xs text-white/40 mt-1">{day.suggested_hotel.price_range} per night</p>
                      <button className="mt-4 text-sm text-secondary hover:underline">Book Now</button>
                   </div>

                   <div className="glass-card p-6 border-white/5 hover:border-accent/30 transition-all group">
                      <div className={`flex items-center gap-3 mb-4 ${idx % 2 === 0 ? '' : 'md:justify-end'}`}>
                         <Car size={20} className="text-accent" />
                         <span className="font-bold">Transportation</span>
                      </div>
                      <p className="text-white/80 font-medium">{day.suggested_transport.mode}</p>
                      <p className="text-xs text-white/40 mt-1">Est. {day.suggested_transport.cost_estimate}</p>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default ItineraryDisplay
