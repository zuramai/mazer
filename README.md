# Mazer Dashboard – Customization & Integration

## 📝 Overview
This project is a customized version of the **Mazer Bootstrap 5 Admin Template**, enhanced as part of a front-end skill assessment. The dashboard demonstrates UI/UX customization, data-driven components, and modern JavaScript integration.

---

## Features & Customizations

### 1. Theme Switcher (Light/Dark Mode)
- Toggle button added in the navbar for theme switching.
- Theme preference is saved in `localStorage` and automatically applied on page load.
- Bootstrap Icons used for sun/moon indicators.
- <img width="313" height="179" alt="lignd dark" src="https://github.com/user-attachments/assets/e2f3ddae-150f-4097-b169-bbbbe7a4363b" />


### 2. Interactive Chart Filters
- Dropdowns implemented to filter charts by **year** and **region**.
- Chart data updates in real time based on selected filters.
- Chart color changes dynamically based on selected region.
- Uses **mock data** for demo purposes.
- <img width="512" height="326" alt="filter1" src="https://github.com/user-attachments/assets/d9c552c1-1051-453d-b081-2ab932cd4f72" />
<img width="515" height="289" alt="filter2" src="https://github.com/user-attachments/assets/97372efd-0bc9-4b3f-99fe-429af7940af4" />

### 4. User Profile Editing Modal
- Users can update name, avatar, and bio through a Bootstrap modal.
- Changes are saved in `localStorage` and reflected immediately in the UI.
- Avatar preview is supported before saving.
- <img width="632" height="317" alt="editprofile" src="https://github.com/user-attachments/assets/93d7cb19-c0d1-4eee-8924-cee628430675" />

### 5. User Onboarding Tour
- Integrated **Intro.js** for a guided onboarding tour.
- Highlights key dashboard elements with helpful tooltips.
- "Start Tour" button available to re-initiate the onboarding tour anytime.
- <img width="688" height="349" alt="take a tour" src="https://github.com/user-attachments/assets/e8023220-fb91-482d-8315-490c03bd6a49" />

## Setup & Usage

### Clone the Repository
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```
###  Run the Dashboard
Open `index.html` in your browser via the local server.

---

## Custom Data

To use your own chart or comment data:
- Update the relevant JSON files or mock API endpoints.
- For comments: edit `src/assets/static/data/comments.json`
- For chart: edit related data arrays or JSON files in `dashboard.js`

---

## File Structure

```
├── index.html                      # Main dashboard template
├── dashboard.js                   # All custom JavaScript logic
└── src/
    └── assets/
        └── static/
            └── data/
                └── comments.json  # Optional mock data for comments
```

---

## Logic & Integration Notes

- Theme and profile data are stored in `localStorage`.
- Charts are built with **ApexCharts** and update based on user inputs.
- Comments are fetched via AJAX and rendered using template literals.
- Intro.js is loaded dynamically for onboarding.

---

