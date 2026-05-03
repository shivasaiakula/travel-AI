/**
 * InTravel AI - Unified Travel Service
 * Handles Weather, Flights, and Hotels with Smart Fallbacks
 */

const API_KEYS = {
  WEATHER: import.meta.env.VITE_WEATHER_API_KEY,
  AMADEUS_ID: import.meta.env.VITE_AMADEUS_CLIENT_ID,
  AMADEUS_SECRET: import.meta.env.VITE_AMADEUS_CLIENT_SECRET,
};

// --- Weather Service ---
export const fetchWeather = async (city) => {
  if (!API_KEYS.WEATHER) {
    console.log(`Using mock weather for ${city}`);
    return { temp: 28, condition: 'Sunny', humidity: 45, wind: 12 };
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&units=metric&appid=${API_KEYS.WEATHER}`
    );
    const data = await response.json();
    return {
      temp: Math.round(data.main.temp),
      condition: data.weather[0].main,
      humidity: data.main.humidity,
      wind: data.wind.speed,
    };
  } catch (error) {
    return { temp: 25, condition: 'Clear', humidity: 50, wind: 10 };
  }
};

// --- Flight Service (Mocked for immediate UI feedback) ---
export const searchFlights = async (origin, destination, date) => {
  // In a real scenario, we'd authenticate with Amadeus here.
  // For now, we provide realistic data for the Indian domestic market.
  console.log(`Searching flights from ${origin} to ${destination}...`);
  
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay

  return [
    {
      id: 'f1',
      airline: 'IndiGo',
      logo: 'https://www.goindigo.in/content/dam/indigov2/6e-marketing/logos/IndiGo_Logo_New.png',
      price: '₹4,500',
      departure: '08:00 AM',
      arrival: '10:15 AM',
      duration: '2h 15m',
    },
    {
      id: 'f2',
      airline: 'Air India',
      logo: 'https://www.airindia.com/content/dam/air-india/logos/AI_Logo.png',
      price: '₹5,200',
      departure: '11:30 AM',
      arrival: '01:45 PM',
      duration: '2h 15m',
    },
    {
      id: 'f3',
      airline: 'Vistara',
      logo: 'https://www.airvistara.com/content/dam/airvistara/logos/Vistara_Logo.png',
      price: '₹6,800',
      departure: '03:00 PM',
      arrival: '05:15 PM',
      duration: '2h 15m',
    }
  ];
};

// --- Hotel Service ---
export const searchHotels = async (city, budget) => {
  console.log(`Searching ${budget} hotels in ${city}...`);
  
  await new Promise(resolve => setTimeout(resolve, 1000));

  const mocks = {
    Economy: [
      { name: 'Zostel ' + city, price: '₹800', rating: 4.5, image: 'https://images.unsplash.com/photo-1555854817-5b2247a8175c?auto=format&fit=crop&q=80&w=400' },
      { name: 'The Backpackers Hostel', price: '₹1,200', rating: 4.2, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=400' }
    ],
    Medium: [
      { name: 'Ginger Hotel ' + city, price: '₹3,500', rating: 4.0, image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&q=80&w=400' },
      { name: 'FabHotels Premium', price: '₹4,200', rating: 4.4, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400' }
    ],
    Luxury: [
      { name: 'Taj ' + city, price: '₹18,000', rating: 5.0, image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=400' },
      { name: 'The Oberoi', price: '₹22,000', rating: 4.9, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=400' }
    ]
  };

  return mocks[budget] || mocks.Medium;
};
