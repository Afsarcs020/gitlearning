// import React, { useState } from "react";
// import {
//   Box,
//   Card,
//   Grid,
//   Typography,
//   TextField,
//   Checkbox,
//   Button,
//   Dropdown,
//   DropdownItem,
//   Divider,
// } from "@ellucian/react-design-system/core";
// import { useGlobalState } from "../store/globalState";
// import { Icon } from "@ellucian/ds-icons/lib";

// function CreateAnnouncementPage() {
//   const [newAnnouncement, setNewAnnouncement] = useState({
//     title: "",
//     description: "",
//     category: "general",
//     pinned: false,
//   });

//   // Generic state handler
//   const handleChange = (field, value) => {
//     setNewAnnouncement((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const { createAnnouncement } = useGlobalState();

//   // Submit handler
//   const handleAddAnnouncement = async () => {
//     const result = await createAnnouncement(newAnnouncement);
//     console.log("Announcement Data:", newAnnouncement);
//     console.log("Result:", result);
//     setNewAnnouncement({
//       title: "",
//       description: "",
//       category: "general",
//       pinned: false,
//     });
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         bgcolor: "background.default",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "flex-start",
//         py: 5,
//         px: 3,
//       }}
//     >
//       <Card
//         elevation={2}
//         sx={{
//           width: "100%",
//           maxWidth: 640,
//           p: 5,
//         }}
//       >
//         {/* Header */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: 2,
//             mb: 5,
//             pb: 3,
//             borderBottom: 1,
//             borderColor: "divider",
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
//             {/* <Icon
//               name="globe"
//               style={{
//                 fontSize: "28px",
//                 // color: "#1976d2",
//               }} */}
//             {/* /> */}
//           </Box>
//           <Typography
//             variant="h2"
//             sx={{
//               m: 0,
//               color: "text.primary",
//               fontWeight: 600,
//             }}
//           >
//             Create New Announcement
//           </Typography>
//         </Box>

//         {/* Form Fields */}
//         <Grid
//           container
//           spacing={3}
//           component="form"
//           role="form"
//           aria-label="Create announcement form"
//         >
//           {/* Title Field */}
//           <Grid item xs={12}>
//             <TextField
//               label="Title"
//               fullWidth
//               required
//               value={newAnnouncement.title}
//               onChange={(e) => handleChange("title", e.target.value)}
//               inputProps={{
//                 "aria-label": "Announcement title",
//               }}
//             />
//           </Grid>

//           {/* Description Field */}
//           <Grid item xs={12}>
//             <TextField
//               label="Description"
//               multiline
//               rows={4}
//               fullWidth
//               required
//               value={newAnnouncement.description}
//               onChange={(e) => handleChange("description", e.target.value)}
//               inputProps={{
//                 "aria-label": "Announcement description",
//               }}
//             />
//           </Grid>

//           {/* Category Dropdown */}
//           <Grid item xs={12} sm={6}>
//             <Dropdown
//               id="announcement-category"
//               label="Category"
//               value={newAnnouncement.category}
//               onChange={(event, value) => handleChange("category", value)}
//               fullWidth
//               required
//               inputProps={{
//                 "aria-label": "Announcement category",
//               }}
//             >
//               <DropdownItem label="General" value="general" />
//               <DropdownItem label="Library" value="library" />
//               <DropdownItem label="Academic" value="academic" />
//               <DropdownItem label="Events" value="events" />
//               <DropdownItem label="Student" value="student" />
//               <DropdownItem label="Teacher" value="teacher" />
//             </Dropdown>
//           </Grid>

//           {/* Pinned Checkbox */}
//           <Grid item xs={12} sm={6}>
//             <Box
//               sx={{
//                 pt: { xs: 0, sm: 3 },
//                 display: "flex",
//                 alignItems: "center",
//               }}
//             >
//               <Checkbox
//                 id="pinned-checkbox"
//                 label="Pin this announcement"
//                 checked={newAnnouncement.pinned}
//                 onChange={(e) => handleChange("pinned", e.target.checked)}
//                 aria-label="Pin announcement to top of list"
//               />
//             </Box>
//           </Grid>

//           {/* Divider */}
//           <Grid item xs={12}>
//             <Divider />
//           </Grid>

//           {/* Submit Button */}
//           <Grid item xs={12}>
//             <Button
//               onClick={handleAddAnnouncement}
//               color="primary"
//               variant="contained"
//               fullWidth
//               size="large"
//               startIcon={<Icon name="add" />}
//               sx={{
//                 py: 1.5,
//                 fontWeight: 500,
//                 fontSize: "1rem",
//               }}
//             >
//               Create Announcement
//             </Button>
//           </Grid>
//         </Grid>
//       </Card>
//     </Box>
//   );
// }

// export default CreateAnnouncementPage;
