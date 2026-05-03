import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Compass, Map, Calendar, LayoutDashboard, Menu, X, LogOut, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { user, signOut } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/', icon: Compass },
    { name: 'Discover', path: '/discover', icon: Map },
    { name: 'Trips', path: '/trips', icon: Calendar },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  ]

  return (
    <nav className={`fixed left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'top-0 bg-background/80 backdrop-blur-lg border-b border-white/10 py-3' : 'top-8 bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center neon-glow-purple">
            <Compass className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold font-space text-white tracking-tighter">
            InTravel <span className="text-accent">AI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.path}
              className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-accent ${location.pathname === link.path ? 'text-accent' : 'text-white/70'}`}
            >
              <link.icon size={18} />
              {link.name}
            </Link>
          ))}
          
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-primary transition-all">
                <User size={20} className="text-primary" />
              </Link>
              <button onClick={() => signOut()} className="text-white/40 hover:text-white transition-colors">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-primary py-2 px-6 text-sm">
              Get Started
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-6"
        >
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-4 text-lg font-medium text-white/80 hover:text-accent"
            >
              <link.icon size={22} />
              {link.name}
            </Link>
          ))}
          <button className="btn-primary w-full">
            Get Started
          </button>
        </motion.div>
      )}
    </nav>
  )
}

export default Navbar
