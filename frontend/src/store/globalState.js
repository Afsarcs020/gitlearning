/* global fetch */
import { create } from "zustand";

export const useGlobalState = create((set) => ({
  announcements: [],
  setAnnouncements: (announcements) => set({ announcements }),
  createAnnouncement: async (announcement) => {
    if (
      !announcement.title ||
      !announcement.description ||
      !announcement.category
    ) {
      return {
        success: false,
        message: "Title, description, and category are required.",
      };
    }
    const res = await fetch("http://localhost:5000/api/announcements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(announcement),
    });
    const data = await res.json();
    if (res.ok) {
      set((state) => ({
        announcements: [...state.announcements, data],
      }));
      return { success: true, message: "Announcement created successfully." };
    } else {
      return {
        success: false,
        message: data.message || "Failed to create announcement.",
      };
    }
  },
  fetchAnnouncements: async () => {
    const res = await fetch("http://localhost:5000/api/announcements");
    const data = await res.json();
    if (res.ok) {
      set({ announcements: data });
    } else {
      console.error("Failed to fetch announcements:", data.message);
    }
  },
  deleteAnnouncement: async (id) => {
    const res = await fetch(`http://localhost:5000/api/announcements/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (res.ok) {
      set((state) => ({
        announcements: state.announcements.filter(
          (announcement) => announcement._id !== id,
        ),
      }));
      return { success: true, message: "Announcement deleted successfully." };
    } else {
      return {
        success: false,
        message: data.message || "Failed to delete announcement.",
      };
    }
  },
  updateAnnouncement: async (id, updatedData) => {
    const res = await fetch(`http://localhost:5000/api/announcements/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    const data = await res.json();
    if (res.ok) {
      set((state) => ({
        announcements: state.announcements.map((announcement) =>
          announcement._id === id ? data : announcement,
        ),
      }));
      return { success: true, message: "Announcement updated successfully." };
    } else {
      return {
        success: false,
        message: data.message || "Failed to update announcement.",
      };
    }
  },
}));
