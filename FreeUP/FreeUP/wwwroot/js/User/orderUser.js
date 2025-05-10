document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const filterToggle = document.getElementById('filterToggle');
    const filters = document.querySelector('.filters');
    const searchInput = document.getElementById('searchInput');
    const ordersList = document.getElementById('ordersList');
    const resultsCount = document.getElementById('resultsCount');
    const noMoreResults = document.querySelector('.no-more-results');

    // Toggle filters on mobile
    filterToggle.addEventListener('click', function () {
        filters.classList.toggle('active');
    });

    // Close filters when clicking outside
    document.addEventListener('click', function (e) {
        if (filters.classList.contains('active') &&
            !filters.contains(e.target) &&
            e.target !== filterToggle) {
            filters.classList.remove('active');
        }
    });

    // Filter functionality
    const filterCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });

    // Search functionality
    let searchTimeout;
    searchInput.addEventListener('input', function () {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(applyFilters, 300);
    });

    // Apply filters to dynamically rendered content
    function applyFilters() {
        const selectedStatus = Array.from(document.querySelectorAll('input[name="status"]:checked'))
            .map(cb => cb.value);
        const selectedTime = Array.from(document.querySelectorAll('input[name="time"]:checked'))
            .map(cb => cb.value);
        const searchTerm = searchInput.value.toLowerCase();

        // Get all order cards
        const orderCards = document.querySelectorAll('.order-card');
        let visibleCount = 0;

        orderCards.forEach(card => {
            // Extract data from the card
            const productName = card.querySelector('.order-details h3').textContent.toLowerCase();
            const status = card.getAttribute('data-status');
            const deliveryDateElement = card.querySelector('.delivery-date');
            const deliveryDate = deliveryDateElement ? deliveryDateElement.textContent : '';

            // Check if the card matches all filters
            const matchesSearch = productName.includes(searchTerm);
            const matchesStatus = selectedStatus.length === 0 || selectedStatus.includes(status);
            const matchesTime = selectedTime.length === 0 || matchesTimeFilter(deliveryDate, selectedTime);

            // Show or hide the card
            if (matchesSearch && matchesStatus && matchesTime) {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });

        // Update results count
        resultsCount.textContent = visibleCount;

        // Show/hide "No More Results" message
        noMoreResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    // Check if a date matches the time filter
    function matchesTimeFilter(dateStr, selectedTime) {
        if (!dateStr) return false;

        // Parse the date string (format: "Mar 05, 2023")
        const parts = dateStr.split(' ');
        if (parts.length < 3) return false;

        const month = getMonthNumber(parts[0]);
        const day = parseInt(parts[1].replace(',', ''));
        const year = parseInt(parts[2]);

        if (isNaN(month) || isNaN(day) || isNaN(year)) return false;

        const orderDate = new Date(year, month, day);
        const now = new Date();

        return selectedTime.some(timeFilter => {
            switch (timeFilter) {
                case 'last-30-days':
                    const thirtyDaysAgo = new Date();
                    thirtyDaysAgo.setDate(now.getDate() - 30);
                    return orderDate >= thirtyDaysAgo;
                case '2024':
                    return orderDate.getFullYear() === 2024;
                case '2023':
                    return orderDate.getFullYear() === 2023;
                case '2022':
                    return orderDate.getFullYear() === 2022;
                case '2021':
                    return orderDate.getFullYear() === 2021;
                case 'older':
                    return orderDate.getFullYear() < 2021;
                default:
                    return true;
            }
        });
    }

    // Helper function to convert month name to month number
    function getMonthNumber(monthName) {
        const months = {
            'jan': 0, 'feb': 1, 'mar': 2, 'apr': 3, 'may': 4, 'jun': 5,
            'jul': 6, 'aug': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dec': 11
        };
        return months[monthName.toLowerCase().substring(0, 3)];
    }

    // Review button functionality
    ordersList.addEventListener('click', function (e) {
        if (e.target.closest('.review-btn')) {
            const button = e.target.closest('.review-btn');
            const productId = button.getAttribute('data-product-id');

            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';

            // Simulate loading state
            setTimeout(() => {
                // In a real application, you would redirect to a review page or open a modal
                // with the product ID
                console.log(`Opening review form for product ID: ${productId}`);
                alert(`Opening review form for product ID: ${productId}`);

                button.innerHTML = '<i class="fas fa-star"></i> Rate & Review Product';
            }, 1000);
        }
    });

    // Initialize filters
    applyFilters();
});