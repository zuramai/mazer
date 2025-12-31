# Mazer E-Commerce Dashboard Customization

## Task 3 – Front-End Skill Assessment

This document describes all customizations made to the Mazer Bootstrap 5 Admin Dashboard for the front-end skill assessment.

---

## 📁 Project Structure

```
D:\task3\
├── src/
│   ├── assets/
│   │   ├── data/
│   │   │   └── data.json              # Sample data for all components
│   │   ├── scss/
│   │   │   └── custom-theme.scss      # Custom styles extending Mazer
│   │   └── static/
│   │       └── js/
│   │           └── pages/
│   │               ├── dashboard-custom.js  # E-Commerce Dashboard controller
│   │               ├── products.js          # Products management controller
│   │               └── orders.js            # Orders management controller
│   ├── dashboard-custom.html          # E-Commerce Dashboard page
│   ├── products.html                  # Products management page
│   ├── orders.html                    # Orders management page
│   └── sidebar-items.json             # Navigation menu (modified)
└── CUSTOMIZATION_README.md            # This documentation
```

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation

1. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps --ignore-scripts
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Access the dashboard:**
   - Open `http://localhost:5173` in your browser
   - Navigate to **Dashboard > E-Commerce** in the sidebar

---

## 📊 Features Implemented

### 1. E-Commerce Dashboard (`dashboard-custom.html`)
- **Statistics Cards**: Total Sales, Orders, New Customers, Pending Tasks
- **Sales Overview Chart**: Area chart comparing 2024 vs 2023 sales
- **Revenue by Category**: Donut chart with category breakdown
- **Top Products Table**: Products with images, pricing, and ratings
- **Recent Orders**: Order list with customer info and status
- **Team Members**: Team display with online status
- **Tasks**: Task list with priority levels and due dates
- **Notifications**: Notification center with read/unread status

### 2. Products Management (`products.html`)
- **Product Grid**: Card-based product display with images
- **Search**: Real-time search by name or category
- **Filters**: Filter by category, status (In Stock/Low Stock/Out of Stock)
- **Sorting**: Sort by name, price, stock level, or rating
- **CRUD Operations**:
  - Add new products via modal
  - Edit existing products
  - Delete products with confirmation
- **Pagination**: Navigate through product pages

### 3. Orders Management (`orders.html`)
- **Order Summary Cards**: Quick stats (Total, Pending, Processing, Shipped, Delivered, Revenue)
- **Orders Table**: Full order details with customer information
- **Search & Filter**: Search by order ID, customer, or product
- **Status Filter**: Filter by order status
- **Date Filter**: Filter by order date
- **Order Details Modal**: View complete order information with timeline
- **Status Updates**: Change order status with modal confirmation
- **Export**: Download orders as CSV file

---

## 🎨 UI/UX Customizations

### Custom Theme (`custom-theme.scss`)
- **Color Palette**: Custom primary (#435ebe), success (#5ddab4), danger (#ff6b6b)
- **Stat Cards**: Gradient icons, hover effects with shadow and lift
- **Cards**: Rounded corners (16px), subtle shadows, hover effects
- **Tables**: Enhanced styling with hover states
- **Badges**: Custom light background variants
- **Buttons**: Gradient backgrounds, hover animations
- **Dark Mode Support**: Adjusted colors for dark theme compatibility

### Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop views
- Collapsible navigation on mobile
- Stack layouts for smaller screens

---

## 📦 Data Structure (`data.json`)

```json
{
  "dashboard": {
    "statistics": { ... },
    "salesChart": { ... },
    "revenueByCategory": [ ... ]
  },
  "products": [ ... ],
  "recentOrders": [ ... ],
  "teamMembers": [ ... ],
  "notifications": [ ... ],
  "tasks": [ ... ]
}
```

### Sample Data Includes:
- **6 Products**: MacBook Pro, iPhone, Galaxy Watch, Nike shoes, Office Chair, Sony Headphones
- **5 Orders**: Various statuses (Delivered, Processing, Shipped, Pending)
- **4 Team Members**: With roles and online status
- **4 Notifications**: Mix of read/unread
- **5 Tasks**: Different priorities and due dates

---

## 🔧 Technical Implementation

### JavaScript Architecture
- **ES6 Classes**: `DashboardManager`, `ProductsManager`, `OrdersManager`
- **Async/Await**: For data fetching
- **Event Delegation**: Efficient event handling
- **Debouncing**: For search input optimization

### Data Fetching
```javascript
async loadData() {
    const response = await fetch('/assets/data/data.json');
    this.data = await response.json();
}
```

### Charts (ApexCharts)
- Sales Overview: Area chart with gradient fill
- Revenue by Category: Donut chart with custom legend

### Bootstrap 5 Integration
- Modal dialogs for forms
- Toast notifications
- Dropdown menus
- Responsive grid system

---

## 📋 Navigation Updates

The sidebar (`sidebar-items.json`) was updated to include:
- **Dashboard** (submenu)
  - Default
  - E-Commerce ← New
- **Products** ← New
- **Orders** ← New

---

## 🧪 Testing the Features

### E-Commerce Dashboard
1. Navigate to Dashboard > E-Commerce
2. View statistics cards and charts
3. Click "Refresh" to reload data
4. Click "Add Product" to test the add modal
5. Click "+" on Tasks to add a new task

### Products Page
1. Navigate to Products
2. Use the search bar to filter products
3. Use dropdowns to filter by category/status
4. Click the menu button on a product card to edit/delete
5. Click "Add Product" to create a new product
6. Test pagination with more products

### Orders Page
1. Navigate to Orders
2. Use search to find orders by ID or customer
3. Filter by status or date
4. Click the eye icon to view order details
5. Click the pencil icon to update order status
6. Click "Export" to download CSV

---

## 📝 Notes

- All data is stored client-side (in memory) - changes are lost on page refresh
- For production, replace `fetch('/assets/data/data.json')` with actual API endpoints
- The toast notification system is reusable across all pages
- Charts automatically resize on window resize

---

## 🔗 Dependencies

- **Mazer v2.3.1**: Base admin template
- **Bootstrap 5.3.3**: UI framework
- **ApexCharts**: Charting library
- **Bootstrap Icons**: Icon library
- **Nunjucks**: Templating engine
- **Vite**: Build tool and dev server

---

## 👤 Author

Created for Task 3 – Front-End Skill Assessment

---
