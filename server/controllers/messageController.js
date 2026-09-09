import Message from "../models/Message.js";
import SwapRequest from "../models/SwapRequest.js";

// Send Message
export const sendMessage = async (req, res) => {
  try {
    const { swapRequestId, message } = req.body;

    if (!swapRequestId || !message?.trim()) {
      return res.status(400).json({
        message: "Swap request and message are required",
      });
    }

    const swapRequest = await SwapRequest.findById(swapRequestId);

    if (!swapRequest) {
      return res.status(404).json({
        message: "Swap request not found",
      });
    }

    // Only requester or owner can access this conversation
    const userId = req.user.id;

    const isParticipant =
      swapRequest.requester.toString() === userId ||
      swapRequest.owner.toString() === userId;

    if (!isParticipant) {
      return res.status(403).json({
        message: "You are not allowed to send messages in this chat",
      });
    }

    // Determine the receiver
    const receiver =
      swapRequest.requester.toString() === userId
        ? swapRequest.owner
        : swapRequest.requester;

    const newMessage = await Message.create({
      sender: userId,
      receiver,
      swapRequest: swapRequestId,
      message: message.trim(),
    });

    const populatedMessage = await Message.findById(
      newMessage._id
    )
      .populate("sender", "name email")
      .populate("receiver", "name email");

    res.status(201).json({
      message: "Message sent successfully",
      chatMessage: populatedMessage,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error sending message",
      error: error.message,
    });
  }
};

// Get Messages for a Swap Request
export const getMessages = async (req, res) => {
  try {
    const { swapRequestId } = req.params;

    const swapRequest = await SwapRequest.findById(swapRequestId);

    if (!swapRequest) {
      return res.status(404).json({
        message: "Swap request not found",
      });
    }

    // Only requester or owner can view this conversation
    const userId = req.user.id;

    const isParticipant =
      swapRequest.requester.toString() === userId ||
      swapRequest.owner.toString() === userId;

    if (!isParticipant) {
      return res.status(403).json({
        message: "You are not allowed to view this chat",
      });
    }

    const messages = await Message.find({
      swapRequest: swapRequestId,
    })
      .populate("sender", "name email")
      .populate("receiver", "name email")
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching messages",
      error: error.message,
    });
  }
};