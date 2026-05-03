/**
 * InTravel AI - Image Service
 * Fetches high-quality travel photos for India destinations
 */

export const getDestinationPhoto = (query) => {
  // Using Unsplash source for high-quality, curated travel photos
  // Format: https://source.unsplash.com/featured/?india,travel,cityname
  return `https://images.unsplash.com/photo-1524492707947-28a0ca8c3bb2?auto=format&fit=crop&q=80&w=1200&q=${encodeURIComponent(query)}`;
};

// More specific fallback images for major Indian destinations
const FALLBACKS = {
  'Delhi': 'https://images.unsplash.com/photo-1587474260584-1f35a7a8b431?auto=format&fit=crop&q=80&w=1200',
  'Mumbai': 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&q=80&w=1200',
  'Jaipur': 'https://images.unsplash.com/photo-1477584158296-607e9db8f0f9?auto=format&fit=crop&q=80&w=1200',
  'Kerala': 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=1200',
  'Goa': 'https://images.unsplash.com/photo-1512757776204-1246914d5218?auto=format&fit=crop&q=80&w=1200',
  'Ladakh': 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=1200'
};

export const getThemedPhoto = (city) => {
  const normalized = city.split(',')[0].trim();
  return FALLBACKS[normalized] || `https://images.unsplash.com/featured/?india,travel,${normalized}`;
};
