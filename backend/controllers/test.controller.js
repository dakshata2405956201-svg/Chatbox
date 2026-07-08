import { generateFashionResponse } from '../services/gemini.service.js';

// @desc    Test route to verify Gemini AI integration
// @route   GET /api/test-ai
// @access  Public
const testAI = async (req, res) => {
  try {
    const prompt = 'Suggest a smart casual outfit for a college student.';
    const aiResponse = await generateFashionResponse(prompt);

    res.status(200).json({
      success: true,
      prompt,
      response: aiResponse,
    });
  } catch (error) {
    console.error('Test AI endpoint error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error occurred during AI generation',
    });
  }
};

export { testAI };
