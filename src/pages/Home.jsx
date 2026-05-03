import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import Hero from '../components/Hero'
import AIPlannerForm from '../components/AIPlannerForm'
import DestinationGrid from '../components/DestinationGrid'
import ItineraryDisplay from '../components/ItineraryDisplay'
import TravelDNAQuiz from '../components/TravelDNAQuiz'

const Home = () => {
  const [itinerary, setItinerary] = useState(null)
  const [travelDNA, setTravelDNA] = useState(null)
  const [showQuiz, setShowQuiz] = useState(false)

  return (
    <div className="pt-24 pb-20">
      <Hero />
      
      <section className="container mx-auto px-6 py-20 relative" id="planner">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-primary/20 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-4xl mx-auto">
          {!travelDNA ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <div className="glass-card p-12 neon-glow-purple mb-8">
                <Sparkles className="text-primary mx-auto mb-6" size={48} />
                <h3 className="text-3xl font-bold mb-4 font-space">Unlock Your Travel DNA</h3>
                <p className="text-white/60 mb-8 max-w-md mx-auto">Take our 30-second quiz so our AI can craft a journey that perfectly matches your soul.</p>
                <button 
                  onClick={() => setShowQuiz(true)}
                  className="btn-primary"
                >
                  Discover My Travel DNA
                </button>
              </div>
              
              <AnimatePresence>
                {showQuiz && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <TravelDNAQuiz onComplete={(dna) => setTravelDNA(dna)} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-accent/20 text-accent text-xs font-bold mb-4 uppercase">
                  DNA Profile Active: {Object.values(travelDNA).join(' • ')}
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 font-space">
                  Plan Your <span className="text-gradient">Dream Journey</span>
                </h2>
                <p className="text-white/60 text-lg">
                  AI will now use your personality to curate the perfect route.
                </p>
              </motion.div>
              
              <AIPlannerForm onResult={setItinerary} dna={travelDNA} />
              
              {itinerary && <ItineraryDisplay itinerary={itinerary} />}
            </>
          )}
        </div>
      </section>

      <section className="container mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-space mb-2">Trending Destinations</h2>
            <p className="text-white/50">Most explored places across India right now.</p>
          </div>
          <button className="text-accent hover:underline font-medium">View all</button>
        </div>
        
        <DestinationGrid />
      </section>
    </div>
  )
}

export default Home
