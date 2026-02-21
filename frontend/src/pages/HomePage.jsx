// /* global fetch */

// import React, { useEffect } from "react";
// import {
//   Box,
//   Card,
//   Typography,
//   Grid,
//   Button,
//   Chip,
//   Paper,
// } from "@ellucian/react-design-system/core";
// import { Link } from "react-router-dom";
// import { useGlobalState } from "../store/globalState";
// import { Icon } from "@ellucian/ds-icons/lib";

// function HomePage() {
//   const { announcements, setAnnouncements } = useGlobalState();

//   useEffect(() => {
//     const fetchAnnouncements = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/announcements");
//         const data = await res.json();
//         setAnnouncements(data);
//       } catch (error) {
//         console.error("Failed to fetch announcements:", error);
//       }
//     };

//     fetchAnnouncements();
//   }, [setAnnouncements]);

//   const getCategoryColor = (category) => {
//     const categoryColors = {
//       general: "primary",
//       library: "secondary",
//       academic: "error",
//       events: "warning",
//       student: "success",
//       teacher: "info",
//     };
//     return categoryColors[category] || "default";
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         bgcolor: "background.default",
//         py: 5,
//         px: 3,
//       }}
//     >
//       <Box
//         component="main"
//         sx={{
//           maxWidth: 1440,
//           mx: "auto",
//         }}
//       >
//         {/* Page Heading */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: 2,
//             mb: 4,
//           }}
//         >
//           <Box
//             sx={{
//               width: 48,
//               height: 48,
//               borderRadius: 1.5,
//               bgcolor: "primary.light",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <Icon
//               name="campaign"
//               style={{
//                 fontSize: "24px",
//                 color: "#1976d2",
//               }}
//             />
//           </Box>
//           <Typography
//             variant="h2"
//             sx={{
//               m: 0,
//               color: "text.primary",
//               fontWeight: 600,
//             }}
//           >
//             Current Announcements
//           </Typography>
//         </Box>

//         {/* Announcement Grid */}
//         <Grid container spacing={3}>
//           {announcements.map((announcement) => (
//             <Grid item xs={12} md={6} lg={4} key={announcement._id}>
//               <Card
//                 sx={{
//                   p: 3,
//                   height: "100%",
//                   display: "flex",
//                   flexDirection: "column",
//                   transition: "all 0.2s ease-in-out",
//                   "&:hover": {
//                     transform: "translateY(-4px)",
//                     boxShadow: 3,
//                   },
//                 }}
//                 elevation={1}
//               >
//                 {/* Title with Pinned Badge */}
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "flex-start",
//                     mb: 1.5,
//                     gap: 1.5,
//                   }}
//                 >
//                   <Typography
//                     variant="h3"
//                     sx={{
//                       m: 0,
//                       flex: 1,
//                       lineHeight: 1.4,
//                       color: "text.primary",
//                       fontWeight: 600,
//                     }}
//                   >
//                     {announcement.title}
//                   </Typography>
//                   {announcement.pinned && (
//                     <Chip
//                       label="Pinned"
//                       size="small"
//                       icon={
//                         <Icon name="push_pin" style={{ fontSize: "14px" }} />
//                       }
//                       sx={{
//                         bgcolor: "warning.light",
//                         color: "warning.dark",
//                         fontWeight: 600,
//                         fontSize: "0.6875rem",
//                         height: 24,
//                       }}
//                     />
//                   )}
//                 </Box>

//                 {/* Category Badge */}
//                 <Box sx={{ mb: 1.5 }}>
//                   <Chip
//                     label={
//                       announcement.category.charAt(0).toUpperCase() +
//                       announcement.category.slice(1)
//                     }
//                     size="small"
//                     color={getCategoryColor(announcement.category)}
//                     sx={{
//                       fontWeight: 600,
//                       fontSize: "0.6875rem",
//                       textTransform: "uppercase",
//                       letterSpacing: "0.5px",
//                       height: 24,
//                     }}
//                   />
//                 </Box>

//                 {/* Description */}
//                 <Typography
//                   variant="body1"
//                   sx={{
//                     m: 0,
//                     flex: 1,
//                     fontSize: "0.875rem",
//                     lineHeight: 1.65,
//                     color: "text.secondary",
//                   }}
//                 >
//                   {announcement.description}
//                 </Typography>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>

//         {/* Empty State */}
//         {announcements.length === 0 && (
//           <Paper
//             elevation={1}
//             sx={{
//               mt: 5,
//               textAlign: "center",
//               py: 5,
//               px: 3,
//             }}
//           >
//             <Icon
//               name="campaign"
//               style={{
//                 fontSize: "64px",
//                 color: "var(--eds-color-text-disabled, #999)",
//                 opacity: 0.6,
//               }}
//             />
//             <Typography
//               variant="h3"
//               sx={{
//                 mt: 3,
//                 mb: 1.5,
//                 color: "text.primary",
//                 fontWeight: 600,
//               }}
//             >
//               No announcements found
//             </Typography>
//             <Typography
//               variant="body1"
//               sx={{
//                 mb: 3,
//                 color: "text.secondary",
//                 lineHeight: 1.6,
//               }}
//             >
//               Get started by creating your first announcement
//             </Typography>
//             <Link to="/create" style={{ textDecoration: "none" }}>
//               <Button
//                 color="primary"
//                 variant="contained"
//                 startIcon={<Icon name="add" />}
//               >
//                 Create Announcement
//               </Button>
//             </Link>
//           </Paper>
//         )}
//       </Box>
//     </Box>
//   );
// }

// export default HomePage;
