import User from "../models/User.js";
import Property from "../models/Property.js";
import mongoose from "mongoose";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Properties fetched successfully",
      data: properties,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch properties",
      error: error.message,
    });
  }
};

export const addPropertyFavourites = async (req, res) => {
  try {
    const { propertyId } = req.params;

    if (!isValidObjectId(propertyId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid property ID",
      });
    }

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.favourites.includes(propertyId)) {
      return res.status(409).json({
        success: false,
        message: "Property already in favourites",
      });
    }

    user.favourites.push(propertyId);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Added to favourites",
      data: user.favourites,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add favourite",
      error: error.message,
    });
  }
};

export const removePropertyFavourites = async (req, res) => {
  try {
    const { propertyId } = req.params;

    if (!isValidObjectId(propertyId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid property ID",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const initialLength = user.favourites.length;

    user.favourites = user.favourites.filter(
      (id) => id.toString() !== propertyId
    );

    if (user.favourites.length === initialLength) {
      return res.status(404).json({
        success: false,
        message: "Property not found in favourites",
      });
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Removed from favourites",
      data: user.favourites,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to remove favourite",
      error: error.message,
    });
  }
};

export const getPropertyFavourites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("favourites");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Favourites fetched successfully",
      data: user.favourites,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch favourites",
      error: error.message,
    });
  }
};