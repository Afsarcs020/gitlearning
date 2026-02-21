import React from "react";
import {
  Box,
  Card,
  Button,
  Typography,
  Chip,
} from "@ellucian/react-design-system/core";
import { Icon } from "@ellucian/ds-icons/lib";

const AnnouncementCard = ({ announcement, onEdit, onDelete }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryColor = (category) => {
    const categoryColors = {
      general: "primary",
      library: "secondary",
      academic: "error",
      events: "warning",
      student: "success",
      teacher: "info",
    };
    return categoryColors[category] || "default";
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 3,
        },
      }}
      elevation={1}
    >
      {/* Card Content */}
      <Box
        sx={{
          flex: 1,
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        {/* Header: Title + Pinned Badge */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 1.5,
            mb: 0.5,
          }}
        >
          <Typography
            variant="h3"
            component="h3"
            sx={{
              m: 0,
              flex: 1,
              lineHeight: 1.4,
              fontWeight: 600,
              color: "text.primary",
            }}
          >
            {announcement.title}
          </Typography>
          {announcement.pinned && (
            <Chip
              label="Pinned"
              size="small"
              icon={<Icon name="pin" style={{ fontSize: "14px" }} />}
              sx={{
                bgcolor: "warning.light",
                color: "warning.dark",
                fontWeight: 600,
                fontSize: "0.6875rem",
                height: 24,
                // add padding to the left of the icon
                "& .MuiChip-icon": {
                  marginLeft: "4px",
                },
              }}
            />
          )}
        </Box>

        {/* Category Badge */}
        <Box sx={{ mb: 0.5 }}>
          <Chip
            label={
              announcement.category.charAt(0).toUpperCase() +
              announcement.category.slice(1)
            }
            size="small"
            color={getCategoryColor(announcement.category)}
            sx={{
              fontWeight: 600,
              fontSize: "0.6875rem",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              height: 24,
            }}
          />
        </Box>

        {/* Description */}
        <Typography
          variant="body1"
          sx={{
            m: 0,
            flex: 1,
            fontSize: "0.875rem",
            color: "text.secondary",
            lineHeight: 1.6,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {announcement.description}
        </Typography>

        {/* Date */}
        <Box
          sx={{
            pt: 1.5,
            mt: "auto",
            borderTop: 1,
            borderColor: "divider",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: "text.disabled",
              fontSize: "0.75rem",
            }}
          >
            <Icon
              name="calendar_today"
              style={{ fontSize: "14px", opacity: 0.7 }}
            />
            {formatDate(announcement.date || announcement.createdAt)}
          </Typography>
        </Box>
      </Box>

      {/* Action Buttons */}
      {/* <Box
        sx={{
          display: "flex",
          gap: 1.5,
          p: 2,
          pt: 1.5,
          borderTop: 1,
          borderColor: "divider",
          bgcolor: "background.default",
        }}
      >
        <Button
          variant="text"
          color="primary"
          onClick={() => onEdit(announcement)}
          aria-label={`Edit ${announcement.title}`}
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.75,
            py: 1,
            fontWeight: 500,
            fontSize: "0.875rem",
          }}
        >
          <Icon name="edit" style={{ fontSize: "16px" }} />
          Edit
        </Button>
        <Button */}
      {/* variant="text"
          color="error"
          onClick={() => onDelete(announcement._id)}
          aria-label={`Delete ${announcement.title}`}
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.75,
            py: 1,
            fontWeight: 500,
            fontSize: "0.875rem",
          }}
        >
          <Icon name="trash" style={{ fontSize: "16px" }} />
          Delete
        </Button> */}

      {/* </Box> */}
      {/* Action Buttons - Centered with Clear Spacing */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          justifyContent: "center",
          pt: 2,
        }}
      >
        {/* Edit Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => onEdit(announcement)}
          startIcon={<Icon name="edit" />}
          sx={{
            flex: 1,
            py: 1.25,
            px: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            fontSize: "0.875rem",
            fontWeight: 500,
            textTransform: "none",
            "&:hover": {
              bgcolor: "primary.light",
            },
          }}
        >
          Edit
        </Button>
        {/* Delete Button */}
        <Button
          variant="contained"
          color="error"
          onClick={() => onDelete(announcement._id)}
          startIcon={<Icon name="trash" />}
          sx={{
            flex: 1,
            py: 1.25,
            px: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            fontSize: "0.875rem",
            fontWeight: 500,
            textTransform: "none",
            "&:hover": {
              bgcolor: "error.light",
            },
          }}
        >
          Delete
        </Button>
      </Box>
    </Card>
  );
};

export default AnnouncementCard;
