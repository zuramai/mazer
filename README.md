# Mazer Dashboard Customization

## Overview
This project customizes the [Mazer Bootstrap 5 Admin Template](https://github.com/zuramai/mazer) to demonstrate front-end integration, UI/UX adaptation, and data-driven components as per the assessment requirements.

---

## Key Customizations

### 1. **User Feedback Component**
- **Added a new "User Feedback" card** at the end of the dashboard.
- **Displays user feedback dynamically** using data from `src/assets/data/data.json`.
- Each user card shows:
  - User avatar
  - User name
  - Multiple feedback comments (from `feedback` and `feedback2` fields in JSON)
- **Removed the card header** for visual consistency with other dashboard cards, keeping only the heading inside the card body.

### 2. **Chat Component (Recent Messages)**
- **Enhanced the "Recent Messages" card** with a "Start Conversation" button.
- On clicking, a **Bootstrap modal chat popup** appears:
  - Shows a random message from a predefined list.
  - Allows the user to type and "send" a reply (static, frontend-only).
  - Chat messages are styled to resemble a real conversation.
- The chat trigger button at the page end was removed; only the button inside "Recent Messages" is active.

### 3. **Data Integration**
- **All user feedback is loaded from `data.json`** using JavaScript.
- The dashboard is now data-driven and can be easily extended to use API endpoints.

### 4. **Chart Color Consistency**
- **Updated chart bar colors** (e.g., Profile Visit) to use Mazer’s primary blue (`#435ebe`) for visual consistency.
- Other charts (donut, etc.) also use the dashboard’s color palette.

### 5. **Error Fixes**
- **Resolved Vite errors** by ensuring required JS assets (`apexcharts.min.js`, `perfect-scrollbar.min.js`) are present in `src/assets/extensions/`.
- Instructions for installing and copying these files are included in the README.

### 6. **General UI/UX Improvements**
- All new and modified components use Bootstrap 5 grid and utility classes for responsiveness.
- Card layouts and headings match the existing dashboard style.

---

## How to Run

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Ensure required JS assets are present:**
   - Copy `apexcharts.min.js` and `perfect-scrollbar.min.js` to `src/assets/extensions/` as described above.
3. **Start the development server:**
   ```sh
   npm run dev
   ```
4. **Open the dashboard in your browser.**

---

## Files Modified

- `src/index.html` — Added/modified components and layout.
- `src/assets/data/data.json` — Added more feedback fields.
- `src/assets/static/js/pages/dashboard.js` — Data integration, chat logic, and chart color updates.
- `src/assets/extensions/` — Added required JS assets for charts and scrollbars.

---

## Assessment Criteria Met

- UI/UX adaptation and visual consistency
- Data-driven components using JSON
- Interactive frontend features
- Error handling and asset management
- Mastery of Bootstrap 5 and ES6 JavaScript

---

**This README documents all major changes and how they address the assessment requirements.**
