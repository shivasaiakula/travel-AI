import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, User, Bot, Loader2, Mic, Volume2, VolumeX } from 'lucide-react'

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Namaste! I am your AI Travel Companion. Ask me anything or speak to me!' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const speakText = (text) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel() // Stop previous speech
    const utterance = new SpeechSynthesisUtterance(text)
    // Try to find an Indian English voice, fallback to default
    const voices = window.speechSynthesis.getVoices()
    const indianVoice = voices.find(v => v.lang.includes('en-IN'))
    if (indianVoice) utterance.voice = indianVoice
    window.speechSynthesis.speak(utterance)
  }

  const handleListen = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Your browser doesn't support voice input.")
      return
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    
    recognition.onstart = () => setIsListening(true)
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setInput(transcript)
    }
    recognition.onend = () => setIsListening(false)
    recognition.start()
  }

  const handleSend = async (e) => {
    if (e) e.preventDefault()
    if (!input.trim() || loading) return

    const userText = input
    setMessages(prev => [...prev, { role: 'user', text: userText }])
    setInput('')
    setLoading(true)

    try {
      const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
      if (!API_KEY) throw new Error("API Key missing")

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `You are a helpful Indian travel expert assistant. Answer briefly and conversationally: ${userText}` }] }]
          })
        }
      )

      const data = await response.json()
      if (data.error) throw new Error(data.error.message)
      
      const botResponse = data.candidates[0].content.parts[0].text
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }])
      speakText(botResponse)
    } catch (error) {
      const errorMsg = "I'm having trouble connecting right now. Please check your network or API Key."
      setMessages(prev => [...prev, { role: 'bot', text: errorMsg }])
      speakText(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-primary rounded-full shadow-2xl flex items-center justify-center z-50 neon-glow-purple"
      >
        <MessageSquare className="text-white" size={32} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-28 right-8 w-96 h-[500px] glass-card flex flex-col z-50 overflow-hidden border-primary/20"
          >
            {/* Header */}
            <div className="bg-primary/20 p-4 border-b border-white/10 flex justify-between items-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">InTravel Assistant</h4>
                  <span className="text-[10px] text-accent flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" /> Voice Active
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 relative z-10">
                <button onClick={() => setVoiceEnabled(!voiceEnabled)} className="text-white/60 hover:text-white transition-colors p-1">
                  {voiceEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                </button>
                <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors p-1">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-white/5 text-white/80 border border-white/10 rounded-tl-none'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none border border-white/10">
                    <Loader2 size={16} className="animate-spin text-accent" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white/5 border-t border-white/10 relative">
              <form onSubmit={handleSend} className="flex gap-2">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me or use the mic..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 pr-10 text-sm focus:outline-none focus:border-primary"
                />
                <button
                  type="button"
                  onClick={handleListen}
                  className={`absolute right-16 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-colors ${isListening ? 'text-red-500 bg-red-500/20 animate-pulse' : 'text-white/40 hover:text-accent'}`}
                >
                  <Mic size={16} />
                </button>
                <button type="submit" disabled={!input.trim() || loading} className="p-2 bg-primary rounded-xl hover:bg-primary-glow transition-colors disabled:opacity-50">
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AIChatbot
