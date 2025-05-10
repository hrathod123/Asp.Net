document.addEventListener("DOMContentLoaded", function () {

    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Show corresponding tab pane
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Quantity selector
    const decreaseBtn = document.getElementById('decreaseQuantity');
    const increaseBtn = document.getElementById('increaseQuantity');
    const quantityInput = document.getElementById('quantityInput');
    const quantityHidden = document.getElementById('quantity-hidden');

    // Decrease Quantity
    decreaseBtn.addEventListener('click', function () {
        let quantity = parseInt(quantityInput.value);
        if (quantity > 1) {
            quantityInput.value = quantity - 1;
            quantityHidden.value = quantity - 1; // Update hidden field
        }
    });

    // Increase Quantity
    increaseBtn.addEventListener('click', function () {
        let quantity = parseInt(quantityInput.value);
        quantityInput.value = quantity + 1;
        quantityHidden.value = quantity + 1; // Update hidden field
    });

    // Wishlist button
    const wishlistBtn = document.getElementById('wishlistBtn');

    wishlistBtn.addEventListener('click', function () {
        this.classList.toggle('active');

        // Add heart animation
        if (this.classList.contains('active')) {
            const icon = this.querySelector('i');
            icon.classList.remove('fa-heart');
            icon.classList.remove('far');
            icon.classList.add('fas');
            icon.classList.add('fa-heart');

            // Add pulse animation
            icon.style.animation = 'pulse 0.5s';
            setTimeout(() => {
                icon.style.animation = '';
            }, 500);
        } else {
            const icon = this.querySelector('i');
            icon.classList.remove('fas');
            icon.classList.add('far');
        }
    });

    // Add to cart button
    const addToCartBtn = document.getElementById('addToCartBtn');

    addToCartBtn.addEventListener('click', function () {
        // Add "added" class for visual feedback
        this.classList.add('added');

        // Change button text
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> ADDED TO CART';

        // Reset button after 2 seconds
        setTimeout(() => {
            this.classList.remove('added');
            this.innerHTML = originalText;
        }, 2000);

        // Simulate cart notification (you can expand this)
        showNotification('Product added to cart!');
    });

    // Notification function
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;

        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '4px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            zIndex: '1000',
            opacity: '0',
            transform: 'translateY(-20px)',
            transition: 'opacity 0.3s, transform 0.3s'
        });

        // Add to document
        document.body.appendChild(notification);

        // Trigger animation
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';

            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Image hover effect enhancement
    const productImage = document.getElementById('productImage');

    productImage.addEventListener('mousemove', function (e) {
        // Get cursor position relative to the image
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate percentage position
        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;

        // Apply subtle perspective tilt effect
        this.style.transform = `scale(1.05) perspective(1000px) rotateY(${(xPercent - 50) / 20}deg) rotateX(${(50 - yPercent) / 20}deg)`;
    });

    productImage.addEventListener('mouseleave', function () {
        // Reset transform on mouse leave
        this.style.transform = '';
    });
    {
        // Reset transform on mouse leave
        this.style.transform = '';
    }

    // Policy item hover effects
    const policyItems = document.querySelectorAll('.policy-item');

    policyItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            const icon = this.querySelector('.policy-icon');
            icon.style.transform = 'scale(1.1)';
        });

        item.addEventListener('mouseleave', function () {
            const icon = this.querySelector('.policy-icon');
            icon.style.transform = '';
        });
    });

    // Smooth scroll to tabs when clicking on review link
    const reviewLink = document.querySelector('.review-link');

    reviewLink.addEventListener('click', function (e) {
        e.preventDefault();

        // Find the reviews tab and click it
        const reviewsTab = document.querySelector('[data-tab="reviews"]');
        reviewsTab.click();

        // Scroll to the tabs section
        const tabsContainer = document.querySelector('.tabs-container');
        tabsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // Add animation to elements when they come into view
    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.policy-section, .tabs-container');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for scroll animation elements
    document.querySelectorAll('.policy-section, .tabs-container').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    });

    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);

    // Trigger once on load
    animateOnScroll();
});
