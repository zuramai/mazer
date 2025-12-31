/**
 * Orders Management Page
 * Handles order display and status updates
 */

class OrdersManager {
    constructor() {
        this.orders = [];
        this.filteredOrders = [];
        this.init();
    }

    async init() {
        try {
            await this.loadData();
            this.filteredOrders = [...this.orders];
            this.renderSummary();
            this.renderOrders();
            this.setupEventListeners();
        } catch (error) {
            console.error('Error initializing orders:', error);
        }
    }

    async loadData() {
        const response = await fetch('/assets/data/data.json');
        const data = await response.json();
        this.orders = data.recentOrders;
    }

    formatCurrency(value) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(value);
    }

    formatDate(dateStr) {
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
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

    renderSummary() {
        const container = document.getElementById('order-summary');
        
        const summary = {
            total: this.orders.length,
            pending: this.orders.filter(o => o.status === 'Pending').length,
            processing: this.orders.filter(o => o.status === 'Processing').length,
            shipped: this.orders.filter(o => o.status === 'Shipped').length,
            delivered: this.orders.filter(o => o.status === 'Delivered').length,
            revenue: this.orders.reduce((sum, o) => sum + o.amount, 0)
        };

        container.innerHTML = `
            <div class="col-6 col-lg-2 col-md-4">
                <div class="card">
                    <div class="card-body py-3 px-4">
                        <p class="text-muted mb-1">Total Orders</p>
                        <h4 class="mb-0">${summary.total}</h4>
                    </div>
                </div>
            </div>
            <div class="col-6 col-lg-2 col-md-4">
                <div class="card">
                    <div class="card-body py-3 px-4">
                        <p class="text-muted mb-1">Pending</p>
                        <h4 class="mb-0 text-secondary">${summary.pending}</h4>
                    </div>
                </div>
            </div>
            <div class="col-6 col-lg-2 col-md-4">
                <div class="card">
                    <div class="card-body py-3 px-4">
                        <p class="text-muted mb-1">Processing</p>
                        <h4 class="mb-0 text-warning">${summary.processing}</h4>
                    </div>
                </div>
            </div>
            <div class="col-6 col-lg-2 col-md-4">
                <div class="card">
                    <div class="card-body py-3 px-4">
                        <p class="text-muted mb-1">Shipped</p>
                        <h4 class="mb-0 text-info">${summary.shipped}</h4>
                    </div>
                </div>
            </div>
            <div class="col-6 col-lg-2 col-md-4">
                <div class="card">
                    <div class="card-body py-3 px-4">
                        <p class="text-muted mb-1">Delivered</p>
                        <h4 class="mb-0 text-success">${summary.delivered}</h4>
                    </div>
                </div>
            </div>
            <div class="col-6 col-lg-2 col-md-4">
                <div class="card">
                    <div class="card-body py-3 px-4">
                        <p class="text-muted mb-1">Revenue</p>
                        <h4 class="mb-0 text-primary">${this.formatCurrency(summary.revenue)}</h4>
                    </div>
                </div>
            </div>
        `;
    }

    renderOrders() {
        const tbody = document.getElementById('orders-tbody');

        if (this.filteredOrders.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center py-4 text-muted">
                        <i class="bi bi-inbox display-4"></i>
                        <p class="mt-2">No orders found</p>
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = this.filteredOrders.map(order => `
            <tr>
                <td>
                    <span class="fw-bold text-primary">${order.id}</span>
                </td>
                <td>
                    <div class="d-flex align-items-center">
                        <div class="avatar avatar-md me-3">
                            <img src="assets/static/images/faces/${order.customer.avatar}.jpg" alt="${order.customer.name}">
                        </div>
                        <div>
                            <p class="mb-0 fw-bold">${order.customer.name}</p>
                            <small class="text-muted">${order.customer.email}</small>
                        </div>
                    </div>
                </td>
                <td>${order.product}</td>
                <td class="fw-bold">${this.formatCurrency(order.amount)}</td>
                <td>${this.formatDate(order.date)}</td>
                <td>
                    <span class="badge ${this.getStatusClass(order.status)}">${order.status}</span>
                </td>
                <td>
                    <div class="d-flex gap-1">
                        <button class="btn btn-sm btn-outline-primary" onclick="ordersManager.viewOrder('${order.id}')" title="View Details">
                            <i class="bi bi-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-secondary" onclick="ordersManager.showUpdateStatus('${order.id}')" title="Update Status">
                            <i class="bi bi-pencil"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    viewOrder(orderId) {
        const order = this.orders.find(o => o.id === orderId);
        if (!order) return;

        const content = document.getElementById('orderDetailsContent');
        content.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <h6 class="text-muted mb-3">Order Information</h6>
                    <table class="table table-borderless">
                        <tr>
                            <td class="text-muted">Order ID:</td>
                            <td class="fw-bold">${order.id}</td>
                        </tr>
                        <tr>
                            <td class="text-muted">Product:</td>
                            <td>${order.product}</td>
                        </tr>
                        <tr>
                            <td class="text-muted">Amount:</td>
                            <td class="fw-bold text-primary">${this.formatCurrency(order.amount)}</td>
                        </tr>
                        <tr>
                            <td class="text-muted">Date:</td>
                            <td>${this.formatDate(order.date)}</td>
                        </tr>
                        <tr>
                            <td class="text-muted">Status:</td>
                            <td><span class="badge ${this.getStatusClass(order.status)}">${order.status}</span></td>
                        </tr>
                    </table>
                </div>
                <div class="col-md-6">
                    <h6 class="text-muted mb-3">Customer Information</h6>
                    <div class="d-flex align-items-center mb-3">
                        <div class="avatar avatar-lg me-3">
                            <img src="assets/static/images/faces/${order.customer.avatar}.jpg" alt="${order.customer.name}">
                        </div>
                        <div>
                            <h5 class="mb-0">${order.customer.name}</h5>
                            <p class="text-muted mb-0">${order.customer.email}</p>
                        </div>
                    </div>
                </div>
            </div>
            <hr>
            <h6 class="text-muted mb-3">Order Timeline</h6>
            <div class="timeline">
                ${this.getOrderTimeline(order.status)}
            </div>
        `;

        document.getElementById('updateOrderStatus').onclick = () => {
            this.showUpdateStatus(orderId);
        };

        const modal = new bootstrap.Modal(document.getElementById('orderDetailsModal'));
        modal.show();
    }

    getOrderTimeline(currentStatus) {
        const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered'];
        const currentIndex = statuses.indexOf(currentStatus);

        return statuses.map((status, index) => {
            const isCompleted = index <= currentIndex;
            const isCurrent = index === currentIndex;
            
            return `
                <div class="timeline-item ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}">
                    <div class="timeline-marker ${isCompleted ? 'bg-success' : 'bg-light'}">
                        <i class="bi ${isCompleted ? 'bi-check' : 'bi-circle'} text-${isCompleted ? 'white' : 'muted'}"></i>
                    </div>
                    <div class="timeline-content">
                        <span class="${isCompleted ? 'fw-bold' : 'text-muted'}">${status}</span>
                    </div>
                </div>
            `;
        }).join('');
    }

    showUpdateStatus(orderId) {
        const order = this.orders.find(o => o.id === orderId);
        if (!order) return;

        document.getElementById('updateOrderId').value = orderId;
        document.getElementById('newStatus').value = order.status;

        // Close any open modals first
        const openModals = document.querySelectorAll('.modal.show');
        openModals.forEach(modal => {
            bootstrap.Modal.getInstance(modal)?.hide();
        });

        setTimeout(() => {
            const modal = new bootstrap.Modal(document.getElementById('updateStatusModal'));
            modal.show();
        }, 300);
    }

    updateStatus() {
        const orderId = document.getElementById('updateOrderId').value;
        const newStatus = document.getElementById('newStatus').value;

        const orderIndex = this.orders.findIndex(o => o.id === orderId);
        if (orderIndex !== -1) {
            this.orders[orderIndex].status = newStatus;
            this.filterOrders();
            this.renderSummary();
        }

        const modal = bootstrap.Modal.getInstance(document.getElementById('updateStatusModal'));
        modal.hide();

        this.showToast(`Order ${orderId} status updated to ${newStatus}`, 'success');
    }

    filterOrders() {
        const searchTerm = document.getElementById('searchOrders').value.toLowerCase();
        const statusFilter = document.getElementById('statusFilter').value;
        const dateFilter = document.getElementById('dateFilter').value;

        this.filteredOrders = this.orders.filter(order => {
            const matchesSearch = order.id.toLowerCase().includes(searchTerm) ||
                                  order.customer.name.toLowerCase().includes(searchTerm) ||
                                  order.product.toLowerCase().includes(searchTerm);
            const matchesStatus = !statusFilter || order.status === statusFilter;
            const matchesDate = !dateFilter || order.date === dateFilter;

            return matchesSearch && matchesStatus && matchesDate;
        });

        this.renderOrders();
    }

    exportOrders() {
        const csvContent = [
            ['Order ID', 'Customer', 'Email', 'Product', 'Amount', 'Date', 'Status'],
            ...this.filteredOrders.map(order => [
                order.id,
                order.customer.name,
                order.customer.email,
                order.product,
                order.amount,
                order.date,
                order.status
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `orders_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);

        this.showToast('Orders exported successfully!', 'success');
    }

    showToast(message, type = 'info') {
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

    setupEventListeners() {
        // Search
        document.getElementById('searchOrders').addEventListener('input', 
            this.debounce(() => this.filterOrders(), 300));

        // Filters
        document.getElementById('statusFilter').addEventListener('change', () => this.filterOrders());
        document.getElementById('dateFilter').addEventListener('change', () => this.filterOrders());

        // Export
        document.getElementById('exportOrders').addEventListener('click', () => this.exportOrders());

        // Update status confirmation
        document.getElementById('confirmStatusUpdate').addEventListener('click', () => this.updateStatus());
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Make it globally accessible for onclick handlers
let ordersManager;
document.addEventListener('DOMContentLoaded', () => {
    ordersManager = new OrdersManager();
});
