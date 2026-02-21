import React, { useState, useEffect } from "react";
import { Typography, Button } from "@ellucian/react-design-system/core";
import { Icon } from "@ellucian/ds-icons/lib";
import { fetchAnnouncements } from "../services/announcementService";

const FrontendCard = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAnnouncements = async () => {
      setLoading(true);
      const result = await fetchAnnouncements();
      if (result.success) {
        // Get only the first 3 announcements
        setAnnouncements(result.data.slice(0, 3));
      } else {
        setError(result.message);
      }
      setLoading(false);
    };

    loadAnnouncements();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      Academic: "#1976d2",
      "Campus Life": "#388e3c",
      Administration: "#d32f2f",
      Events: "#f57c00",
      Technology: "#7b1fa2",
      General: "#616161",
    };
    return colors[category] || "#616161";
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
        transition: "box-shadow 0.2s, transform 0.2s",
        backgroundColor: "white",
        minHeight: "280px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.08)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Card Content */}
      <div style={{ flex: 1, padding: "24px", overflow: "auto" }}>
        {/* Icon Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "#e3f2fd",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="globe" style={{ fontSize: "24px", color: "#1976d2" }} />
          </div>
          <div>
            <Typography variant="h3" style={{ margin: 0, fontSize: "20px" }}>
              Announcements
            </Typography>
            <span
              style={{
                fontSize: "12px",
                color: "#666",
                backgroundColor: "#f5f5f5",
                padding: "2px 8px",
                borderRadius: "10px",
                display: "inline-block",
                marginTop: "4px",
              }}
            >
              Recent Updates
            </span>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "40px 0",
            }}
          >
            <Typography style={{ color: "#666" }}>
              Loading announcements...
            </Typography>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div
            style={{
              padding: "16px",
              backgroundColor: "#ffebee",
              borderRadius: "4px",
              marginTop: "16px",
            }}
          >
            <Typography style={{ color: "#c62828", fontSize: "14px" }}>
              {error}
            </Typography>
          </div>
        )}

        {/* Announcements List */}
        {!loading && !error && announcements.length > 0 && (
          <div style={{ marginTop: "16px" }}>
            {announcements.map((announcement, index) => (
              <div
                key={announcement._id}
                style={{
                  padding: "12px",
                  backgroundColor: index % 2 === 0 ? "#fafafa" : "white",
                  borderRadius: "4px",
                  marginBottom: "8px",
                  borderLeft: `3px solid ${getCategoryColor(
                    announcement.category,
                  )}`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "4px",
                  }}
                >
                  <Typography
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#333",
                      margin: 0,
                    }}
                  >
                    {announcement.title}
                  </Typography>
                  {announcement.pinned && (
                    <Icon
                      name="push_pin"
                      style={{ fontSize: "14px", color: "#f57c00" }}
                    />
                  )}
                </div>
                <Typography
                  style={{
                    fontSize: "12px",
                    color: "#666",
                    marginBottom: "6px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {announcement.description}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      color: getCategoryColor(announcement.category),
                      backgroundColor: `${getCategoryColor(
                        announcement.category,
                      )}15`,
                      padding: "2px 8px",
                      borderRadius: "10px",
                      fontWeight: 500,
                    }}
                  > 
                    {announcement.category}
                  </span>
                  <Typography style={{ fontSize: "11px", color: "#999" }}>
                    {formatDate(announcement.date)}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && announcements.length === 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "40px 0",
            }}
          >
            <Icon
              name="announcement"
              style={{ fontSize: "48px", color: "#ccc", marginBottom: "12px" }}
            />
            <Typography style={{ color: "#999", fontSize: "14px" }}>
              No announcements available
            </Typography>
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div
        style={{
          padding: "16px 24px",
          borderTop: "1px solid #f0f0f0",
          backgroundColor: "#fafafa",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!loading && !error && announcements.length > 0 && (
          <Button
            variant="contained"
            color="primary"
            style={{
              width: "100%",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Typography
              style={{
                fontSize: "14px",
                fontWeight: 600,
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
              }}
            >
              View More
            </Typography>
            <Icon name="arrow_forward" style={{ fontSize: "18px" }} />
          </Button>
        )}
        {(loading || error || announcements.length === 0) && (
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Icon name="info" style={{ fontSize: "14px", color: "#999" }} />
            <Typography style={{ fontSize: "12px", color: "#999" }}>
              Click card to view all announcements
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default FrontendCard;
