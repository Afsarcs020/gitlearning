/* global setTimeout */

import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Chip,
  Paper,
  Alert,
  CircularProgress,
} from "@ellucian/react-design-system/core";
import { Icon } from "@ellucian/ds-icons/lib";
import Navbar from "../components/Navbar";
import AnnouncementCard from "../components/AnnouncementCard";
import AnnouncementForm from "../components/AnnouncementForm";
import {
  fetchAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "../services/announcementService";

const AnnouncementsPage = () => {
  // State Management
  const [announcements, setAnnouncements] = useState([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal State
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("create");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  // Filter State
  const [filters, setFilters] = useState({
    category: "all",
    sortBy: "recent",
    searchTerm: "",
  });

  // Toast State
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Fetch announcements on mount
  useEffect(() => {
    loadAnnouncements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Apply filters whenever announcements or filters change
  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [announcements, filters]);

  const loadAnnouncements = async () => {
    setLoading(true);
    setError(null);
    const result = await fetchAnnouncements();

    if (result.success) {
      setAnnouncements(result.data);
    } else {
      setError(result.message);
      showToast(result.message, "error");
    }
    setLoading(false);
  };

  const applyFilters = () => {
    let filtered = [...announcements];

    // Category Filter
    if (filters.category !== "all") {
      filtered = filtered.filter((a) => a.category === filters.category);
    }

    // Search Filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(searchLower) ||
          a.description.toLowerCase().includes(searchLower),
      );
    }

    // Sort
    if (filters.sortBy === "recent") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (filters.sortBy === "oldest") {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (filters.sortBy === "az") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    // Pinned announcements first
    filtered.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

    setFilteredAnnouncements(filtered);
  };

  const handleCreateClick = () => {
    setFormMode("create");
    setSelectedAnnouncement(null);
    setFormOpen(true);
  };

  const handleEditClick = (announcement) => {
    setFormMode("edit");
    setSelectedAnnouncement(announcement);
    setFormOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    if (formMode === "create") {
      const result = await createAnnouncement(formData);
      if (result.success) {
        showToast(result.message, "success");
        loadAnnouncements();
      } else {
        showToast(result.message, "error");
      }
    } else {
      const result = await updateAnnouncement(
        selectedAnnouncement._id,
        formData,
      );
      if (result.success) {
        showToast(result.message, "success");
        loadAnnouncements();
      } else {
        showToast(result.message, "error");
      }
    }
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      const result = await deleteAnnouncement(id);
      if (result.success) {
        showToast(result.message, "success");
        loadAnnouncements();
      } else {
        showToast(result.message, "error");
      }
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const showToast = (message, severity = "success") => {
    setToast({
      open: true,
      message,
      severity,
    });

    setTimeout(() => {
      setToast((prev) => ({
        ...prev,
        open: false,
      }));
    }, 4000);
  };

  const handleToastClose = () => {
    setToast((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      {/* Navbar */}
      <Navbar
        onFilter={handleFilterChange}
        onSort={(value) => handleFilterChange("sortBy", value)}
        onSearch={(value) => handleFilterChange("searchTerm", value)}
        onCreateClick={handleCreateClick}
        filters={filters}
      />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          py: 5,
          px: 3,
          maxWidth: 1400,
          mx: "auto",
        }}
      >
        {/* Loading State */}
        {loading && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 400,
              gap: 2,
            }}
          >
            <CircularProgress size={48} />
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              Loading announcements...
            </Typography>
          </Box>
        )}

        {/* Error State */}
        {error && !loading && (
          <Paper
            elevation={1}
            sx={{
              maxWidth: 600,
              mx: "auto",
              textAlign: "center",
              p: 5,
            }}
          >
            <Icon
              name="error"
              style={{
                fontSize: "48px",
                color: "var(--eds-color-error, #f44336)",
              }}
            />
            <Alert
              severity="error"
              sx={{
                mt: 2,
                mb: 2.5,
                textAlign: "left",
              }}
            >
              {error}
            </Alert>
            <Button
              onClick={loadAnnouncements}
              color="primary"
              variant="contained"
              startIcon={<Icon name="refresh" />}
            >
              Retry
            </Button>
          </Paper>
        )}

        {/* Empty State */}
        {!loading && !error && filteredAnnouncements.length === 0 && (
          <Paper
            elevation={1}
            sx={{
              maxWidth: 600,
              mx: "auto",
              textAlign: "center",
              py: 5,
              px: 3,
            }}
          >
            <Icon
              name="campaign"
              style={{
                fontSize: "64px",
                color: "var(--eds-color-text-disabled, #999)",
              }}
            />
            <Typography
              variant="h3"
              sx={{
                mt: 2.5,
                mb: 1.5,
                fontWeight: 600,
              }}
            >
              No announcements found
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                mb: 3,
              }}
            >
              {filters.searchTerm || filters.category !== "all"
                ? "Try adjusting your filters"
                : "Get started by creating your first announcement"}
            </Typography>
          </Paper>
        )}

        {/* Announcements Grid */}
        {!loading && !error && filteredAnnouncements.length > 0 && (
          <Box>
            {/* Results Header */}
            <Paper
              elevation={0}
              sx={{
                mb: 3,
                p: 2.5,
                border: 1,
                borderColor: "divider",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                }}
              >
                <Icon
                  name="list"
                  style={{
                    fontSize: "22px",
                    color: "var(--eds-color-primary, #1976d2)",
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.primary",
                    fontWeight: 500,
                    fontSize: "15px",
                  }}
                >
                  <Box component="strong" sx={{ fontWeight: 700 }}>
                    {filteredAnnouncements.length}
                  </Box>{" "}
                  of{" "}
                  <Box component="strong" sx={{ fontWeight: 700 }}>
                    {announcements.length}
                  </Box>{" "}
                  announcements
                </Typography>
              </Box>
              {(filters.category !== "all" || filters.searchTerm) && (
                <Chip
                  label="Filtered"
                  size="small"
                  icon={
                    <Icon name="filter_list" style={{ fontSize: "16px" }} />
                  }
                  color="primary"
                  variant="outlined"
                  sx={{
                    fontWeight: 500,
                    fontSize: "12px",
                  }}
                />
              )}
            </Paper>

            {/* Announcements Grid */}
            <Grid
              container
              spacing={3}
              sx={{
                pb: 3,
              }}
            >
              {filteredAnnouncements.map((announcement) => (
                <Grid item xs={12} sm={6} md={4} lg={4} key={announcement._id}>
                  <AnnouncementCard
                    announcement={announcement}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteClick}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>

      {/* Form Modal */}
      <AnnouncementForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={selectedAnnouncement}
        mode={formMode}
      />

      {/* Toast Notifications */}
      {toast.open && (
        <Paper
          elevation={8}
          sx={{
            position: "fixed",
            bottom: 3,
            right: 3,
            bgcolor:
              toast.severity === "success" ? "success.main" : "error.main",
            color: "white",
            py: 1.5,
            px: 3,
            borderRadius: 1,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            minWidth: 300,
            animation: "slideIn 0.3s ease-out",
            "@keyframes slideIn": {
              from: {
                transform: "translateX(400px)",
                opacity: 0,
              },
              to: {
                transform: "translateX(0)",
                opacity: 1,
              },
            },
          }}
        >
          <Icon
            name={toast.severity === "success" ? "check_circle" : "error"}
            style={{ fontSize: "20px", color: "white" }}
          />
          <Typography
            variant="body1"
            sx={{
              flex: 1,
              color: "white",
              fontWeight: 500,
            }}
          >
            {toast.message}
          </Typography>
          <Box
            component="button"
            onClick={handleToastClose}
            aria-label="Close notification"
            sx={{
              background: "transparent",
              border: "none",
              color: "white",
              cursor: "pointer",
              p: 0,
              display: "flex",
              alignItems: "center",
              "&:hover": {
                opacity: 0.8,
              },
            }}
          >
            <Icon name="close" style={{ fontSize: "18px" }} />
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default AnnouncementsPage;
