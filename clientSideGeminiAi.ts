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
