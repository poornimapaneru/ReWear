import Clothing from "../models/Clothing.js";

// Add New Clothing
export const addClothing = async (req, res) => {
  try {
    // Check if image was uploaded
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a clothing image",
      });
    }

    const clothing = await Clothing.create({
      ...req.body,
      image: `/uploads/${req.file.filename}`,
      owner: req.user.id,
    });

    res.status(201).json({
      message: "Clothing added successfully",
      clothing,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding clothing",
      error: error.message,
    });
  }
};

// Get All Clothing
export const getAllClothing = async (req, res) => {
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

// Get My Listings
export const getMyListings = async (req, res) => {
  try {
    const clothes = await Clothing.find({
      owner: req.user.id,
    });

    res.status(200).json(clothes);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching your listings",
      error: error.message,
    });
  }
};

// Get Single Clothing
export const getClothingById = async (req, res) => {
  try {
    const { id } = req.params;

    const clothing = await Clothing.findById(id).populate(
      "owner",
      "name email"
    );

    if (!clothing) {
      return res.status(404).json({
        message: "Clothing listing not found",
      });
    }

    res.status(200).json(clothing);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching clothing listing",
      error: error.message,
    });
  }
};

// Update Clothing Listing
export const updateClothing = async (req, res) => {
  try {
    const { id } = req.params;

    const clothing = await Clothing.findById(id);

    if (!clothing) {
      return res.status(404).json({
        message: "Clothing listing not found",
      });
    }

    // Only the owner can edit the listing
    if (clothing.owner.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not allowed to edit this listing",
      });
    }

    const updatedClothing = await Clothing.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      message: "Clothing listing updated successfully",
      clothing: updatedClothing,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating clothing listing",
      error: error.message,
    });
  }
};

// Delete Clothing Listing
export const deleteClothing = async (req, res) => {
  try {
    const { id } = req.params;

    const clothing = await Clothing.findById(id);

    if (!clothing) {
      return res.status(404).json({
        message: "Clothing listing not found",
      });
    }

    // Only the owner can delete the listing
    if (clothing.owner.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not allowed to delete this listing",
      });
    }

    await Clothing.findByIdAndDelete(id);

    res.status(200).json({
      message: "Clothing listing deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting clothing listing",
      error: error.message,
    });
  }
};