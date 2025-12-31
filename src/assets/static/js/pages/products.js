/**
 * Products Management Page
 * Handles CRUD operations for products
 */

class ProductsManager {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
        this.currentPage = 1;
        this.itemsPerPage = 6;
        this.init();
    }

    async init() {
        try {
            await this.loadData();
            this.filteredProducts = [...this.products];
            this.renderProducts();
            this.setupEventListeners();
        } catch (error) {
            console.error('Error initializing products:', error);
        }
    }

    async loadData() {
        const response = await fetch('/assets/data/data.json');
        const data = await response.json();
        this.products = data.products;
    }

    formatCurrency(value) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(value);
    }

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

    getStatusClass(status) {
        const classes = {
            'In Stock': 'bg-success',
            'Low Stock': 'bg-warning',
            'Out of Stock': 'bg-danger'
        };
        return classes[status] || 'bg-secondary';
    }

    getProductStatus(stock) {
        if (stock === 0) return 'Out of Stock';
        if (stock <= 20) return 'Low Stock';
        return 'In Stock';
    }

    renderProducts() {
        const container = document.getElementById('products-grid');
        const emptyState = document.getElementById('empty-state');
        
        // Pagination
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);

        if (this.filteredProducts.length === 0) {
            container.innerHTML = '';
            emptyState.style.display = 'block';
            this.renderPagination(0);
            return;
        }

        emptyState.style.display = 'none';
        
        container.innerHTML = paginatedProducts.map(product => {
            const statusClass = this.getStatusClass(product.status);
            const stars = this.renderStars(product.rating);
            
            return `
                <div class="col-12 col-md-6 col-lg-4 mb-4">
                    <div class="card h-100 product-card">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-start mb-3">
                                <img src="${product.image}" alt="${product.name}" 
                                     class="rounded product-image" width="70" height="70">
                                <div class="dropdown">
                                    <button class="btn btn-sm btn-light" data-bs-toggle="dropdown">
                                        <i class="bi bi-three-dots-vertical"></i>
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end">
                                        <li>
                                            <a class="dropdown-item" href="#" onclick="productsManager.editProduct(${product.id})">
                                                <i class="bi bi-pencil me-2"></i> Edit
                                            </a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item text-danger" href="#" onclick="productsManager.deleteProduct(${product.id})">
                                                <i class="bi bi-trash me-2"></i> Delete
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <h5 class="card-title mb-1">${product.name}</h5>
                            <span class="badge bg-light-secondary mb-2">${product.category}</span>
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <span class="h5 mb-0 text-primary">${this.formatCurrency(product.price)}</span>
                                <span class="badge ${statusClass}">${product.status}</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="rating">
                                    ${stars}
                                    <span class="ms-1 text-muted">(${product.rating})</span>
                                </div>
                                <small class="text-muted">
                                    <i class="bi bi-box"></i> ${product.stock} in stock
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        this.renderPagination(this.filteredProducts.length);
    }

    renderPagination(totalItems) {
        const totalPages = Math.ceil(totalItems / this.itemsPerPage);
        const pagination = document.querySelector('#pagination-nav ul');

        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }

        let html = `
            <li class="page-item ${this.currentPage === 1 ? 'disabled' : ''}">
                <a class="page-link" href="#" onclick="productsManager.goToPage(${this.currentPage - 1})">
                    <i class="bi bi-chevron-left"></i>
                </a>
            </li>
        `;

        for (let i = 1; i <= totalPages; i++) {
            html += `
                <li class="page-item ${this.currentPage === i ? 'active' : ''}">
                    <a class="page-link" href="#" onclick="productsManager.goToPage(${i})">${i}</a>
                </li>
            `;
        }

        html += `
            <li class="page-item ${this.currentPage === totalPages ? 'disabled' : ''}">
                <a class="page-link" href="#" onclick="productsManager.goToPage(${this.currentPage + 1})">
                    <i class="bi bi-chevron-right"></i>
                </a>
            </li>
        `;

        pagination.innerHTML = html;
    }

    goToPage(page) {
        const totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
        if (page >= 1 && page <= totalPages) {
            this.currentPage = page;
            this.renderProducts();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    filterProducts() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const category = document.getElementById('categoryFilter').value;
        const status = document.getElementById('statusFilter').value;
        const sortBy = document.getElementById('sortBy').value;

        this.filteredProducts = this.products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                                  product.category.toLowerCase().includes(searchTerm);
            const matchesCategory = !category || product.category === category;
            const matchesStatus = !status || product.status === status;
            
            return matchesSearch && matchesCategory && matchesStatus;
        });

        // Sort
        switch (sortBy) {
            case 'name':
                this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'price-asc':
                this.filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                this.filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'stock':
                this.filteredProducts.sort((a, b) => b.stock - a.stock);
                break;
            case 'rating':
                this.filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
        }

        this.currentPage = 1;
        this.renderProducts();
    }

    editProduct(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) return;

        document.getElementById('productModalTitle').textContent = 'Edit Product';
        document.getElementById('productId').value = product.id;
        document.getElementById('productName').value = product.name;
        document.getElementById('productCategory').value = product.category;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productStock').value = product.stock;
        document.getElementById('productRating').value = product.rating;
        document.getElementById('productImage').value = product.image;

        const modal = new bootstrap.Modal(document.getElementById('productModal'));
        modal.show();
    }

    deleteProduct(id) {
        document.getElementById('deleteProductId').value = id;
        const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
        modal.show();
    }

    confirmDelete() {
        const id = parseInt(document.getElementById('deleteProductId').value);
        this.products = this.products.filter(p => p.id !== id);
        this.filterProducts();
        
        const modal = bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
        modal.hide();
        
        this.showToast('Product deleted successfully!', 'success');
    }

    saveProduct() {
        const form = document.getElementById('productForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const id = document.getElementById('productId').value;
        const stock = parseInt(document.getElementById('productStock').value);
        
        const productData = {
            name: document.getElementById('productName').value,
            category: document.getElementById('productCategory').value,
            price: parseFloat(document.getElementById('productPrice').value),
            stock: stock,
            status: this.getProductStatus(stock),
            rating: parseFloat(document.getElementById('productRating').value) || 0,
            image: document.getElementById('productImage').value || 'https://via.placeholder.com/60x60/435ebe/fff?text=NP'
        };

        if (id) {
            // Update existing product
            const index = this.products.findIndex(p => p.id === parseInt(id));
            if (index !== -1) {
                this.products[index] = { ...this.products[index], ...productData };
            }
            this.showToast('Product updated successfully!', 'success');
        } else {
            // Add new product
            const newId = Math.max(...this.products.map(p => p.id), 0) + 1;
            this.products.push({ id: newId, ...productData });
            this.showToast('Product added successfully!', 'success');
        }

        this.filterProducts();
        
        const modal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
        modal.hide();
        form.reset();
        document.getElementById('productId').value = '';
    }

    resetForm() {
        document.getElementById('productModalTitle').textContent = 'Add New Product';
        document.getElementById('productForm').reset();
        document.getElementById('productId').value = '';
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
        // Search input
        document.getElementById('searchInput').addEventListener('input', 
            this.debounce(() => this.filterProducts(), 300));

        // Filters
        document.getElementById('categoryFilter').addEventListener('change', () => this.filterProducts());
        document.getElementById('statusFilter').addEventListener('change', () => this.filterProducts());
        document.getElementById('sortBy').addEventListener('change', () => this.filterProducts());

        // Reset filters
        document.getElementById('resetFilters').addEventListener('click', () => {
            document.getElementById('searchInput').value = '';
            document.getElementById('categoryFilter').value = '';
            document.getElementById('statusFilter').value = '';
            document.getElementById('sortBy').value = 'name';
            this.filterProducts();
        });

        // Save product
        document.getElementById('saveProduct').addEventListener('click', () => this.saveProduct());

        // Confirm delete
        document.getElementById('confirmDelete').addEventListener('click', () => this.confirmDelete());

        // Reset form when modal opens for new product
        document.getElementById('productModal').addEventListener('show.bs.modal', (e) => {
            if (!e.relatedTarget || !e.relatedTarget.closest('[onclick*="editProduct"]')) {
                this.resetForm();
            }
        });
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
let productsManager;
document.addEventListener('DOMContentLoaded', () => {
    productsManager = new ProductsManager();
});
