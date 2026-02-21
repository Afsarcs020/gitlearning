import React from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Dropdown,
  DropdownItem,
  Grid,
} from "@ellucian/react-design-system/core";
import { Icon } from "@ellucian/ds-icons/lib";

const Navbar = ({ onFilter, onSort, onSearch, onCreateClick, filters }) => {
  const { category, sortBy, searchTerm } = filters;

  const categoryOptions = [
    { label: "All Categories", value: "all" },
    { label: "General", value: "general" },
    { label: "Library", value: "library" },
    { label: "Academic", value: "academic" },
    { label: "Events", value: "events" },
    { label: "Student", value: "student" },
    { label: "Teacher", value: "teacher" },
  ];

  const sortOptions = [
    { label: "Most Recent", value: "recent" },
    { label: "Oldest First", value: "oldest" },
    { label: "Alphabetical (A-Z)", value: "az" },
  ];

  return (
    <Box
      component="nav"
      role="navigation"
      aria-label="Announcements navigation"
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        borderBottom: 1,
        borderColor: "divider",
        boxShadow: 1,
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          px: { xs: 2, sm: 3, md: 5 },
          py: 3,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 2,
        }}
      >
        {/* System Title */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: 1,
              bgcolor: "primary.main",
              color: "primary.contrastText",
            }}
          >
            <Icon name="globe" style={{ fontSize: "24px" }} />
          </Box>
          <Typography
            variant="h2"
            sx={{
              m: 0,
              fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
              fontWeight: 600,
              color: "text.primary",
            }}
          >
            Institutional Announcements
          </Typography>
        </Box>

        {/* Primary Action */}
        <Button
          color="primary"
          onClick={onCreateClick}
          aria-label="Create new announcement"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 3,
            py: 1.5,
            fontWeight: 500,
          }}
        >
          <Icon name="add" />
          Create Announcement
        </Button>
      </Box>

      {/* Filter Section */}
      <Box
        sx={{
          px: { xs: 2, sm: 3, md: 5 },
          py: 2,
          bgcolor: "background.default",
          borderTop: 1,
          borderColor: "divider",
        }}
      >
        <Grid container spacing={2} alignItems="flex-end">
          {/* Category Filter */}
          <Grid item xs={12} sm={6} md={3}>
            <Dropdown
              label="Category"
              value={category}
              onChange={(event) => onFilter("category", event.target.value)}
              fullWidth
              aria-label="Filter by category"
            >
              {categoryOptions.map((option) => (
                <DropdownItem
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Dropdown>
          </Grid>

          {/* Sort By */}
          <Grid item xs={12} sm={6} md={3}>
            <Dropdown
              label="Sort By"
              value={sortBy}
              onChange={(event) => onSort(event.target.value)}
              fullWidth
              aria-label="Sort announcements"
            >
              {sortOptions.map((option) => (
                <DropdownItem
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Dropdown>
          </Grid>

          {/* Search */}
          <Grid item xs={12} sm={12} md={6}>
            <TextField
              label="Search announcements"
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              fullWidth
              aria-label="Search announcements by title or description"
              placeholder="Search by title or description..."
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Navbar;
