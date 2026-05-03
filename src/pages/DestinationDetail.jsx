import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import { MapPin, Star, Clock, Info, ArrowLeft, Camera, Utensils, Landmark, Thermometer, Users, Calendar, Sparkles } from 'lucide-react'
import { getThemedPhoto } from '../services/imageService'
import WeatherWidget from '../components/WeatherWidget'

const destinationsData = {
  'jaipur': { 
    name: 'Jaipur, Rajasthan', 
    tag: 'Cultural Capital', 
    rating: 4.8, 
    description: 'The Pink City of India is a symphony of palaces, forts, and vibrant markets. Experience the royal heritage of the Rajputs in every corner.',
    gallery: [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534170609127-96a1976fc990?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1477584158296-607e9db8f0f9?q=80&w=1200&auto=format&fit=crop'
    ],
    mustVisit: [
      { name: 'Amer Fort', desc: 'A majestic fort overlooking Maota Lake' },
      { name: 'Hawa Mahal', desc: 'The iconic Palace of Winds with 953 windows' },
      { name: 'Jantar Mantar', desc: 'World heritage astronomical observatory' }
    ],
    food: ['Pyaaz Kachori', 'Dal Baati Churma', 'Ghevar'],
    aiTip: 'Visit Nahargarh Fort at sunset for the most breathtaking view of the glowing pink city.'
  },
  'munnar': { 
    name: 'Munnar, Kerala', 
    tag: 'Emerald Hills', 
    rating: 4.9, 
    description: 'Where the clouds meet the tea plantations. Munnar is a serene escape into the lush green landscapes of the Western Ghats.',
    gallery: [
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1616423641322-86927d307779?auto=format&fit=crop&q=80&w=1200'
    ],
    mustVisit: [
      { name: 'Eravikulam Park', desc: 'Home to the endangered Nilgiri Tahr' },
      { name: 'Mattupetty Dam', desc: 'Perfect for boating and elephant sightings' },
      { name: 'Tea Museum', desc: 'Learn the history of Keralas tea legacy' }
    ],
    food: ['Kerala Sadya', 'Banana Chips', 'Idiyappam'],
    aiTip: 'Take the early morning trek to Lakshmi Hills to avoid the crowds and see the valley under the mist.'
  },
  'leh': { 
    name: 'Leh, Ladakh', 
    tag: 'The High Frontier', 
    rating: 5.0, 
    description: 'A land of high passes, crystal clear lakes, and ancient monasteries. Ladakh is a dream destination for adventurers and seekers of peace.',
    gallery: [
      'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1524443169398-9aa1ceab67d4?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1545063007-939e4e65009a?auto=format&fit=crop&q=80&w=1200'
    ],
    mustVisit: [
      { name: 'Pangong Tso', desc: 'The famous blue lake shared with Tibet' },
      { name: 'Nubra Valley', desc: 'Ride double-humped camels in the desert' },
      { name: 'Khardung La', desc: 'One of the highest motorable roads in the world' }
    ],
    food: ['Butter Tea', 'Apricot Jam', 'Skyu'],
    aiTip: 'Spend at least 48 hours in Leh city for acclimatization before heading to higher altitudes.'
  }
}

