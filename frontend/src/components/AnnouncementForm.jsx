import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Dropdown,
  DropdownItem,
  Checkbox,
  Paper,
} from "@ellucian/react-design-system/core";
import { Icon } from "@ellucian/ds-icons/lib";

const AnnouncementForm = ({
  open,
  onClose,
  onSubmit,
  initialData,
  mode = "create",
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "general",
    pinned: false,
  });

  const [errors, setErrors] = useState({});

  const categoryOptions = [
    { label: "General", value: "general" },
    { label: "Library", value: "library" },
    { label: "Academic", value: "academic" },
    { label: "Events", value: "events" },
    { label: "Student", value: "student" },
    { label: "Teacher", value: "teacher" },
  ];

  // When initialData changes (for edit mode), update formData
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        category: initialData.category || "general",
        pinned: initialData.pinned || false,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        category: "general",
        pinned: false,
      });
    }
    setErrors({});
  }, [initialData, open]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.category) {
      newErrors.category = "Category is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(formData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      category: "general",
      pinned: false,
    });
    setErrors({});
    onClose();
  };

  if (!open) return null;

  return (
    <Box
      role="dialog"
      aria-modal="true"
      aria-labelledby="announcement-form-title"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
      onClick={handleClose}
    >
      <Paper
        elevation={8}
        sx={{
          bgcolor: "background.paper",
          borderRadius: 2,
          maxWidth: 600,
          width: "100%",
          maxHeight: "90vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <Box
          sx={{
            px: 3,
            py: 2.5,
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 1,
              bgcolor: mode === "create" ? "primary.light" : "primary.light",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon
              name={mode === "create" ? "globe" : "edit"}
              style={{
                fontSize: "20px",
                color: mode === "create" ? "white" : "white",
              }}
            />
          </Box>
          <Typography
            variant="h2"
            id="announcement-form-title"
            sx={{
              m: 0,
              fontWeight: 600,
              fontSize: "1.5rem",
            }}
          >
            {mode === "create"
              ? "Create New Announcement"
              : "Edit Announcement"}
          </Typography>
        </Box>

        {/* Modal Body */}
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            px: 3,
            py: 3,
          }}
        >
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2.5,
            }}
          >
            {/* Title Field */}
            <Box>
              <TextField
                label="Title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                error={!!errors.title}
                helperText={errors.title}
                fullWidth
                required
                inputProps={{
                  "aria-label": "Announcement title",
                }}
              />
            </Box>

            {/* Description Field */}
            <Box>
              <TextField
                label="Description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                error={!!errors.description}
                helperText={errors.description}
                multiline
                rows={4}
                fullWidth
                required
                inputProps={{
                  "aria-label": "Announcement description",
                }}
              />
            </Box>

            {/* Category Dropdown */}
            <Box>
              <Dropdown
                label="Category"
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
                error={!!errors.category}
                helperText={errors.category}
                fullWidth
                required
                inputProps={{
                  "aria-label": "Announcement category",
                }}
              >
                {categoryOptions.map((option) => (
                  <DropdownItem
                    key={option.value}
                    label={option.label}
                    value={option.value}
                  />
                ))}
              </Dropdown>
            </Box>

            {/* Pinned Checkbox */}
            <Box
              sx={{
                pt: 1,
                borderTop: 1,
                borderColor: "divider",
              }}
            >
              <Checkbox
                id="pinned-checkbox"
                label="Pin this announcement"
                checked={formData.pinned}
                onChange={(e) => handleChange("pinned", e.target.checked)}
                aria-label="Pin announcement to top of list"
              />{" "}
              Pin
            </Box>
          </Box>
        </Box>

        {/* Modal Footer */}
        <Box
          sx={{
            px: 3,
            py: 2,
            borderTop: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "flex-end",
            gap: 1.5,
            bgcolor: "background.default",
          }}
        >
          <Button
            onClick={handleClose}
            variant="text"
            aria-label="Cancel and close form"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            aria-label={
              mode === "create" ? "Create announcement" : "Update announcement"
            }
          >
            {mode === "create" ? "Create" : "Update"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AnnouncementForm;
