Client-Side Gemini Service (src/services/geminiService.ts)
This module wraps the Gemini call inside a single function with comprehensive error boundaries.

  import { GoogleGenAI } from '@google/genai';

// Define expected response type for UI state handling
export interface AiResponseResult {
  success: boolean;
  answer?: string;
  error?: string;
}

/**
 * Handles calling Gemini directly from the client.
 */
export async function askGeminiDirectly(
  question: string,
  weatherData: VisualCrossingWeatherData | null,
  apiKey: string
): Promise<AiResponseResult> {
  // Edge Case 1: Missing API Key
  if (!apiKey || apiKey.trim() === '') {
    return {
      success: false,
      error: 'API Key is missing. Please provide a valid Gemini API Key.'
    };
  }

  // Edge Case 2: Empty Question
  const cleanQuestion = question.trim();
  if (!cleanQuestion) {
    return {
      success: false,
      error: 'Please enter a question before sending.'
    };
  }
  // Edge Case 3: Missing Weather Context
  if (!weatherData || !weatherData.days || weatherData.days.length === 0) {
    return {
      success: false,
      error: 'Weather data is unavailable. Please load weather data first.'
    };
  }

  try {
    // 1. Initialize the official SDK client
    const ai = new GoogleGenAI({ apiKey });

    // 2. Prepare concise weather context (Today's summary + next 8 hours)
    const today = weatherData.days[0];
   
   const upcomingHours = (today.hours || []).slice(0, 8).map(h => ({
      time: h.datetime,
      temp: h.temp,
      feelsLike: h.feelslike,
      conditions: h.conditions,
      rainChance: h.precipprob
    }));

    const systemContext = `
You are a helpful AI weather assistant.
Use ONLY the provided weather data to answer the user's question concisely and accurately.

Location Description: ${today.description}
Today's Date: ${today.datetime}
Temp Range: ${today.tempmin}°C to ${today.tempmax}°C (Current/Avg: ${today.temp}°C, Feels like: ${today.feelslike}°C)
Conditions: ${today.conditions} | Humidity: ${today.humidity}% | UV Index: ${today.uvindex}
Upcoming Hours: ${JSON.stringify(upcomingHours)}
`;

                                    // 3. Make API call using gemini-2.5-flash
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: `${systemContext}\n\nUser Question: ${cleanQuestion}` }]
        }
      ]
    });

    // Edge Case 4: Blocked or Empty Model Output
    const textOutput = response.text?.trim();
    if (!textOutput) {
      return {
        success: false,
        error: 'The AI model generated an empty response or the content was flagged by safety filters.'
      };
    }
