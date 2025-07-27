# Mazer Dashboard – Front-End Integration & Customization

## Overview
This project customizes the **Mazer Bootstrap 5 Admin Template** to demonstrate advanced front-end integration, UI/UX adaptation, and data-driven dashboard components as part of a technical assessment.

---

## Features & Customizations

### 1. Data Integration
- All user feedback and dashboard data are loaded from `data.json` using JavaScript.
- The dashboard is fully data-driven and can be easily extended to use real API endpoints.

### 2. Interactive Chart Filters
- Added dropdowns to filter the main chart by **year** and **region**.
- Chart data updates in real time based on the selected filters.
- Chart color also updates to match the selected region.
- Uses mock data for demonstration.
<img width="553" height="307" alt="output1" src="https://github.com/user-attachments/assets/5eb06cfc-d341-41ab-b751-a9fbe56bba26" />

### 3. User Profile Editing Modal
- Users can edit their profile information (name, avatar, bio) via a Bootstrap modal.
- Changes are saved in `localStorage` and reflected immediately in the UI.
- Avatar preview is supported before saving.
<img width="707" height="325" alt="output2" src="https://github.com/user-attachments/assets/59cb7a7b-0910-4f5c-aa9a-5876d4869a9b" />


### 4. User Onboarding Tour
- Integrated [Intro.js](https://introjs.com/) to provide a guided tour of the dashboard.
- Key dashboard elements are highlighted with helpful tooltips.
- Users can start the tour anytime using the "Start Tour" button.
<img width="530" height="302" alt="output3" src="https://github.com/user-attachments/assets/560c6278-1acb-4272-9a0d-bc2003ef2b3d" />


### 5. Chart Color Consistency
- All charts (e.g., Profile Visit, Donut) use Mazer’s primary blue (`#435ebe`) and the official dashboard color palette for a unified visual experience.
<img width="733" height="341" alt="output4" src="https://github.com/user-attachments/assets/3843e07e-c888-4e06-bd83-c015dc11b02b" />


### 6. General UI/UX Improvements
- All components use Bootstrap 5 grid and utility classes for responsiveness.
- Card layouts and headings are visually consistent with the original Mazer dashboard.

---

## How to Run

### Install Dependencies
```bash
npm install
```

### Required Assets
Ensure these JS files are present:
- `src/assets/extensions/apexcharts.min.js`
- `src/assets/extensions/perfect-scrollbar.min.js`
- `src/assets/extensions/intro.min.js` (for onboarding tour)

If missing, download or copy them manually into the `extensions/` folder.

### Start the Development Server
```bash
npm run dev
```
Then open the dashboard in your browser.

---

## Files Modified

- `src/index.html` – Layout and new component additions.
- `src/assets/data/data.json` – Extended with more feedback fields.
- `src/assets/static/js/pages/dashboard.js` – JS logic for data integration, chart filters, profile modal, onboarding tour, and chart customization.
- `src/assets/extensions/` – Contains required JavaScript dependencies.

---

## Assessment Criteria Met

- UI/UX adaptation and consistency with original dashboard.
- Dynamic, data-driven rendering from JSON.
- Interactive components (feedback, chart filters, profile modal, onboarding tour).
- Chart styling and logic enhancements.
- Front-end error handling and asset integration.
- Usage of Bootstrap 5 and modern JavaScript (ES6+).

---

## Credits

- [Mazer Bootstrap 5 Admin Template](https://github.com/zuramai/mazer)
- [Bootstrap 5](https://getbootstrap.com/)
- [ApexCharts](https://apexcharts.com/)
- [Intro.js](https://introjs.com/)

---

## License
This project is developed for assessment/demo purposes only.
