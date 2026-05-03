/**
 * InTravel AI - Gemini Service (Secure Fetch Version)
 * Using direct fetch to avoid SDK 'Forbidden' browser errors
 */

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const generateItinerary = async (destination, days, budget, travelers, dna) => {
  if (!API_KEY) {
    throw new Error("Gemini API Key missing. Please check your .env file.");
  }

  const dnaString = dna ? Object.entries(dna).map(([k, v]) => `${k}: ${v}`).join(', ') : 'standard';

  const prompt = `
    You are an expert Indian travel planner. 
    Generate a detailed day-wise travel itinerary for ${days} days in ${destination}, India.
    The budget is ${budget} and there are ${travelers} travelers.
    The traveler's DNA profile is: ${dnaString}.
    
    Format the response as a valid JSON object with the following structure:
    {
      "trip_name": "...",
      "summary": "...",
      "estimated_total_cost": "₹...",
      "days": [
        {
          "day": 1,
          "title": "...",
          "activities": ["...", "..."],
          "suggested_hotel": { "name": "...", "price_range": "..." },
          "suggested_transport": { "mode": "...", "cost_estimate": "..." }
        }
      ]
    }
    
    Ensure the itinerary is realistic, includes popular and hidden gems in ${destination}, and respects the ${budget} budget.
    IMPORTANT: Return ONLY the JSON object, no other text.
  `;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message);
    }

    const text = data.candidates[0].content.parts[0].text;
    
    // Robust JSON extraction: Find the first '{' and last '}'
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');
    
    if (firstBrace === -1 || lastBrace === -1) {
      throw new Error("AI returned invalid data format. Please try again.");
    }
    
    const jsonStr = text.substring(firstBrace, lastBrace + 1);
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Gemini Engine Error:", error);
    throw error;
  }
};
