import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { Map, Calendar, Trash2, ExternalLink, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const Trips = () => {
  const { user } = useAuth()
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchTrips()
    }
  }, [user])

  const fetchTrips = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('trips')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (!error) setTrips(data)
    setLoading(false)
  }

  const deleteTrip = async (id) => {
    if (!confirm('Are you sure you want to delete this trip?')) return
    const { error } = await supabase.from('trips').delete().eq('id', id)
    if (!error) fetchTrips()
  }

  if (!user) return (
    <div className="pt-40 text-center">
      <h2 className="text-2xl font-bold mb-4">Please log in to view your trips.</h2>
      <Link to="/login" className="btn-primary inline-flex">Log In Now</Link>
    </div>
  )

  return (
    <div className="pt-32 pb-20 container mx-auto px-6">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold font-space mb-2">My <span className="text-gradient">Adventures</span></h1>
          <p className="text-white/50">Your personal collection of AI-crafted journeys across India.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-primary" size={48} />
        </div>
      ) : trips.length === 0 ? (
        <div className="glass-card p-20 text-center">
          <Map className="mx-auto mb-6 text-white/20" size={64} />
          <h3 className="text-2xl font-bold mb-2">No trips saved yet</h3>
          <p className="text-white/40 mb-8">Start planning your dream journey on the Home page!</p>
          <Link to="/" className="btn-primary inline-flex">Plan My First Trip</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trips.map((trip) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card overflow-hidden group"
            >
              <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 relative flex items-center justify-center overflow-hidden">
                <Map className="text-white/10 group-hover:scale-110 transition-transform duration-500" size={100} />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-xs font-bold px-2 py-1 bg-primary rounded uppercase">Saved Itinerary</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4 font-space">{trip.destination}</h3>
                
                <div className="flex items-center justify-between text-white/40 text-xs mb-6">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} /> {new Date(trip.created_at).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1 uppercase tracking-widest font-bold text-accent">
                    {trip.budget_type}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 btn-primary py-2 text-sm flex items-center justify-center gap-2">
                    <ExternalLink size={16} /> View Details
                  </button>
                  <button 
                    onClick={() => deleteTrip(trip.id)}
                    className="p-2 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Trips
