import express from 'express';
import { sendMessage, getChatMessages } from '../controllers/message.controller.js';
import protect from '../middleware/auth.middleware.js';

const router = express.Router();

// All message routes are private (require authentication)
router.use(protect);

router.post('/', sendMessage);
router.get('/:chatId', getChatMessages);

export default router;
