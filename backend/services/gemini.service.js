import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Google Generative AI client using the API key from environment variables
const getGenAIInstance = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('Warning: GEMINI_API_KEY is not defined in environment variables.');
  }
  return new GoogleGenerativeAI(apiKey || 'DUMMY_KEY');
};

const genAI = getGenAIInstance();

/**
 * Sends a fashion/clothing prompt to Google Gemini and returns the generated text.
 * @param {string} prompt - The fashion query prompt from the user
 * @returns {Promise<string>} - The AI generated text response
 */
const generateFashionResponse = async (prompt) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is missing from environment variables.');
    }

    // Using gemini-1.5-flash model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error(`Gemini Service Error: ${error.message}`);
  }
};

export { generateFashionResponse };
