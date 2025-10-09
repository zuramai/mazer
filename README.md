# Mazer Dashboard – Task 3 Customization

This repository is a **fork of the Mazer Bootstrap 5 admin dashboard**. The project has been customized as part of **Task 3 – Front-End Skill Assessment** for the internship.

## **Overview**
The dashboard has been enhanced to:  
- Dynamically display **KPIs** from `data.json`.  
- Render a **weekly activity chart** using Chart.js.  
- Populate a **recent activity table** from JSON data.  
- Maintain responsive design using **Bootstrap 5**.  
- Include **custom themes and enhanced background colors**.  

---

## **Features Implemented**

### 1️⃣ Dynamic KPI Cards
- Active Users  
- New Signups  
- Revenue  
- Open Tickets  

All numbers are **fetched dynamically** from `assets/data/data.json`.

### 2️⃣ Weekly Activity Chart
- Uses **Chart.js** to render a line chart.  
- Labels and data points are **populated from JSON**.

### 3️⃣ Recent Activity Table
- Displays user actions (e.g., uploaded report, created booking).  
- Status indicators: `success`, `pending`, `failed`.

### 4️⃣ Custom Themes
- Original theme enhanced with **ocean, dark, and light backgrounds**.  
- Theme selection can be extended via SCSS variables.

### 5️⃣ Responsive Layout
- Fully responsive **mobile-first design**.  
- Left section: KPIs, charts, recent activity  
- Right section: profile card

---

## **Setup Instructions**

1. Clone this repository:  
```bash
git clone https://github.com/Srivani-mula/mazer
