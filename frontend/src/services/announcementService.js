/* global fetch */

const API_BASE_URL = "http://localhost:5000/api/announcements";

/**
 * Fetch all announcements
 */
export const fetchAnnouncements = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    const data = await response.json();

    if (data.success) {
      return { success: true, data: data.data };
    } else {
      return {
        success: false,
        message: data.message || "Failed to fetch announcements",
      };
    }
  } catch (error) {
    return { success: false, message: error.message || "Network error" };
  }
};

/**
 * Create a new announcement
 */
export const createAnnouncement = async (announcement) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(announcement),
    });
    const data = await response.json();

    if (data.success) {
      return { success: true, message: data.message, data: data.data };
    } else {
      return {
        success: false,
        message: data.message || "Failed to create announcement",
      };
    }
  } catch (error) {
    return { success: false, message: error.message || "Network error" };
  }
};

/** 
 * Update an announcement
 */
export const updateAnnouncement = async (id, updatedData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    const data = await response.json();

    if (data.success) {
      return { success: true, message: data.message, data: data.data };
    } else {
      return {
        success: false,
        message: data.message || "Failed to update announcement",
      };
    }
  } catch (error) {
    return { success: false, message: error.message || "Network error" };
  }
};

/**
 * Delete an announcement
 */
export const deleteAnnouncement = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();

    if (data.success) {
      return { success: true, message: data.message };
    } else {
      return {
        success: false,
        message: data.message || "Failed to delete announcement",
      };
    }
  } catch (error) {
    return { success: false, message: error.message || "Network error" };
  }
};
