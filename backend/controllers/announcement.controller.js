import Announcement from "../models/announcement.model.js";
import mongoose, { mongo } from "mongoose";

export const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    // const announcements = await Announcement.find({});

    res.status(200).json({ success: true, data: announcements });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch announcements.",
      error: error.message,
    });
  }
};

export const createAnnouncement = async (req, res) => {
  const { title, description, category, pinned } = req.body;

  if (!title || !description || !category) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all required fields." });
  }

  const newAnnouncement = new Announcement({
    title,
    description,
    category,
    pinned: pinned || false,
  });

  try {
    await newAnnouncement.save();
    res.status(201).json({
      success: true,
      message: "Announcement created successfully.",
      data: newAnnouncement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create announcement.",
      error: error.message,
    });
  }
};

export const updateAnnouncement = async (req, res) => {
  const { id } = req.params;
  const announcementData = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Announcement ID." });
  }

  try {
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      id,
      announcementData,
      {
        new: true, // return updated document
        runValidators: true, // apply schema validation
      },
    );

    if (!updatedAnnouncement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Announcement updated successfully.",
      data: updatedAnnouncement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update announcement.",
      error: error.message,
    });
  }
};

export const deleteAnnouncement = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Announcement ID." });
  }
  console.log("ID to delete:", id); // Debugging log
  try {
    await Announcement.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Announcement deleted successfully." });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete, announcement not found",
      error: error.message,
    });
  }
};
