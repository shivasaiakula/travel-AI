import React from 'react'
import { Compass, Twitter, Instagram, Github, Youtube, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="relative z-10 bg-background pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center neon-glow-purple">
                <Compass className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold font-space text-white tracking-tighter">
                InTravel <span className="text-accent">AI</span>
              </span>
            </Link>
            <p className="text-white/40 leading-relaxed">
              Experience the soul of India through the lens of Artificial Intelligence. Your journey, perfectly crafted.
            </p>
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-primary hover:text-white transition-all">
                <Twitter size={18} />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-secondary hover:text-white transition-all">
                <Instagram size={18} />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-white hover:text-black transition-all">
                <Github size={18} />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold font-space mb-8">Navigation</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-white/40 hover:text-accent transition-colors">Home Exploration</Link></li>
              <li><Link to="/discover" className="text-white/40 hover:text-accent transition-colors">Travel Discovery</Link></li>
              <li><Link to="/trips" className="text-white/40 hover:text-accent transition-colors">My Adventures</Link></li>
              <li><Link to="/dashboard" className="text-white/40 hover:text-accent transition-colors">Personal Dashboard</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-bold font-space mb-8">Support & Legal</h4>
            <ul className="space-y-4">
              <li><button className="text-white/40 hover:text-accent transition-colors">Help Center</button></li>
              <li><button className="text-white/40 hover:text-accent transition-colors">Privacy Policy</button></li>
              <li><button className="text-white/40 hover:text-accent transition-colors">Terms of Service</button></li>
              <li><button className="text-white/40 hover:text-accent transition-colors">Safety Guide</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold font-space mb-8">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/40">
                <MapPin size={18} className="text-primary shrink-0" />
                <span>Cyber Hub, Gurugram, India</span>
              </li>
              <li className="flex items-center gap-3 text-white/40">
                <Mail size={18} className="text-primary shrink-0" />
                <span>hello@intravel.ai</span>
              </li>
              <li className="flex items-center gap-3 text-white/40">
                <Phone size={18} className="text-primary shrink-0" />
                <span>+91 1800-AI-TRAVEL</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-sm italic">
            &copy; 2024 InTravel AI. Powered by Google Gemini. Crafted for the Modern Explorer.
          </p>
          <div className="flex gap-8">
             <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4 opacity-20 grayscale hover:grayscale-0 transition-all" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 opacity-20 grayscale hover:grayscale-0 transition-all" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4 opacity-20 grayscale hover:grayscale-0 transition-all" />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
