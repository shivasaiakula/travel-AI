import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Camera, Compass, MapPin, Heart, Sparkles, ArrowRight, Check } from 'lucide-react'

const questions = [
  {
    id: 1,
    text: "What's your ideal pace?",
    options: [
      { id: 'fast', label: 'Action Packed', icon: Zap, desc: 'See everything possible' },
      { id: 'slow', label: 'Relaxed', icon: Camera, desc: 'Soak in the local vibe' }
    ]
  },
  {
    id: 2,
    text: "Preferred Landscape?",
    options: [
      { id: 'mountains', label: 'Himalayas', icon: Compass, desc: 'High altitude adventure' },
      { id: 'beaches', label: 'Coastal', icon: Heart, desc: 'Sun, sand and relaxation' },
      { id: 'city', label: 'Heritage Cities', icon: MapPin, desc: 'Palaces and history' }
    ]
  },
  {
    id: 3,
    text: "Food Style?",
    options: [
      { id: 'street', label: 'Street Food', icon: Sparkles, desc: 'Local authentic flavors' },
      { id: 'fine', label: 'Fine Dining', icon: Heart, desc: 'Premium culinary luxury' }
    ]
  }
]

const TravelDNAQuiz = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})

  const handleSelect = (optionId) => {
    const newAnswers = { ...answers, [questions[currentStep].id]: optionId }
    setAnswers(newAnswers)
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete(newAnswers)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="flex justify-center gap-2 mb-12">
        {questions.map((_, idx) => (
          <div 
            key={idx} 
            className={`h-1.5 rounded-full transition-all duration-500 ${idx <= currentStep ? 'w-12 bg-primary' : 'w-4 bg-white/10'}`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold font-space mb-4">{questions[currentStep].text}</h2>
          <p className="text-white/40 mb-10">Select the option that best describes your travel soul.</p>

          <div className="grid gap-4">
            {questions[currentStep].options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className="glass-card p-6 flex items-center justify-between group hover:border-primary/50 transition-all text-left"
              >
                <div className="flex items-center gap-6">
                  <div className="p-4 rounded-2xl bg-white/5 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <option.icon size={24} />
                  </div>
                  <div>
                    <span className="block text-xl font-bold">{option.label}</span>
                    <span className="text-sm text-white/40">{option.desc}</span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/20 transition-all">
                  <ArrowRight size={16} className="text-white/40 group-hover:text-primary" />
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default TravelDNAQuiz
