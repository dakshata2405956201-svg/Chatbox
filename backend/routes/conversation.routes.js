
import express from 'express';
import { createConversation, getUserConversations } from '../controllers/conversation.controller.js';
import protect from '../middleware/auth.middleware.js';

const router = express.Router();

// All conversation routes are private (require authentication)
router.post('/', protect, createConversation);
router.get('/', protect, getUserConversations);

export default router;
