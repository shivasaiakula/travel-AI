import React, { useState, useEffect } from 'react'
import { CheckSquare, Square, Loader2, Sparkles, Briefcase } from 'lucide-react'

const SmartPackingList = ({ destination }) => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (destination) {
      generateList()
    }
  }, [destination])

  const generateList = async () => {
    setLoading(true)
    setError(null)
    try {
      const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
      if (!API_KEY) throw new Error("API Key missing")

      const prompt = `Generate a smart packing list for a trip to ${destination}, India based on its typical weather and culture.
      Return ONLY a JSON array of strings. No markdown formatting, no backticks, no explanations. Just a raw array like: ["Item 1", "Item 2"]`

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        }
      )

      const data = await response.json()
      if (data.error) throw new Error(data.error.message)
      
      const text = data.candidates[0].content.parts[0].text
      
      const firstBracket = text.indexOf('[')
      const lastBracket = text.lastIndexOf(']')
      if (firstBracket === -1 || lastBracket === -1) throw new Error("Invalid format")
      
      const jsonArr = JSON.parse(text.substring(firstBracket, lastBracket + 1))
      setItems(jsonArr.map(item => ({ text: item, packed: false })))
    } catch (err) {
      console.error('Packing List Error:', err)
      setError("AI couldn't generate the list. Try again.")
    } finally {
      setLoading(false)
    }
  }

  const toggleItem = (index) => {
    const newItems = [...items]
    newItems[index].packed = !newItems[index].packed
    setItems(newItems)
  }

  return (
    <div className="glass-card p-8 border-white/5 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10">
        <h3 className="text-2xl font-bold font-space mb-2 flex items-center gap-3">
          <Briefcase className="text-accent" /> AI Packing Assistant
        </h3>
        <p className="text-white/50 text-sm mb-6 flex items-center gap-2">
          <Sparkles size={14} className="text-primary" /> Curated for {destination}'s climate & culture
        </p>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 gap-4 text-white/40">
            <Loader2 className="animate-spin text-accent" size={32} />
            <p className="text-sm">Analyzing weather patterns for {destination}...</p>
          </div>
        ) : error ? (
          <div className="text-red-400 bg-red-500/10 p-4 rounded-xl text-sm border border-red-500/20">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item, idx) => (
              <div 
                key={idx}
                onClick={() => toggleItem(idx)}
                className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-colors border ${item.packed ? 'bg-accent/10 border-accent/20' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
              >
                <div className={`mt-0.5 ${item.packed ? 'text-accent' : 'text-white/40'}`}>
                  {item.packed ? <CheckSquare size={18} /> : <Square size={18} />}
                </div>
                <span className={`text-sm ${item.packed ? 'text-white/60 line-through' : 'text-white/90'}`}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SmartPackingList
