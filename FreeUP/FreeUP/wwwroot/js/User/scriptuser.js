document.addEventListener('DOMContentLoaded', function () {
    // Slider functionality
    let index = 0;
    const slider = document.getElementById('slider');

    function showSlide() {
        if (slider) {
            slider.style.transform = `translateX(-${index * 100}vw)`;
        }
    }

    window.nextSlide = function () {
        index = (index + 1) % 3;
        showSlide();
    }

    window.prevSlide = function () {
        index = (index - 1 + 3) % 3;
        showSlide();
    }

    // Auto slide
    const slideInterval = setInterval(nextSlide, 5000);

    // More menu functionality

    const moreMenuButton = document.querySelector('.more-menu');
    const submenu = document.querySelector('.submenu');

    if (moreMenuButton && submenu) {
        moreMenuButton.addEventListener('click', function (e) {
            e.stopPropagation();
            submenu.classList.toggle('active');
        });

        // Close submenu when clicking outside
        document.addEventListener('click', function (e) {
            if (!submenu.contains(e.target) && !moreMenuButton.contains(e.target)) {
                submenu.classList.remove('active');
            }
        });
    }


    // Stop slider auto-play when hovering over it
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        hero.addEventListener('mouseleave', () => {
            setInterval(nextSlide, 5000);
        });
    }

    // Product slider functionality
    let productIndex = 0;
    const productsContainer = document.getElementById('productsSlider');
    const productCards = document.querySelectorAll('.product-card');
    const productsToShow = window.innerWidth <= 480 ? 1 : window.innerWidth <= 768 ? 2 : window.innerWidth <= 1024 ? 3 : 4;

    function showProducts() {
        if (productsContainer) {
            const slideAmount = (100 / productsToShow);
            productsContainer.style.transform = `translateX(-${productIndex * slideAmount}%)`;
        }
    }

    window.nextProduct = function () {
        const maxIndex = productCards.length - productsToShow;
        productIndex = productIndex >= maxIndex ? 0 : productIndex + 1;
        showProducts();
    }

    window.prevProduct = function () {
        const maxIndex = productCards.length - productsToShow;
        productIndex = productIndex <= 0 ? maxIndex : productIndex - 1;
        showProducts();
    }

    // Wishlist functionality
    document.querySelectorAll('.wishlist').forEach(button => {
        button.addEventListener('click', function () {
            const icon = this.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
            icon.style.color = icon.classList.contains('fas') ? '#ff4081' : '#666';
        });
    });

    // Quick view and compare functionality
    document.querySelectorAll('.quick-view, .compare').forEach(button => {
        button.addEventListener('click', function () {
            // Add your quick view or compare functionality here
            alert('Feature coming soon!');
        });
    });

    // Update products to show on window resize
    window.addEventListener('resize', function () {
        const newProductsToShow = window.innerWidth <= 480 ? 1 : window.innerWidth <= 768 ? 2 : window.innerWidth <= 1024 ? 3 : 4;
        if (newProductsToShow !== productsToShow) {
            productIndex = 0;
            showProducts();
        }
    });

    
    
    
});