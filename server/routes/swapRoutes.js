import express from "express";
import { 
  createSwapRequest, 
  getIncomingRequests,
  getOutgoingRequests, 
  acceptSwapRequest,
  rejectSwapRequest,
  cancelSwapRequest,
  getSwapHistory,
} from "../controllers/swapController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createSwapRequest);

router.get("/incoming", authMiddleware, getIncomingRequests);
router.get("/outgoing", authMiddleware, getOutgoingRequests);
router.patch("/accept/:id" , authMiddleware, acceptSwapRequest);
router.patch("/reject/:id",authMiddleware, rejectSwapRequest);
router.patch("/cancel/:id", authMiddleware, cancelSwapRequest);
router.get("/history", authMiddleware, getSwapHistory);

export default router;
