import express from 'express';
import { testAI } from '../controllers/test.controller.js';

const router = express.Router();

// Public route for testing Gemini API integration
router.get('/', testAI);

export default router;
