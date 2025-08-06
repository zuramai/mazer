// Basic app.js for Mazer template
console.log('Mazer template loaded');

// Bootstrap JavaScript - using CDN
const bootstrapScript = document.createElement('script');
bootstrapScript.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js';
document.head.appendChild(bootstrapScript);

// Basic chart placeholder
document.addEventListener('DOMContentLoaded', function() {
    // Placeholder for chart functionality
    const chartContainer = document.getElementById('chart-profile-visit');
    if (chartContainer) {
        chartContainer.innerHTML = '<div style="height: 300px; display: flex; align-items: center; justify-content: center; background: #f8f9fa; border-radius: 10px;"><p class="text-muted">Chart placeholder - ApexCharts would be loaded here</p></div>';
    }
    
    // Basic sidebar toggle functionality
    const sidebarToggle = document.querySelector('[data-bs-toggle="sidebar"]');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            document.body.classList.toggle('sidebar-collapsed');
        });
    }
}); 