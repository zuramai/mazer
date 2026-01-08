# Task 3 – Dashboard Customization
<h1 align="center">Mazer Dashboard</h1>
## 📌 Overview
This project is the deliverable for **Task 3** of the Keshav Soft internship.  
The goal was to build a **data-driven dashboard** by replacing demo content with JSON data, improving alignment and responsiveness, and polishing the UI/UX with clear graph names and consistent layout.

---

## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/<repo-name>.git
   cd <repo-name>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Dashboard: `http://localhost:5173/index.html`

---

## 📁 File Structure

- `src/index.html`  
  - Clean layout with placeholders (`stats-cards`, `comments-body`, `messages-container`, chart divs).  
  - Graph names added in card headers for clarity.  

- `src/assets/static/data/data.json`  
  - Contains structured data for stats, comments, messages, and chart series.  

- `src/assets/static/js/pages/dashboard-data.js`  
  - Fetches `data.json` and injects content dynamically.  
  - Functions:  
    - `renderStats()` → builds stat cards  
    - `renderComments()` → fills comments table  
    - `renderMessages()` → fills recent messages list  
    - `renderCharts()` → renders ApexCharts graphs  

- `src/assets/scss/`  
  - Theme variables and responsive styles.  
  - Supports light/dark mode toggle.

---

## 🔄 Logic Flow

1. **Data Fetching**  
   - `dashboard-data.js` fetches `/assets/static/data/data.json`.  
   - JSON keys: `stats`, `comments`, `messages`, `profileVisit`, `visitorsProfile`, `regions`.

2. **Dynamic Rendering**  
   - Stats injected into `#stats-cards`.  
   - Comments injected into `#comments-body`.  
   - Messages injected into `#messages-container`.  
   - Charts rendered into `#chart-profile-visit`, `#chart-visitors-profile`, and regional chart divs.

3. **UI/UX Improvements**  
   - Removed demo rows and replaced with placeholders.  
   - Added graph names in headers and chart titles.  
   - Balanced layout (`col-lg-8` vs `col-lg-4`, `h-100` for equal card heights).  
   - Responsive typography and spacing (`mt-4`, `g-3`).  
   - Optional dark mode toggle and search bar for messages.

---

## ✅ Changes Made

- **Removed demo content** from `index.html`.  
- **Added placeholders** for dynamic injection.  
- **Connected JSON data** to all sections (stats, comments, messages, charts).  
- **Improved alignment** using Bootstrap grid.  
- **Named graphs** for clarity.  
- **Enhanced UX** with responsiveness and optional UI components (dark mode, search).  

---

## 🧪 Testing

- Run `npm run dev` and open `index.html`.  
- Verify that:
  - Stats, comments, and messages load from JSON.  
  - Charts render correctly with labels.  
  - Layout is responsive on mobile and desktop.  
  - No demo content remains.  

<img width="1914" height="910" alt="Image" src="https://github.com/user-attachments/assets/883cfbb1-161b-47e7-aabc-9e0486aa212d" />


Mazer is created by <a href="https://saugi.me">Saugi</a>.

## Sponsors

![zuramai's sponsors](https://raw.githubusercontent.com/zuramai/static/main/sponsors.svg)
