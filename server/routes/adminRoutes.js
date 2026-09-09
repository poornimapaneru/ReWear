import express from "express";

import {
  getAllUsers,
  getAllClothingAdmin,
  deleteClothingAdmin,
  getAllSwapActivities,
  getAllDisputes,
  resolveDispute,
  getAnalytics,
} from "../controllers/adminController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Get All Users - Admin
router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  getAllUsers
);

// Get All Clothing Listings - Admin
router.get(
  "/listings",
  authMiddleware,
  adminMiddleware,
  getAllClothingAdmin
);

// Delete Clothing Listing - Admin
router.delete(
  "/listings/:id",
  authMiddleware,
  adminMiddleware,
  deleteClothingAdmin
);

// Get All Swap Activities - Admin
router.get(
  "/swaps",
  authMiddleware,
  adminMiddleware,
  getAllSwapActivities
);

// Get All Disputes - Admin
router.get(
  "/disputes",
  authMiddleware,
  adminMiddleware,
  getAllDisputes
);

// Resolve Dispute - Admin
router.patch(
  "/disputes/:id/resolve",
  authMiddleware,
  adminMiddleware,
  resolveDispute
);

// Get Platform Analytics - Admin
router.get(
  "/analytics",
  authMiddleware,
  adminMiddleware,
  getAnalytics
);

export default router;