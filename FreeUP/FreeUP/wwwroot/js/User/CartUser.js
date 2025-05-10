document.addEventListener("DOMContentLoaded", function () {
    // Initialize variables
    const quantityDisplay = document.querySelector('.quantity-display');
    const updateCartBtn = document.querySelector('.update-cart');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const accordions = document.querySelectorAll('.accordion');

    let quantity = 1;
    const price = 221.00;
    const discountRate = 0.20; // 20% discount


    function updatePrices() {
        const subtotal = price * quantity;
        const discount = subtotal * discountRate;
        const tax = 0; // Tax is $0.00 as per the design
        const total = subtotal - discount + tax;

        // Update display
        document.querySelector('.subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.querySelector('.summary-subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.querySelector('.summary-discount').textContent = `-$${discount.toFixed(2)}`;
        document.querySelector('.summary-tax').textContent = `$${tax.toFixed(2)}`;
        document.querySelector('.summary-total').textContent = `$${total.toFixed(2)}`;
    }

    

    // Remove item functionality
    removeBtn.addEventListener('click', function () {
        const cartItem = this.closest('.cart-item');
        cartItem.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            cartItem.remove();
            updateEmptyCartState();
        }, 300);
    });

    function updateEmptyCartState() {
        const cartItems = document.querySelectorAll('.cart-item');
        if (cartItems.length === 0) {
            const emptyMessage = document.createElement('tr');
            emptyMessage.innerHTML = `
                <td colspan="4" style="text-align: center; padding: 40px;">
                    Your cart is empty
                </td>
            `;
            document.querySelector('tbody').appendChild(emptyMessage);
        }
    }

    // Accordion functionality
    accordions.forEach(accordion => {
        accordion.addEventListener('click', function () {
            this.classList.toggle('active');
            const panel = this.nextElementSibling;

            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
                panel.classList.remove('active');
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
                panel.classList.add('active');
            }
        });
    });

    // Form validation
    function validateForm() {
        const address = document.getElementById('address').value;
        const mobile = document.getElementById('mobile').value;
        const zip = document.getElementById('zip').value;

        if (!address || !mobile || !zip) {
            showError('Please fill in all required fields');
            return false;
        }

        if (!validateMobile(mobile)) {
            showError('Please enter a valid mobile number');
            return false;
        }

        return true;
    }

    function validateMobile(mobile) {
        const mobileRegex = /^[0-9]{10}$/;
        return mobileRegex.test(mobile);
    }

    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            background-color: #ffebee;
            color: #d32f2f;
            padding: 10px;
            margin: 10px 0;
            border-radius: 4px;
            animation: fadeIn 0.3s ease-out;
        `;

        // Remove existing error messages
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        document.querySelector('.summary-section').insertBefore(
            errorDiv,
            document.querySelector('.checkout-btn')
        );

        // Remove error after 3 seconds
        setTimeout(() => {
            errorDiv.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => errorDiv.remove(), 300);
        }, 3000);
    }

    // Checkout button
    checkoutBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (validateForm()) {
            // Simulate checkout process
            this.textContent = 'Processing...';
            this.disabled = true;

            setTimeout(() => {
                alert('Order placed successfully!');
                this.textContent = 'PROCEED TO CHECKOUT';
                this.disabled = false;
            }, 2000);
        }
    });

    // Update cart button
    updateCartBtn.addEventListener('click', function () {
        this.textContent = 'Updating...';
        this.disabled = true;

        setTimeout(() => {
            this.textContent = 'UPDATE SHOPPING CART';
            this.disabled = false;
            showSuccess('Cart updated successfully!');
        }, 1000);
    });

    function showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        successDiv.style.cssText = `
            background-color: #e8f5e9;
            color: #2e7d32;
            padding: 10px;
            margin: 10px 0;
            border-radius: 4px;
            animation: fadeIn 0.3s ease-out;
        `;

        document.querySelector('.cart-items').appendChild(successDiv);

        setTimeout(() => {
            successDiv.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => successDiv.remove(), 300);
        }, 3000);
    }

    // Initialize prices
    updatePrices();

    // Add keyframe animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
});