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
   
