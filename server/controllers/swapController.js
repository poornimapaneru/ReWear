import SwapRequest from "../models/SwapRequest.js";
import Clothing from "../models/Clothing.js";


// Create Swap Request
export const createSwapRequest = async (req, res) => {
  try {
    const { clothing } = req.body;

    const requester = req.user.id;

    // Clothing find karo
    const item = await Clothing.findById(clothing);

    if (!item) {
      return res.status(404).json({
        message: "Clothing item not found",
      });
    }

    // Duplicate request check
    const existingRequest = await SwapRequest.findOne({
      requester,
      clothing,
      status: "Pending",
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "Swap request already sent.",
      });
    }

    const swapRequest = await SwapRequest.create({
      requester,
      owner: item.owner,
      clothing,
    });

    res.status(201).json({
      message: "Swap request sent successfully.",
      swapRequest,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// Get Incoming Swap Requests
export const getIncomingRequests = async (req, res) => {
  try {

    const requests = await SwapRequest.find({
      owner: req.user.id,
    })
      .populate("requester", "name email")
      .populate("clothing");


    res.status(200).json(requests);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Get Outgoing Swap Requests
export const getOutgoingRequests = async (req, res) => {
  try {

    const requests = await SwapRequest.find({
      requester: req.user.id,
    })
      .populate("owner", "name email")
      .populate("clothing");


    res.status(200).json(requests);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Accept Swap Request
export const acceptSwapRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await SwapRequest.findById(id);

    if (!request) {
      return res.status(404).json({
        message: "Swap request not found",
      });
    }

    // Accept current request
    request.status = "Accepted";
    await request.save();

    // Update clothing status
    await Clothing.findByIdAndUpdate(request.clothing, {
      status: "Swapped",
    });

    // Reject all other pending requests for the same clothing
    await SwapRequest.updateMany(
      {
        clothing: request.clothing,
        _id: { $ne: request._id },
        status: "Pending",
      },
      {
        status: "Rejected",
      }
    );

    res.status(200).json({
      message: "Swap request accepted successfully.",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Reject Swap Request
export const rejectSwapRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await SwapRequest.findById(id);

    if (!request) {
      return res.status(404).json({
        message: "Swap request not found",
      });
    }

    request.status = "Rejected";

    await request.save();

    res.status(200).json({
      message: "Swap request rejected successfully.",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Cancel Swap Request
export const cancelSwapRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await SwapRequest.findById(id);

    if (!request) {
      return res.status(404).json({
        message: "Swap request not found",
      });
    }

    // Only requester can cancel their own request
    if (request.requester.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not allowed to cancel this request",
      });
    }

    // Only pending requests can be cancelled
    if (request.status !== "Pending") {
      return res.status(400).json({
        message: "Only pending requests can be cancelled",
      });
    }

    request.status = "Rejected";

    await request.save();

    res.status(200).json({
      message: "Swap request cancelled successfully.",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Swap History
export const getSwapHistory = async (req, res) => {
  try {

    const history = await SwapRequest.find({
      $or: [
        { requester: req.user.id },
        { owner: req.user.id },
      ],
      status: { $in: ["Accepted", "Rejected"] },
    })
      .populate("requester", "name email")
      .populate("owner", "name email")
      .populate("clothing");

    res.status(200).json(history);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};