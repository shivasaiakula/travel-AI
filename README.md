# 🇮🇳 InTravel AI 

![Status](https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Gemini](https://img.shields.io/badge/Google_Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)

**The Future of Indian Tourism.** 
InTravel AI is a state-of-the-art, fully autonomous AI travel platform that designs deeply personalized, context-aware journeys across India. Powered by Google Gemini and Supabase, it goes far beyond standard booking sites by acting as a highly intelligent, voice-enabled travel companion.

## ✨ Core "Next-Gen" Features

*   🧠 **Travel DNA Engine**: Takes users through a rapid psychological quiz to determine their core travel persona, feeding this data directly to the AI for hyper-personalized itineraries.
*   🗣️ **Voice-Enabled AI Companion**: A built-in web chatbot using the Web Speech API that listens to your voice commands and speaks travel advice back to you.
*   🎒 **AI Contextual Packing Assistant**: Automatically generates a smart packing list tailored specifically to the live weather patterns and cultural etiquette of the chosen Indian destination.
*   💰 **Dynamic Budget Simulator**: An interactive dashboard tool that allows users to instantly calculate estimated trip costs based on travel style, duration, and group size.
*   🎥 **Cinematic Drone Previews**: Integrated 4K YouTube drone tours directly on the high-fidelity destination exploration pages.
*   🗣️ **Local Language Bridge**: Instantly translates essential travel phrases into major Indian regional languages (Hindi, Marathi, Bengali, Tamil, etc.) with pronunciation guides.
*   💾 **Persistent Cloud Storage**: Complete user authentication and database persistence via Supabase, allowing users to save, manage, and download PDF copies of their itineraries.

## 🛠️ Technology Stack

*   **Frontend**: React (Vite), Tailwind CSS, Framer Motion
*   **Backend / Auth / DB**: Supabase (PostgreSQL), Row Level Security
*   **AI Engine**: Google Gemini Pro (REST API Integration)
*   **Icons & Assets**: Lucide React, Unsplash API
*   **Native Web APIs**: SpeechRecognition, SpeechSynthesis

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shivasaiakula/travel-AI.git
   cd travel-AI
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the root directory and add your keys:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_key_here
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## 🔒 Security Note
This platform utilizes direct-fetch routing for the Gemini API to bypass browser safety restrictions while maintaining production-grade UI response times. 

---
*Built to showcase the future of AI-driven web applications.*
