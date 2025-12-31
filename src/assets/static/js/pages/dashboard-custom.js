/**
 * Dashboard Custom - E-Commerce Dashboard
 * Fetches data from JSON and renders all dashboard components
 */

class DashboardManager {
    constructor() {
        this.data = null;
        this.salesChart = null;
        this.categoryChart = null;
        this.init();
    }

    async init() {
        try {
            await this.loadData();
            this.hideLoader();
            this.renderStatistics();
            this.renderSalesChart();
            this.renderCategoryChart();
            this.renderProducts();
            this.renderOrders();
            this.renderTeam();
            this.renderTasks();
            this.renderNotifications();
            this.setupEventListeners();
        } catch (error) {
            console.error('Error initializing dashboard:', error);
            this.showError('Failed to load dashboard data. Please try again.');
        }
    }

    async loadData() {
        const response = await fetch('/assets/data/data.json');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        this.data = await response.json();
    }

    hideLoader() {
        document.getElementById('loading-spinner').style.display = 'none';
        document.getElementById('dashboard-content').style.display = 'block';
    }

    showError(message) {
        document.getElementById('loading-spinner').innerHTML = `
            <div class="text-center text-danger">
                <i class="bi bi-exclamation-circle display-4"></i>
                <p class="mt-2">${message}</p>
                <button class="btn btn-primary mt-2" onclick="location.reload()">Retry</button>
            </div>
        `;
    }

