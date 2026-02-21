# 🎓 Institutional Announcements System

A full-stack announcement management system built with **React**, **Node.js**, **Express**, **MongoDB**, and **Ellucian EPDS** components.

---

## 📋 Features

✅ **CRUD Operations**: Create, Read, Update, Delete announcements  
✅ **Category Filtering**: Filter by General, Library, Academic, Events, Student, Teacher  
✅ **Sorting**: Sort by Recent, Oldest, Alphabetical (A-Z)  
✅ **Search**: Real-time search across titles and descriptions  
✅ **Pin Announcements**: Mark important announcements  
✅ **Toast Notifications**: User feedback for all actions  
✅ **Loading & Error States**: Proper UX handling  
✅ **Professional UI**: Built with Ellucian EPDS components  
✅ **Responsive Design**: Works on all screen sizes

---

## 🏗️ Architecture

### Backend Structure

```
backend/
├── server.js                    # Express server with CORS
├── config/
│   └── db.js                   # MongoDB connection
├── models/
│   └── announcement.model.js   # Mongoose schema
├── controllers/
│   └── announcement.controller.js  # Business logic
└── routes/
    └── announcement.route.js   # API endpoints
```

### Frontend Structure

```
frontend/src/
├── components/
│   ├── Navbar.jsx              # Header with filters/search
│   ├── AnnouncementCard.jsx    # Card component
│   └── AnnouncementForm.jsx    # Create/Edit modal
├── pages/
│   └── AnnouncementsPage.jsx   # Main page
├── services/
│   └── announcementService.js  # Centralized API calls
└── page/
    └── router.jsx              # Routing
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20.18.1
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### 1️⃣ Backend Setup

```bash
# Navigate to root directory
cd /Users/afsarm/fullstack

# Make sure .env file exists with:
# MONGO_URI=your_mongodb_connection_string
# PORT=5000

# Install dependencies (already done)
npm install

# Start backend server
npm run dev
```

Backend runs on: `http://localhost:5000`

### 2️⃣ Frontend Setup

```bash
# Navigate to frontend
cd /Users/afsarm/fullstack/frontend

# Install dependencies (already done)
npm install

# Start development server with live reload
npm start
```

Frontend runs on: `http://localhost:8082`

---

## 🔌 API Endpoints

### Base URL: `http://localhost:5000/api/announcements`

| Method | Endpoint | Description             |
| ------ | -------- | ----------------------- |
| GET    | `/`      | Get all announcements   |
| POST   | `/`      | Create new announcement |
| PUT    | `/:id`   | Update announcement     |
| DELETE | `/:id`   | Delete announcement     |

### Request/Response Format

#### Create Announcement (POST)

```json
{
  "title": "New Library Hours",
  "description": "The library will have extended hours...",
  "category": "library",
  "pinned": false
}
```

#### Response Format

```json
{
  "success": true,
  "message": "Announcement created successfully.",
  "data": {
    "_id": "...",
    "title": "...",
    "description": "...",
    "category": "library",
    "pinned": false,
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

---

## 🎨 UI Components (EPDS)

All components use **@ellucian/react-design-system/core**:

- ✅ Button
- ✅ Card, CardContent
- ✅ Select, MenuItem
- ✅ TextField
- ✅ Dialog, DialogTitle, DialogContent, DialogActions
- ✅ Chip
- ✅ CircularProgress
- ✅ Snackbar, Alert
- ✅ Grid
- ✅ Checkbox, FormControlLabel

Icons from **@ellucian/ds-icons/lib**

---

## 🔧 Key Features Implementation

### 1. Search & Filter

The Navbar component provides real-time filtering:

- **Category Filter**: Dropdown to filter by category
- **Sort Options**: Recent, Oldest, A-Z
- **Search Bar**: Searches titles and descriptions

### 2. State Management

Uses React hooks (useState, useEffect) for clean state management:

- Centralized in AnnouncementsPage component
- Real-time filter application
- Optimistic UI updates

### 3. API Service Layer

Centralized API calls in `announcementService.js`:

- Consistent error handling
- Proper response format parsing
- Network error handling

### 4. Toast Notifications

Success/error feedback for all operations:

- Create, Update, Delete confirmations
- Error messages
- Auto-hide after 4 seconds

### 5. Loading & Error States

- CircularProgress during data fetch
- Error alerts with retry button
- Empty state with helpful message

---

## 🐛 Fixes Applied

### Backend Fixes

✅ Added CORS middleware  
✅ Removed duplicate `dotenv.config()`  
✅ Cleaned unused imports in routes  
✅ Proper JSON response format maintained

### Frontend Fixes

✅ Created centralized API service layer  
✅ Rebuilt all components using ONLY EPDS  
✅ Implemented search/filter/sort functionality  
✅ Added loading and error states  
✅ Added toast notifications  
✅ Fixed import paths  
✅ Removed all console errors  
✅ Proper state management without Zustand overhead

---

## 📊 Category Colors

```javascript
{
  general: "#2196f3",   // Blue
  library: "#9c27b0",   // Purple
  academic: "#f44336",  // Red
  events: "#ff9800",    // Orange
  student: "#4caf50",   // Green
  teacher: "#00bcd4"    // Cyan
}
```

---

## 🧪 Testing

1. **Start Backend**: `npm run dev` in root directory
2. **Start Frontend**: `npm start` in frontend directory
3. **Open Experience Dashboard**: Navigate to your Ellucian Experience instance
4. **Enable Live Reload**: Run `enableLiveReload(8082)` in browser console
5. **Test All Features**:
   - ✅ Create announcement
   - ✅ Edit announcement
   - ✅ Delete announcement
   - ✅ Filter by category
   - ✅ Sort announcements
   - ✅ Search functionality
   - ✅ Pin/unpin announcements

---

## 🎯 Production Deployment

### Backend

1. Set environment variables in production
2. Ensure MongoDB connection string is secure
3. Configure CORS for production domain
4. Deploy to Heroku/Railway/AWS

### Frontend

```bash
npm run build-prod
npm run deploy-prod
```

---

## 📝 Environment Variables

### Backend (`.env`)

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
PORT=5000
```

### Frontend (`.env`)

```env
EXPERIENCE_EXTENSION_UPLOAD_TOKEN=<your-upload-token>
PORT=8082
```

---

## 🚦 Status Codes

- `200` - Success (GET, PUT, DELETE)
- `201` - Created (POST)
- `400` - Bad Request (validation errors)
- `404` - Not Found (invalid ID)
- `500` - Server Error

---

## 👨‍💻 Tech Stack

**Frontend:**

- React 19.0.3
- React Router DOM 5.2.0
- @ellucian/react-design-system 8.2.2
- @ellucian/ds-icons 8.2.2
- Webpack 5.99.9

**Backend:**

- Node.js
- Express 5.2.1
- MongoDB with Mongoose 9.2.1
- CORS middleware

---

## 📞 Support

For issues or questions:

1. Check browser console for errors
2. Verify MongoDB connection
3. Check backend logs
4. Ensure CORS is properly configured

---

**Built with ❤️ using Ellucian EPDS Components**
