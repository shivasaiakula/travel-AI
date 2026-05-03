import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Languages, Volume2, MessageSquare, ChevronRight, Sparkles, Globe } from 'lucide-react'

const languages = [
  { name: 'Hindi', code: 'hi', greeting: 'Namaste' },
  { name: 'Marathi', code: 'mr', greeting: 'Namaskar' },
  { name: 'Bengali', code: 'bn', greeting: 'Nomoshkar' },
  { name: 'Tamil', code: 'ta', greeting: 'Vanakkam' },
  { name: 'Telugu', code: 'te', greeting: 'Namaskaram' },
  { name: 'Kannada', code: 'kn', greeting: 'Namaskara' }
]

const phrases = [
  "How much does this cost?",
  "Where is the nearest station?",
  "Please make it spicy!",
  "Can you help me?",
  "Thank you so much!"
]

const LanguageBridge = () => {
  const [selectedLang, setSelectedLang] = useState(languages[0])
  const [input, setInput] = useState('')
  const [translation, setTranslation] = useState('')
  const [loading, setLoading] = useState(false)

  const handleTranslate = async (text) => {
    setLoading(true)
    setInput(text)
    // AI Translation Simulation (Integration with Gemini)
    try {
      const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `Translate this phrase to ${selectedLang.name} and provide the pronunciation in English: "${text}"` }] }]
          })
        }
      )
      const data = await response.json()
      setTranslation(data.candidates[0].content.parts[0].text)
    } catch (error) {
      setTranslation("Translation service unavailable. (Check API Key)")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glass-card p-8 neon-glow-cyan overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Globe size={120} />
      </div>
      
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent">
          <Languages size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-bold font-space">AI Language Bridge</h3>
          <p className="text-white/40 text-sm">Instant translation to local Indian dialects</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Selection */}
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLang(lang)}
                className={`p-3 rounded-xl border transition-all text-center group ${selectedLang.code === lang.code ? 'bg-accent border-accent text-black font-bold' : 'bg-white/5 border-white/10 text-white/60 hover:border-accent/50'}`}
              >
                <span className="block text-xs uppercase tracking-tighter opacity-60">{lang.code}</span>
                <span className="text-sm">{lang.name}</span>
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold text-white/40 uppercase">Common Phrases</p>
            {phrases.map((phrase, i) => (
              <button
                key={i}
                onClick={() => handleTranslate(phrase)}
                className="w-full text-left p-3 rounded-lg bg-white/5 border border-transparent hover:border-accent/30 hover:bg-accent/5 transition-all flex items-center justify-between group"
              >
                <span className="text-sm text-white/80">{phrase}</span>
                <ChevronRight size={14} className="text-white/20 group-hover:text-accent group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        </div>

        {/* Output */}
        <div className="flex flex-col h-full">
          <div className="flex-1 bg-black/40 rounded-3xl p-8 border border-white/5 flex flex-col justify-center items-center text-center relative overflow-hidden">
             <AnimatePresence mode="wait">
               {loading ? (
                 <motion.div 
                   key="loading"
                   initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                   className="flex flex-col items-center gap-4"
                 >
                    <Sparkles className="text-accent animate-spin" size={32} />
                    <p className="text-white/40 font-mono text-xs">Neural Translation in Progress...</p>
                 </motion.div>
               ) : translation ? (
                 <motion.div 
                    key="result"
                    initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    className="space-y-4"
                 >
                    <span className="text-xs font-bold text-accent px-3 py-1 bg-accent/20 rounded-full uppercase tracking-widest">Translation</span>
                    <p className="text-3xl font-bold font-space leading-tight">{translation.split('\n')[0]}</p>
                    <p className="text-white/40 italic">{translation.split('\n')[1] || 'Pronunciation ready'}</p>
                    <button className="p-3 rounded-full bg-white/5 hover:bg-accent hover:text-black transition-all mx-auto mt-4 block">
                       <Volume2 size={24} />
                    </button>
                 </motion.div>
               ) : (
                 <motion.div key="empty" className="space-y-4 opacity-20">
                    <MessageSquare size={48} className="mx-auto" />
                    <p>Select a phrase to see the AI Bridge in action</p>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LanguageBridge
