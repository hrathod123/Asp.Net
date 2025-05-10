/**
 * Seller Registration Form JavaScript
 * Handles form validation, file uploads, and UI interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const registrationForm = document.querySelector('#sellerRegistrationForm');
    const fileInput = document.querySelector('#PanCardDocument');
    const filePreview = document.querySelector('.file-preview');
    const filePreviewImage = document.querySelector('.file-preview img');
    const fileName = document.querySelector('.file-name');
    const fileUploadBtn = document.querySelector('.file-upload-btn');
    const termsCheckbox = document.querySelector('#AgreeToTerms');
    const termsModal = document.querySelector('#termsModal');
    const submitButton = document.querySelector('button[type="submit"]');
    
    // Custom file upload handling
    if (fileUploadBtn && fileInput) {
        fileUploadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            fileInput.click();
        });
        
        fileInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const file = this.files[0];
                
                // Validate file size (max 2MB)
                if (file.size > 2 * 1024 * 1024) {
                    alert('File size exceeds the maximum limit of 2MB. Please upload a smaller file.');
                    this.value = '';
                    return;
                }
                
                // Validate file type
                const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
                if (!allowedTypes.includes(file.type)) {
                    alert('Only JPG, PNG, and PDF files are allowed.');
                    this.value = '';
                    return;
                }
                
                // Show file preview for images
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        filePreviewImage.src = e.target.result;
                        filePreview.style.display = 'block';
                    };
                    reader.readAsDataURL(file);
                } else {
                    // For PDFs, show a placeholder
                    filePreviewImage.src = '/images/pdf-icon.png';
                    filePreview.style.display = 'block';
                }
                
                // Show file name
                fileName.textContent = file.name;
            }
        });
    }
    
    // Terms and conditions modal
    if (termsModal) {
        termsModal.addEventListener('hidden.bs.modal', function() {
            // Focus back on checkbox when modal is closed
            if (termsCheckbox) {
                termsCheckbox.focus();
            }
        });
    }
    
    // Form validation
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            let isValid = true;
            
            // Basic validation for required fields
            const requiredFields = registrationForm.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('input-validation-error');
                    
                    // Create error message if it doesn't exist
                    let errorSpan = field.nextElementSibling;
                    if (!errorSpan || !errorSpan.classList.contains('field-validation-error')) {
                        errorSpan = document.createElement('span');
                        errorSpan.classList.add('field-validation-error');
                        errorSpan.textContent = 'This field is required.';
                        field.parentNode.insertBefore(errorSpan, field.nextSibling);
                    }
                } else {
                    field.classList.remove('input-validation-error');
                    
                    // Remove error message if it exists
                    let errorSpan = field.nextElementSibling;
                    if (errorSpan && errorSpan.classList.contains('field-validation-error')) {
                        errorSpan.remove();
                    }
                }
            });
            
            // Email validation
            const emailField = registrationForm.querySelector('#Email');
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('input-validation-error');
                    
                    // Create error message if it doesn't exist
                    let errorSpan = emailField.nextElementSibling;
                    if (!errorSpan || !errorSpan.classList.contains('field-validation-error')) {
                        errorSpan = document.createElement('span');
                        errorSpan.classList.add('field-validation-error');
                        errorSpan.textContent = 'Please enter a valid email address.';
                        emailField.parentNode.insertBefore(errorSpan, emailField.nextSibling);
                    }
                }
            }
            
            // Phone validation
            const phoneField = registrationForm.querySelector('#Phone');
            if (phoneField && phoneField.value.trim()) {
                const phonePattern = /^\d{10}$/;
                if (!phonePattern.test(phoneField.value.replace(/\D/g, ''))) {
                    isValid = false;
                    phoneField.classList.add('input-validation-error');
                    
                    // Create error message if it doesn't exist
                    let errorSpan = phoneField.nextElementSibling;
                    if (!errorSpan || !errorSpan.classList.contains('field-validation-error')) {
                        errorSpan = document.createElement('span');
                        errorSpan.classList.add('field-validation-error');
                        errorSpan.textContent = 'Please enter a valid 10-digit phone number.';
                        phoneField.parentNode.insertBefore(errorSpan, phoneField.nextSibling);
                    }
                }
            }
            
            // Terms and conditions validation
            if (termsCheckbox && !termsCheckbox.checked) {
                isValid = false;
                
                // Create error message if it doesn't exist
                let errorSpan = termsCheckbox.parentNode.nextElementSibling;
                if (!errorSpan || !errorSpan.classList.contains('field-validation-error')) {
                    errorSpan = document.createElement('span');
                    errorSpan.classList.add('field-validation-error');
                    errorSpan.textContent = 'You must agree to the terms and conditions.';
                    termsCheckbox.parentNode.parentNode.appendChild(errorSpan);
                }
            } else if (termsCheckbox) {
                // Remove error message if it exists
                let errorSpan = termsCheckbox.parentNode.nextElementSibling;
                if (errorSpan && errorSpan.classList.contains('field-validation-error')) {
                    errorSpan.remove();
                }
            }
            
            if (!isValid) {
                event.preventDefault();
                
                // Scroll to the first error
                const firstError = registrationForm.querySelector('.input-validation-error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstError.focus();
                }
            } else if (submitButton) {
                // Disable submit button to prevent double submission
                submitButton.disabled = true;
                submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting...';
            }
        });
        
        // Clear validation errors on input
        registrationForm.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('input', function() {
                this.classList.remove('input-validation-error');
                
                // Remove error message if it exists
                let errorSpan = this.nextElementSibling;
                if (errorSpan && errorSpan.classList.contains('field-validation-error')) {
                    errorSpan.remove();
                }
            });
        });
    }
});