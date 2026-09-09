import express from "express";
import {
  addClothing,
  getAllClothing,
  getMyListings,
  getClothingById,
  updateClothing,
  deleteClothing,
} from "../controllers/ClothingController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Add Clothing
router.post("/add", authMiddleware, upload.single("image"), addClothing);

// Get My Listings
router.get("/my-listings", authMiddleware, getMyListings);

// Get All Clothing
router.get("/", authMiddleware, getAllClothing);

// Get Single Clothing
router.get("/:id", authMiddleware, getClothingById);

// Update Clothing Listing
router.put("/:id", authMiddleware, updateClothing);

// Delete Clothing Listing
router.delete("/:id", authMiddleware, deleteClothing);

export default router;