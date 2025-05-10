document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    document.querySelector('.mobile-menu-toggle').addEventListener('click', function () {
        const mobileMenu = document.querySelector('.mobile-menu');
        mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
    });

    // Price Range Filter
    const priceRange = document.getElementById('priceRange');
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');
    const applyPriceFilter = document.getElementById('applyPriceFilter');

    // Update max price when slider changes
    priceRange.addEventListener('input', function () {
        maxPrice.value = this.value;
        filterProducts();
    });

    // Validate min price
    minPrice.addEventListener('input', function () {
        if (parseInt(this.value) > parseInt(maxPrice.value)) {
            this.value = maxPrice.value;
        }
    });

    // Validate max price and update slider
    maxPrice.addEventListener('input', function () {
        if (parseInt(this.value) < parseInt(minPrice.value)) {
            this.value = minPrice.value;
        }
        priceRange.value = this.value;
    });

    // Apply price filter button
    applyPriceFilter.addEventListener('click', filterProducts);

    // Sort products
    const sortSelect = document.getElementById('sortSelect');
    sortSelect.addEventListener('change', sortProducts);

    // Initialize with default sort (price low to high)
    sortProducts();

    // View Toggle
    const viewButtons = document.querySelectorAll('.view-button');
    const productGrid = document.querySelector('.product-grid');

    viewButtons.forEach(button => {
        button.addEventListener('click', function () {
            viewButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            if (this.getAttribute('aria-label') === 'List view') {
                productGrid.style.gridTemplateColumns = '1fr';
            } else {
                if (window.innerWidth > 992) {
                    productGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
                } else if (window.innerWidth > 576) {
                    productGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
                } else {
                    productGrid.style.gridTemplateColumns = '1fr';
                }
            }
        });
    });

    // Wishlist functionality
    document.addEventListener('click', function (e) {
        if (e.target.closest('.product-action-btn')) {
            const btn = e.target.closest('.product-action-btn');
            if (btn.getAttribute('aria-label') === 'Add to wishlist') {
                const icon = btn.querySelector('i');
                if (icon.classList.contains('far')) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                }
            }
        }
    });

    // Pagination
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            if (!this.classList.contains('next')) {
                paginationBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Function to filter products by price
    function filterProducts() {
        const min = parseFloat(minPrice.value);
        const max = parseFloat(maxPrice.value);
        const products = document.querySelectorAll('.product-card');

        products.forEach(product => {
            const price = parseFloat(product.getAttribute('data-price'));
            if (price >= min && price <= max) {
                product.classList.remove('hidden');
            } else {
                product.classList.add('hidden');
            }
        });
    }

    // Function to sort products
    function sortProducts() {
        const sortBy = sortSelect.value;
        const productGrid = document.getElementById('productGrid');
        const products = Array.from(productGrid.querySelectorAll('.product-card'));

        products.sort((a, b) => {
            if (sortBy === 'price-low-high') {
                return parseFloat(a.getAttribute('data-price')) - parseFloat(b.getAttribute('data-price'));
            } else if (sortBy === 'price-high-low') {
                return parseFloat(b.getAttribute('data-price')) - parseFloat(a.getAttribute('data-price'));
            } else if (sortBy === 'name') {
                return a.getAttribute('data-name').localeCompare(b.getAttribute('data-name'));
            }
            return 0;
        });

        // Remove all products
        products.forEach(product => product.remove());

        // Add sorted products back
        products.forEach(product => {
            productGrid.appendChild(product);
        });
    }

    // Responsive adjustments
    function handleResponsive() {
        const gridView = document.querySelector('.view-button[aria-label="Grid view"]');
        if (gridView.classList.contains('active')) {
            if (window.innerWidth > 992) {
                productGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
            } else if (window.innerWidth > 576) {
                productGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
            } else {
                productGrid.style.gridTemplateColumns = '1fr';
            }
        }
    }

    window.addEventListener('resize', handleResponsive);
    handleResponsive();
});