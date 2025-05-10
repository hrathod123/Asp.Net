document.addEventListener('DOMContentLoaded', function () {
    const productGrid = document.getElementById('productGrid');
    const sortButtons = document.querySelectorAll('.sort-btn');

    // Sort functionality
    sortButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            sortButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const sortType = this.getAttribute('data-sort');
            sortProducts(sortType);
        });
    });

    function sortProducts(sortType) {
        const products = Array.from(document.querySelectorAll('.product-card'));

        products.sort((a, b) => {
            const priceA = parseFloat(a.getAttribute('data-price'));
            const priceB = parseFloat(b.getAttribute('data-price'));

            switch (sortType) {
                case 'low-to-high':
                    return priceA - priceB;
                case 'high-to-low':
                    return priceB - priceA;
                default:
                    // Return to original order using index
                    return products.indexOf(a) - products.indexOf(b);
            }
        });

        // Remove existing products
        productGrid.innerHTML = '';

        // Add sorted products with animation
        products.forEach((product, index) => {
            product.style.animationDelay = `${index * 0.05}s`;
            productGrid.appendChild(product);
        });
    }

    // Wishlist functionality
    document.addEventListener('click', function (e) {
        if (e.target.closest('.wishlist-btn')) {
            const wishlistBtn = e.target.closest('.wishlist-btn');
            const icon = wishlistBtn.querySelector('i');

            wishlistBtn.classList.toggle('active');

            if (wishlistBtn.classList.contains('active')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
            }
        }
    });
});