    // Format currency
    formatCurrency(value) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    }

    // Format number with commas
    formatNumber(value) {
        return new Intl.NumberFormat('en-US').format(value);
    }

    // Render Statistics Cards
    renderStatistics() {
        const stats = this.data.dashboard.statistics;
        const container = document.getElementById('stats-section');

        const statCards = [
            { key: 'totalSales', label: 'Total Sales', isCurrency: true },
            { key: 'totalOrders', label: 'Total Orders', isCurrency: false },
            { key: 'newCustomers', label: 'New Customers', isCurrency: false },
            { key: 'pendingTasks', label: 'Pending Tasks', isCurrency: false }
        ];

        container.innerHTML = statCards.map(stat => {
            const data = stats[stat.key];
            const value = stat.isCurrency ? this.formatCurrency(data.value) : this.formatNumber(data.value);
            const trendIcon = data.trend === 'up' ? 'bi-arrow-up' : 'bi-arrow-down';
            const trendColor = data.trend === 'up' ? 'text-success' : 'text-danger';

            return `
                <div class="col-6 col-lg-3 col-md-6">
                    <div class="card stat-card">
                        <div class="card-body py-4 px-4">
                            <div class="d-flex justify-content-between align-items-start">
                                <div>
                                    <h6 class="text-muted mb-1">${stat.label}</h6>
                                    <h3 class="mb-0 fw-bold">${value}</h3>
                                    <small class="${trendColor}">
                                        <i class="bi ${trendIcon}"></i> ${Math.abs(data.change)}%
                                    </small>
                                </div>
                                <div class="stats-icon ${data.color}">
                                    <i class="bi bi-${data.icon}"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Render Sales Chart
    renderSalesChart() {
        const chartData = this.data.dashboard.salesChart;

        const options = {
            series: chartData.series,
            chart: {
                height: 350,
                type: 'area',
                toolbar: {
                    show: false
                }
            },
            colors: ['#435ebe', '#55c6e8'],
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                width: 2
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.4,
                    opacityTo: 0.1,
                    stops: [0, 90, 100]
                }
            },
            xaxis: {
                categories: chartData.categories
            },
            yaxis: {
                labels: {
                    formatter: (value) => '$' + (value / 1000) + 'k'
                }
            },
            tooltip: {
                y: {
                    formatter: (value) => this.formatCurrency(value)
                }
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right'
            }
        };

        this.salesChart = new ApexCharts(document.getElementById('sales-chart'), options);
        this.salesChart.render();
    }

    // Render Category Chart
    renderCategoryChart() {
        const categoryData = this.data.dashboard.revenueByCategory;

        const options = {
            series: categoryData.map(c => c.value),
            chart: {
                type: 'donut',
                height: 280
            },
            labels: categoryData.map(c => c.category),
            colors: categoryData.map(c => c.color),
            legend: {
                show: false
            },
            dataLabels: {
                enabled: false
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '70%',
                        labels: {
                            show: true,
                            total: {
                                show: true,
                                label: 'Total Revenue',
                                formatter: () => '100%'
                            }
                        }
                    }
                }
            }
        };

        this.categoryChart = new ApexCharts(document.getElementById('category-chart'), options);
        this.categoryChart.render();

        // Render legend
        const legendContainer = document.getElementById('category-legend');
        legendContainer.innerHTML = categoryData.map(cat => `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <div>
                    <span class="legend-dot me-2" style="background-color: ${cat.color}"></span>
                    <span>${cat.category}</span>
                </div>
                <span class="fw-bold">${cat.value}%</span>
            </div>
        `).join('');
    }

    // Render Products Table
    renderProducts() {
        const products = this.data.products;
        const tbody = document.querySelector('#products-table tbody');

        tbody.innerHTML = products.map(product => {
            const statusClass = product.status === 'In Stock' ? 'bg-success' : 
                               product.status === 'Low Stock' ? 'bg-warning' : 'bg-danger';

            const stars = this.renderStars(product.rating);

            return `
                <tr>
                    <td>
                        <div class="d-flex align-items-center">
                            <img src="${product.image}" alt="${product.name}" 
                                 class="rounded me-3" width="45" height="45">
                            <span class="fw-bold">${product.name}</span>
                        </div>
                    </td>
                    <td><span class="badge bg-light-secondary">${product.category}</span></td>
                    <td class="fw-bold">${this.formatCurrency(product.price)}</td>
                    <td>
                        <span class="badge ${statusClass}">${product.stock}</span>
                    </td>
                    <td>
                        <div class="d-flex align-items-center">
                            ${stars}
                            <span class="ms-1 text-muted">(${product.rating})</span>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    // Render star rating
    renderStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="bi bi-star-fill text-warning"></i>';
        }
        if (hasHalfStar) {
            stars += '<i class="bi bi-star-half text-warning"></i>';
        }
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="bi bi-star text-warning"></i>';
        }
        
        return stars;
    }

    // Render Orders List
    renderOrders() {
        const orders = this.data.recentOrders;
        const container = document.getElementById('orders-list');
        document.getElementById('orders-count').textContent = orders.length;

        container.innerHTML = orders.map(order => {
            const statusClass = this.getStatusClass(order.status);

            return `
                <div class="order-item d-flex justify-content-between align-items-center px-4 py-3 border-bottom">
                    <div class="d-flex align-items-center">
                        <div class="avatar avatar-md me-3">
                            <img src="assets/static/images/faces/${order.customer.avatar}.jpg" alt="${order.customer.name}">
                        </div>
                        <div>
                            <p class="mb-0 fw-bold">${order.customer.name}</p>
                            <small class="text-muted">${order.product}</small>
                        </div>
                    </div>
                    <div class="text-end">
                        <p class="mb-0 fw-bold">${this.formatCurrency(order.amount)}</p>
                        <span class="badge ${statusClass}">${order.status}</span>
                    </div>
                </div>
            `;
        }).join('');
    }

    getStatusClass(status) {
        const classes = {
            'Delivered': 'bg-success',
            'Shipped': 'bg-info',
            'Processing': 'bg-warning',
            'Pending': 'bg-secondary'
        };
        return classes[status] || 'bg-secondary';
    }

    // Render Team Members
    renderTeam() {
        const team = this.data.teamMembers;
        const container = document.getElementById('team-list');

        container.innerHTML = team.map(member => {
            const statusColor = member.status === 'online' ? 'bg-success' : 
                               member.status === 'away' ? 'bg-warning' : 'bg-secondary';

            return `
                <div class="team-member d-flex align-items-center p-3 rounded mb-2">
                    <div class="position-relative me-3">
                        <div class="avatar avatar-md">
                            <img src="assets/static/images/faces/${member.avatar}.jpg" alt="${member.name}">
                        </div>
                        <span class="status-indicator ${statusColor}"></span>
                    </div>
                    <div class="flex-grow-1">
                        <h6 class="mb-0">${member.name}</h6>
                        <small class="text-muted">${member.role}</small>
                    </div>
                    <div class="text-end">
                        <span class="badge bg-light-primary">${member.tasksCompleted} tasks</span>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Render Tasks
    renderTasks() {
        const tasks = this.data.tasks;
        const container = document.getElementById('tasks-list');

        container.innerHTML = tasks.map(task => {
            const priorityClass = task.priority === 'high' ? 'bg-danger' : 
                                 task.priority === 'medium' ? 'bg-warning' : 'bg-info';
            const isCompleted = task.status === 'completed';

            return `
                <div class="task-item px-4 py-3 border-bottom ${isCompleted ? 'completed' : ''}">
                    <div class="d-flex align-items-center">
                        <div class="form-check me-3">
                            <input class="form-check-input" type="checkbox" ${isCompleted ? 'checked' : ''}>
                        </div>
                        <div class="flex-grow-1">
                            <p class="mb-0 ${isCompleted ? 'text-decoration-line-through text-muted' : ''}">${task.title}</p>
                            <small class="text-muted">Due: ${new Date(task.dueDate).toLocaleDateString()}</small>
                        </div>
                        <span class="badge ${priorityClass}">${task.priority}</span>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Render Notifications
    renderNotifications() {
        const notifications = this.data.notifications;
        const container = document.getElementById('notifications-list');
        const unreadCount = notifications.filter(n => !n.read).length;
        document.getElementById('unread-count').textContent = unreadCount;

        container.innerHTML = notifications.map(notif => {
            const iconClass = this.getNotificationIcon(notif.type);

            return `
                <div class="notification-item px-4 py-3 border-bottom ${!notif.read ? 'unread' : ''}">
                    <div class="d-flex align-items-start">
                        <div class="notification-icon me-3">
                            <i class="bi ${iconClass}"></i>
                        </div>
                        <div class="flex-grow-1">
                            <p class="mb-0">${notif.message}</p>
                            <small class="text-muted">${notif.time}</small>
                        </div>
                        ${!notif.read ? '<span class="badge bg-primary rounded-pill">New</span>' : ''}
                    </div>
                </div>
            `;
        }).join('');
    }

    getNotificationIcon(type) {
        const icons = {
            'order': 'bi-cart-check',
            'user': 'bi-person-plus',
            'alert': 'bi-exclamation-triangle',
            'success': 'bi-check-circle'
        };
        return icons[type] || 'bi-bell';
    }

    // Setup Event Listeners
    setupEventListeners() {
        // Refresh button
        document.getElementById('refreshData')?.addEventListener('click', () => {
            location.reload();
        });

        // Save Product
        document.getElementById('saveProduct')?.addEventListener('click', () => {
            this.handleSaveProduct();
        });

        // Save Task
        document.getElementById('saveTask')?.addEventListener('click', () => {
            this.handleSaveTask();
        });
    }

    handleSaveProduct() {
        const form = document.getElementById('addProductForm');
        const formData = new FormData(form);
        
        const newProduct = {
            id: this.data.products.length + 1,
            name: formData.get('productName'),
            category: formData.get('category'),
            price: parseFloat(formData.get('price')),
            stock: parseInt(formData.get('stock')),
            status: parseInt(formData.get('stock')) > 0 ? 'In Stock' : 'Out of Stock',
            image: 'https://via.placeholder.com/60x60/435ebe/fff?text=NP',
            rating: 0
        };

        this.data.products.unshift(newProduct);
        this.renderProducts();
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('addProductModal'));
        modal.hide();
        form.reset();

        this.showToast('Product added successfully!', 'success');
    }

    handleSaveTask() {
        const form = document.getElementById('addTaskForm');
        const formData = new FormData(form);
        
        const newTask = {
            id: this.data.tasks.length + 1,
            title: formData.get('taskTitle'),
            priority: formData.get('priority'),
            dueDate: formData.get('dueDate'),
            assignee: 'You',
            status: 'pending'
        };

        this.data.tasks.unshift(newTask);
        this.renderTasks();
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('addTaskModal'));
        modal.hide();
        form.reset();

        this.showToast('Task added successfully!', 'success');
    }

    showToast(message, type = 'info') {
        // Create toast container if it doesn't exist
        let toastContainer = document.getElementById('toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'toast-container';
            toastContainer.className = 'position-fixed top-0 end-0 p-3';
            toastContainer.style.zIndex = '9999';
            document.body.appendChild(toastContainer);
        }

        const toastId = 'toast-' + Date.now();
        const bgClass = type === 'success' ? 'bg-success' : type === 'error' ? 'bg-danger' : 'bg-info';
        
        const toastHTML = `
            <div id="${toastId}" class="toast align-items-center text-white ${bgClass} border-0" role="alert">
                <div class="d-flex">
                    <div class="toast-body">${message}</div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
                </div>
            </div>
        `;
        
        toastContainer.insertAdjacentHTML('beforeend', toastHTML);
        const toastElement = document.getElementById(toastId);
        const toast = new bootstrap.Toast(toastElement);
        toast.show();
        
        toastElement.addEventListener('hidden.bs.toast', () => {
            toastElement.remove();
        });
    }
}

// Initialize dashboard when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new DashboardManager();
});
