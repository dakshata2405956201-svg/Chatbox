import Chat from '../models/Chat.model.js';
import Message from '../models/Message.model.js';

// @desc    Create a new empty AI chat session
// @route   POST /api/chats
// @access  Private
const createChat = async (req, res) => {
  try {
    const { title } = req.body;
    const userId = req.user._id;

    const chat = await Chat.create({
      user: userId,
      title: title && title.trim() ? title : 'New Chat',
    });

    res.status(201).json({
      success: true,
      data: chat,
    });
  } catch (error) {
    console.error('Create chat error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
};

// @desc    Get all chat sessions belonging to the authenticated user
// @route   GET /api/chats
// @access  Private
const getUserChats = async (req, res) => {
  try {
    const userId = req.user._id;

    const chats = await Chat.find({ user: userId }).sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      data: chats,
    });
  } catch (error) {
    console.error('Get user chats error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
};

// @desc    Delete a chat session and all its associated messages
// @route   DELETE /api/chats/:id
// @access  Private
const deleteChat = async (req, res) => {
  try {
    const chatId = req.params.id;
    const userId = req.user._id;

    // Verify the chat exists and belongs to the authenticated user
    const chat = await Chat.findOne({ _id: chatId, user: userId });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found or unauthorized',
      });
    }

    // Delete all messages associated with this chat
    await Message.deleteMany({ chat: chatId });

    // Delete the chat itself
    await Chat.findByIdAndDelete(chatId);

    res.status(200).json({
      success: true,
      message: 'Chat and associated messages deleted successfully',
    });
  } catch (error) {
    console.error('Delete chat error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
};

export { createChat, getUserChats, deleteChat };