const DestinationDetail = () => {
  const { id } = useParams()
  const [activeImg, setActiveImg] = useState(0)
  const dest = destinationsData[id.toLowerCase().split(',')[0].trim()] || destinationsData['jaipur']

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-accent mb-12 transition-all group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Discover
        </Link>

        {/* Gallery & Title Section */}
        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative h-[450px] rounded-[40px] overflow-hidden glass-card border-none neon-glow-purple"
            >
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeImg}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  src={dest.gallery[activeImg]} 
                  alt={dest.name} 
                  className="w-full h-full object-cover object-center"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
              <div className="absolute top-6 left-6 px-4 py-2 bg-primary/80 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest">
                {dest.tag}
              </div>
            </motion.div>
            
            <div className="flex gap-4">
              {dest.gallery.map((img, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`flex-1 h-24 rounded-2xl overflow-hidden border-2 transition-all ${activeImg === i ? 'border-accent scale-105' : 'border-transparent opacity-40 hover:opacity-100'}`}
                >
                  <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
                </button>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 text-yellow-400">
                <Star size={20} className="fill-current" />
                <span className="font-bold text-2xl">{dest.rating}</span>
              </div>
              <div className="h-4 w-px bg-white/10" />
              <span className="text-white/40 uppercase tracking-widest text-xs font-bold">Incredible India Verified</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold font-space mb-8 leading-tight">{dest.name}</h1>
            <p className="text-white/60 text-xl leading-relaxed mb-10">{dest.description}</p>

            <div className="grid grid-cols-2 gap-6 mb-12">
               <div className="glass-card p-6 border-white/5">
                  <WeatherWidget city={dest.name.split(',')[0]} />
               </div>
               <div className="glass-card p-6 border-white/5 flex flex-col justify-center items-center text-center">
                  <Users className="text-accent mb-2" />
                  <span className="block text-xs text-white/40 uppercase font-bold">Crowd Level</span>
                  <span className="text-xl font-bold text-accent">Moderate</span>
               </div>
            </div>

            <div className="flex gap-4">
              <Link to="/" className="btn-primary flex-1 py-5 text-lg">Plan This Journey</Link>
              <button className="p-5 rounded-full border border-white/10 hover:bg-white/5 transition-all">
                <Camera size={24} className="text-white/60" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Detailed Insights Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {/* Must Visit */}
          <div className="glass-card p-10 neon-glow-purple group hover:bg-white/5 transition-all">
            <Landmark className="text-primary mb-8" size={32} />
            <h3 className="text-2xl font-bold font-space mb-6">Top Sights</h3>
            <div className="space-y-6">
              {dest.mustVisit.map((site, i) => (
                <div key={i}>
                  <h4 className="font-bold text-white mb-1">{site.name}</h4>
                  <p className="text-xs text-white/40">{site.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Food Guide */}
          <div className="glass-card p-10 neon-glow-cyan group hover:bg-white/5 transition-all">
            <Utensils className="text-accent mb-8" size={32} />
            <h3 className="text-2xl font-bold font-space mb-6">Local Tastes</h3>
            <div className="grid grid-cols-1 gap-4">
              {dest.food.map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="font-bold text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Guide */}
          <div className="glass-card p-10 bg-gradient-to-br from-primary/10 to-accent/10 border-none">
            <Sparkles className="text-accent mb-8" size={32} />
            <h3 className="text-2xl font-bold font-space mb-6">AI Pro Tip</h3>
            <p className="text-white/80 leading-relaxed text-lg italic">
              "{dest.aiTip}"
            </p>
            <div className="mt-12 pt-12 border-t border-white/5">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                     <Users size={20} />
                  </div>
                  <div>
                    <span className="block text-sm font-bold">Ask AI Expert</span>
                    <span className="text-xs text-white/40">Ready to assist 24/7</span>
                  </div>
               </div>
            </div>
          </div>
          {/* Cinematic Video Tour */}
          <div className="glass-card p-10 border-none relative overflow-hidden group col-span-1 md:col-span-3 mt-8">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-50" />
            <div className="relative z-10 flex flex-col items-center text-center">
               <h3 className="text-3xl font-bold font-space mb-4 flex items-center gap-3">
                 <Camera className="text-primary" /> Cinematic Preview
               </h3>
               <p className="text-white/60 mb-8 max-w-2xl">
                 Immerse yourself in a 4K visual journey of {dest.name} before you arrive. Experience the culture, the landscapes, and the soul of the city.
               </p>
               <div className="w-full max-w-4xl aspect-video rounded-3xl overflow-hidden border-2 border-white/10 shadow-[0_0_50px_rgba(112,0,255,0.2)]">
                 <iframe 
                   width="100%" 
                   height="100%" 
                   src={`https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(dest.name + ' 4k drone tour india travel')}`}
                   title="Cinematic Tour" 
                   frameBorder="0" 
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                   allowFullScreen
                 ></iframe>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DestinationDetail
