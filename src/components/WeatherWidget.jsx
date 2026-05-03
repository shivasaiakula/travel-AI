import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Cloud, Sun, CloudRain, Thermometer, Wind } from 'lucide-react'
import { fetchWeather } from '../services/travelService'

const WeatherWidget = ({ city }) => {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getWeather = async () => {
      setLoading(true)
      const data = await fetchWeather(city)
      setWeather(data)
      setLoading(false)
    }
    getWeather()
  }, [city])

  if (loading) return (
    <div className="h-20 w-full animate-pulse bg-white/5 rounded-xl" />
  )

  const getIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'rain': return <CloudRain className="text-accent" />
      case 'clear': return <Sun className="text-yellow-400" />
      default: return <Cloud className="text-white/50" />
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card p-4 flex items-center justify-between border-white/5 bg-gradient-to-r from-primary/10 to-transparent"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-full bg-white/5">
          {getIcon(weather.condition)}
        </div>
        <div>
          <span className="block text-2xl font-bold font-space">{weather.temp}°C</span>
          <span className="text-[10px] text-white/40 uppercase tracking-widest">{weather.condition}</span>
        </div>
      </div>
      
      <div className="flex gap-4">
        <div className="text-center">
          <Thermometer size={14} className="text-primary mb-1 mx-auto" />
          <span className="block text-[10px] text-white/60">Humidity</span>
          <span className="block text-xs font-bold">{weather.humidity}%</span>
        </div>
        <div className="text-center">
          <Wind size={14} className="text-accent mb-1 mx-auto" />
          <span className="block text-[10px] text-white/60">Wind</span>
          <span className="block text-xs font-bold">{weather.wind} km/h</span>
        </div>
      </div>
    </motion.div>
  )
}

export default WeatherWidget
