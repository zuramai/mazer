# Customized Mazer Admin Dashboard

## 🎯 Project Overview

This is a customized version of the **Mazer Admin Dashboard** template, enhanced with modern UI/UX features and data-driven components. The project demonstrates real-world front-end development skills including:

- **Bootstrap 5** mastery
- **JavaScript ES6+** implementation
- **Responsive design** principles
- **Data integration** with JSON APIs
- **Component customization** and extension
- **Modern UI/UX** patterns

## 🚀 Features

### ✨ Custom Dashboard
- **Real-time statistics** with animated counters
- **Interactive charts** using Chart.js
- **Activity feed** with status indicators
- **Top products** display with growth metrics
- **Recent orders** table with status badges

### 👥 Users Management
- **User cards** with avatar and status indicators
- **Search functionality** with real-time filtering
- **Status filters** (All, Active, Inactive)
- **Statistics summary** with key metrics
- **Responsive grid layout**

### 🎨 UI/UX Enhancements
- **Gradient backgrounds** for visual appeal
- **Hover animations** and transitions
- **Modern card designs** with shadows
- **Color-coded status indicators**
- **Bootstrap Icons** integration
- **Responsive design** for all screen sizes

### 📊 Data Integration
- **JSON data structure** with realistic sample data
- **Async/await** data loading
- **Error handling** for failed requests
- **Loading states** with spinners
- **Dynamic content updates**

## 🛠️ Technical Implementation

### Frontend Technologies
- **Bootstrap 5.3.3** - CSS framework
- **Bootstrap Icons** - Icon library
- **Chart.js** - Charting library
- **Vanilla JavaScript ES6+** - No frameworks
- **CSS3** - Custom styling and animations

### Data Structure
The project uses a comprehensive `data.json` file containing:
- Dashboard statistics and metrics
- User information and profiles
- Product data and sales figures
- Order history and status
- Activity feed and recent actions

### Key Components

#### 1. Custom Dashboard (`custom-dashboard.html`)
```javascript
// Data loading with error handling
async function loadDashboardData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        // Update UI components
    } catch (error) {
        console.error('Error loading dashboard data:', error);
    }
}
```

#### 2. Users Management (`custom-users.html`)
```javascript
// Search and filter functionality
function filterUsers(filter) {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    filteredUsers = allUsers.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm);
        const matchesFilter = filter === 'all' || user.status === filter;
        return matchesSearch && matchesFilter;
    });
    displayUsers(filteredUsers);
}
```

#### 3. Responsive Design
```css
/* Custom card styling with hover effects */
.user-card {
    background: white;
    border-radius: 15px;
    padding: 1.5rem;
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
}

.user-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
}
```

## 📁 Project Structure

```
mazer/
├── src/
│   ├── custom-dashboard.html      # Main dashboard with charts
│   ├── custom-users.html          # Users management page
│   ├── data.json                  # Sample data for the application
│   ├── assets/
│   │   ├── compiled/
│   │   │   ├── css/
│   │   │   │   └── app.css       # Custom compiled CSS
│   │   │   └── js/
│   │   │       └── app.js        # Custom JavaScript
│   │   └── static/
│   │       └── images/           # Images and assets
│   └── layouts/
│       └── master.html           # Base template
├── README_CUSTOM.md              # This file
└── package.json                  # Dependencies
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd mazer
   ```

2. **Install dependencies** (if needed)
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   # Using HTTP server (recommended for this project)
   npx http-server src -p 8080
   
   # Or using Vite (if dependencies are properly installed)
   npm run dev
   ```

4. **Access the application**
   - Open your browser
   - Navigate to `http://localhost:8080`
   - Click on `custom-dashboard.html` or `custom-users.html`

### Alternative Setup (Simple HTTP Server)
Since this project has minimal dependencies, you can also run it with any HTTP server:

```bash
# Using Python (if available)
python -m http.server 8080

# Using PHP (if available)
php -S localhost:8080

# Using Live Server (VS Code extension)
# Right-click on index.html and select "Open with Live Server"
```

## 🎨 Customization Details

### Color Scheme
The project uses a modern color palette:
- **Primary**: `#435ebe` (Blue)
- **Success**: `#10b981` (Green)
- **Warning**: `#f59e0b` (Orange)
- **Danger**: `#ef4444` (Red)
- **Secondary**: `#6c757d` (Gray)

### Typography
- **Font Family**: Nunito (Google Fonts)
- **Icons**: Bootstrap Icons
- **Responsive**: Mobile-first approach

### Components Customized

1. **Stats Cards**
   - Gradient backgrounds
   - Hover animations
   - Icon integration
   - Real-time data updates

2. **Activity Feed**
   - Status-based color coding
   - Time stamps
   - User avatars
   - Action descriptions

3. **Product Cards**
   - Image thumbnails
   - Growth indicators
   - Revenue display
   - Hover effects

4. **User Management**
   - Search functionality
   - Status filtering
   - Avatar display
   - Action buttons

## 🔧 Development Notes

### Data Integration
The application loads data from `data.json` using fetch API:
```javascript
const response = await fetch('data.json');
const data = await response.json();
```

### Error Handling
Comprehensive error handling for:
- Network failures
- Invalid data formats
- Missing assets
- Browser compatibility

### Performance Optimizations
- Lazy loading of images
- Efficient DOM manipulation
- Minimal dependencies
- Optimized CSS animations

## 📱 Responsive Design

The application is fully responsive with:
- **Mobile-first** approach
- **Flexible grid** system
- **Adaptive typography**
- **Touch-friendly** interactions
- **Cross-browser** compatibility

## 🎯 Learning Outcomes

This project demonstrates:

1. **Real-world development** scenarios
2. **Existing codebase** adaptation
3. **Data-driven** component development
4. **Modern UI/UX** implementation
5. **Bootstrap 5** mastery
6. **JavaScript ES6+** skills
7. **Responsive design** principles

## 🔗 Links

- **Live Demo**: [Your deployed URL]
- **GitHub Repository**: [Your repo URL]
- **Original Mazer Template**: https://github.com/zuramai/mazer

## 📄 License

This project is based on the Mazer template which is licensed under MIT License.

---

**Developed for Front-End Skill Assessment**  
*Demonstrating real-world development capabilities with existing codebases* 