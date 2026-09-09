import User from "../models/User.js";
import Clothing from "../models/Clothing.js";
import SwapRequest from "../models/SwapRequest.js";

// Get All Users - Admin
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Clothing - Admin
export const getAllClothingAdmin = async (req, res) => {
  try {
    const clothes = await Clothing.find().populate(
      "owner",
      "name email"
    );

    res.status(200).json(clothes);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching clothing items",
      error: error.message,
    });
  }
};

// Delete Clothing Listing - Admin
export const deleteClothingAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const clothing = await Clothing.findById(id);

    if (!clothing) {
      return res.status(404).json({
        message: "Clothing listing not found",
      });
    }

    await Clothing.findByIdAndDelete(id);

    res.status(200).json({
      message: "Clothing listing deleted successfully by admin",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting clothing listing",
      error: error.message,
    });
  }
};

// Get All Swap Activities - Admin
export const getAllSwapActivities = async (req, res) => {
  try {
    const swaps = await SwapRequest.find()
      .populate("requester", "name email")
      .populate("owner", "name email")
      .populate("clothing");

    res.status(200).json(swaps);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching swap activities",
      error: error.message,
    });
  }
};

// Get All Disputes - Admin
export const getAllDisputes = async (req, res) => {
  try {
    const disputes = await SwapRequest.find({
      disputeStatus: { $in: ["Open", "Resolved"] },
    })
      .populate("requester", "name email")
      .populate("owner", "name email")
      .populate("clothing");

    res.status(200).json(disputes);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching disputes",
      error: error.message,
    });
  }
};

// Resolve Dispute - Admin
export const resolveDispute = async (req, res) => {
  try {
    const { id } = req.params;
    const { adminNote } = req.body;

    const dispute = await SwapRequest.findById(id);

    if (!dispute) {
      return res.status(404).json({
        message: "Dispute not found",
      });
    }

    if (dispute.disputeStatus !== "Open") {
      return res.status(400).json({
        message: "Only open disputes can be resolved",
      });
    }

    dispute.disputeStatus = "Resolved";
    dispute.adminNote = adminNote || "";
    dispute.resolvedAt = new Date();

    await dispute.save();

    res.status(200).json({
      message: "Dispute resolved successfully",
      dispute,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error resolving dispute",
      error: error.message,
    });
  }
};

// Get Platform Analytics - Admin
export const getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalListings = await Clothing.countDocuments();

    const totalSwapRequests = await SwapRequest.countDocuments();

    const successfulSwaps = await SwapRequest.countDocuments({
      status: "Accepted",
    });

    const pendingSwaps = await SwapRequest.countDocuments({
      status: "Pending",
    });

    const rejectedSwaps = await SwapRequest.countDocuments({
      status: "Rejected",
    });

    res.status(200).json({
      totalUsers,
      totalListings,
      totalSwapRequests,
      successfulSwaps,
      pendingSwaps,
      rejectedSwaps,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching analytics",
      error: error.message,
    });
  }
};