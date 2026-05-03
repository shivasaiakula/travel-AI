import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Discover from './pages/Discover'
import Login from './pages/Login'
import Register from './pages/Register'
import Trips from './pages/Trips'
import DestinationDetail from './pages/DestinationDetail'
import Footer from './components/Footer'
import AIChatbot from './components/AIChatbot'

const AITicker = () => (
  <div className="fixed top-0 left-0 w-full bg-primary/10 backdrop-blur-md border-b border-white/5 py-1 z-[60] overflow-hidden no-print">
    <div className="flex whitespace-nowrap animate-ticker items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-accent/80">
      <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> AI Engine Online</span>
      <span>• AI Predicts: Best time for Leh Ladakh is July</span>
      <span>• Trending: Spiritual Tourism in Varanasi up 45%</span>
      <span>• Weather Alert: Heavy Monsoons in Goa - AI suggesting alternate routes</span>
      <span>• Budget Tip: Flights to Kochi are 20% cheaper today</span>
      <span>• Neural Network: Processing 1.2M Indian Travel Nodes</span>
    </div>
  </div>
)

function App() {
  return (
    <div className="min-h-screen bg-[#020205] text-white relative overflow-hidden">
      <AITicker />
      {/* Neural Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#1a0b2e_0%,#020205_100%)]" />
        <div className="neural-grid" />
      </div>
      
      <Navbar />
      
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/destination/:id" element={<DestinationDetail />} />
          {/* Other routes will be added in subsequent steps */}
        </Routes>
      </main>

      <AIChatbot />
      
      <Footer />
    </div>
  )
}

export default App
