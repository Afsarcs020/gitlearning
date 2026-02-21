import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    // 1️⃣ Dropdown field (Category)
    category: {
      type: String,
      enum: ["general", "library", "academic", "events", "student", "teacher"],
      default: "general",
      required: true,
    },

    // 2️⃣ Checkbox field (Pin announcement)
    pinned: {
      type: Boolean,
      default: false,
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const Announcement = mongoose.model("Announcement", announcementSchema);

export default Announcement;
