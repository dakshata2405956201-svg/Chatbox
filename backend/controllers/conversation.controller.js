
import Conversation from '../models/Conversation.model.js';
import User from '../models/User.model.js';

// @desc    Create or get existing conversation
// @route   POST /api/conversations
// @access  Private
const createConversation = async (req, res) => {
  try {
    const { recipientId } = req.body;
    const senderId = req.user._id;

    if (!recipientId) {
      return res.status(400).json({
        success: false,
        message: 'Recipient ID is required',
      });
    }

    // Prevent creating a conversation with yourself
    if (senderId.toString() === recipientId.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Cannot create a conversation with yourself',
      });
    }

    // Verify the recipient user exists
    const recipientUser = await User.findById(recipientId);
    if (!recipientUser) {
      return res.status(404).json({
        success: false,
        message: 'Recipient user not found',
      });
    }

    // Check if conversation already exists
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recipientId] },
    }).populate('participants', '-password');

    if (conversation) {
      return res.status(200).json({
        success: true,
        data: conversation,
      });
    }

    // If no existing conversation, create a new one
    conversation = await Conversation.create({
      participants: [senderId, recipientId],
    });

    // Populate participants for response
    conversation = await Conversation.findById(conversation._id).populate(
      'participants',
      '-password'
    );

    res.status(201).json({
      success: true,
      data: conversation,
    });
  } catch (error) {
    console.error('Create conversation error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
};

// @desc    Get all conversations of current user
// @route   GET /api/conversations
// @access  Private
const getUserConversations = async (req, res) => {
  try {
    const userId = req.user._id;

    const conversations = await Conversation.find({
      participants: { $in: [userId] },
    })
      .populate('participants', '-password')
      .populate('lastMessage')
      .sort({ updatedAt: -1 }); // Sort by latest first

    res.status(200).json({
      success: true,
      data: conversations,
    });
  } catch (error) {
    console.error('Get user conversations error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
};

export { createConversation, getUserConversations };
