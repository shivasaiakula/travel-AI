import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Star, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'

const destinations = [
  {
    id: 1,
    name: 'Jaipur, Rajasthan',
    image: 'https://images.unsplash.com/photo-1477584158296-607e9db8f0f9?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: '2.5k',
    price: '₹15,000',
    tag: 'Cultural'
  },
  {
    id: 2,
    name: 'Munnar, Kerala',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: '1.8k',
    price: '₹22,000',
    tag: 'Nature'
  },
  {
    id: 3,
    name: 'Leh, Ladakh',
    image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    reviews: '900',
    price: '₹35,000',
    tag: 'Adventure'
  },
  {
    id: 4,
    name: 'Varanasi, UP',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviews: '3.1k',
    price: '₹12,000',
    tag: 'Spiritual'
  }
]

const DestinationGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {destinations.map((dest, idx) => (
        <Link key={dest.id} to={`/destination/${dest.name.split(',')[0].toLowerCase()}`}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -10 }}
            className="group relative glass-card overflow-hidden cursor-pointer"
          >
          <div className="h-64 overflow-hidden relative">
            <img 
              src={dest.image} 
              alt={dest.name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute top-4 left-4 bg-primary/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold">
              {dest.tag}
            </div>
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-full">
              <TrendingUp size={14} className="text-accent" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
          </div>
          
          <div className="p-6">
            <div className="flex items-center gap-2 text-white/50 text-xs mb-2">
              <MapPin size={12} className="text-primary" /> India
            </div>
            <h3 className="text-xl font-bold mb-3 font-space group-hover:text-accent transition-colors">{dest.name}</h3>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-bold">{dest.rating}</span>
                <span className="text-xs text-white/40">({dest.reviews})</span>
              </div>
              <div className="text-right">
                <span className="block text-[10px] text-white/40 uppercase tracking-wider">Starts at</span>
                <span className="text-lg font-bold text-accent">{dest.price}</span>
              </div>
            </div>
          </div>
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-2xl transition-all duration-300 pointer-events-none" />
        </motion.div>
      </Link>
      ))}
    </div>
  )
}

export default DestinationGrid
