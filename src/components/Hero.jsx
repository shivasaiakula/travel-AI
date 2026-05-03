import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, MapPin, ArrowRight } from 'lucide-react'

const Hero = () => {
  return (
    <div className="relative min-h-[80vh] flex items-center overflow-hidden">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-accent text-sm font-medium mb-6 backdrop-blur-sm">
            <Sparkles size={16} />
            <span>The Future of Indian Travel is Here</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold font-space leading-tight mb-6">
            Explore <br />
            <span className="text-gradient">Incredible India</span> <br />
            With AI.
          </h1>
          
          <p className="text-xl text-white/60 mb-10 max-w-lg leading-relaxed">
            Your personalized AI travel companion. Experience India like never before with real-time data, smart itineraries, and seamless bookings.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button className="btn-primary">
              Start Planning <ArrowRight size={20} />
            </button>
            <button className="px-8 py-3 rounded-full border border-white/20 hover:bg-white/5 transition-all font-medium">
              Watch Demo
            </button>
          </div>
          
          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-zinc-800 flex items-center justify-center text-[10px]">
                  U{i}
                </div>
              ))}
            </div>
            <p className="text-sm text-white/40">
              <span className="text-white font-bold">50k+</span> travelers planning right now
            </p>
          </div>
        </motion.div>

        {/* Visual Element: Futuristic India Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative aspect-square flex items-center justify-center"
        >
          {/* Animated Background Rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-full h-full border border-primary/20 rounded-full"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="w-[80%] h-[80%] border border-secondary/20 rounded-full absolute"
            />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="w-[60%] h-[60%] border border-accent/20 rounded-full absolute"
            />
          </div>

          {/* India Silhouette / Abstract Representation */}
          <div className="relative z-10 w-full h-full flex items-center justify-center">
             <div className="w-64 h-80 bg-gradient-to-b from-primary/40 to-transparent rounded-full blur-3xl absolute animate-pulse-slow" />
             
             {/* Stylized Dots as Map Markers */}
             {[
               { top: '20%', left: '45%', name: 'Delhi' },
               { top: '45%', left: '30%', name: 'Mumbai' },
               { top: '70%', left: '45%', name: 'Bangalore' },
               { top: '40%', left: '60%', name: 'Varanasi' },
               { top: '60%', left: '70%', name: 'Kolkata' },
             ].map((point, idx) => (
               <motion.div
                 key={idx}
                 className="absolute w-3 h-3 bg-accent rounded-full neon-glow-cyan"
                 style={{ top: point.top, left: point.left }}
                 animate={{ scale: [1, 1.5, 1] }}
                 transition={{ duration: 2, repeat: Infinity, delay: idx * 0.4 }}
               >
                 <span className="absolute top-4 left-0 text-[10px] whitespace-nowrap text-white/50">{point.name}</span>
               </motion.div>
             ))}
             
             {/* Glowing Routes (Animated SVGs) */}
             <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
               <motion.path
                 d="M 180 80 Q 200 150 120 180"
                 stroke="url(#grad1)"
                 strokeWidth="2"
                 fill="none"
                 initial={{ pathLength: 0 }}
                 animate={{ pathLength: 1 }}
                 transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
               />
               <motion.path
                 d="M 120 180 Q 150 250 180 280"
                 stroke="url(#grad2)"
                 strokeWidth="2"
                 fill="none"
                 initial={{ pathLength: 0 }}
                 animate={{ pathLength: 1 }}
                 transition={{ duration: 3, repeat: Infinity, delay: 1, ease: "easeInOut" }}
               />
               <defs>
                 <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                   <stop offset="0%" style={{ stopColor: '#7000FF', stopOpacity: 1 }} />
                   <stop offset="100%" style={{ stopColor: '#00F0FF', stopOpacity: 1 }} />
                 </linearGradient>
                 <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                   <stop offset="0%" style={{ stopColor: '#FF00E5', stopOpacity: 1 }} />
                   <stop offset="100%" style={{ stopColor: '#00F0FF', stopOpacity: 1 }} />
                 </linearGradient>
               </defs>
             </svg>

             {/* Central Icon */}
             <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="w-32 h-32 glass-card flex items-center justify-center neon-glow-purple"
             >
               <MapPin size={48} className="text-primary" />
             </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Hero
