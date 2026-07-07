import Message from '../models/Message.model.js';
import Chat from '../models/Chat.model.js';

// @desc    Send a message in a chat session
// @route   POST /api/messages
// @access  Private
const sendMessage = async (req, res) => {
  try {
    const { chatId, content } = req.body;
    const userId = req.user._id;

    if (!chatId || !content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Chat ID and content are required',
      });
    }

    // Verify chat exists and belongs to the authenticated user
    const chat = await Chat.findOne({ _id: chatId, user: userId });
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat session not found or unauthorized',
      });
    }

    // Save user message
    const message = await Message.create({
      chat: chatId,
      role: 'user',
      content: content.trim(),
    });

    // Update the Chat document's updatedAt timestamp
    chat.updatedAt = new Date();
    await chat.save();

    res.status(201).json({
      success: true,
      data: message,
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
};

// @desc    Get all messages for a specific chat session
// @route   GET /api/messages/:chatId
// @access  Private
const getChatMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user._id;

    // Verify chat exists and belongs to the authenticated user
    const chat = await Chat.findOne({ _id: chatId, user: userId });
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat session not found or unauthorized',
      });
    }

    // Fetch messages sorted by createdAt ascending
    const messages = await Message.find({ chat: chatId }).sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error('Get chat messages error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
};

export { sendMessage, getChatMessages };
