// Seller Registration Form Validation
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const fileInput = document.querySelector('input[type="file"]');
    
    if (form) {
        form.addEventListener('submit', function (event) {
            // Validate file size
            if (fileInput && fileInput.files.length > 0) {
                const file = fileInput.files[0];
                const maxSize = 2 * 1024 * 1024; // 2MB
                
                if (file.size > maxSize) {
                    event.preventDefault();
                    alert('File size exceeds the maximum limit of 2MB. Please upload a smaller file.');
                    return false;
                }
                
                // Validate file type
                const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
                if (!allowedTypes.includes(file.type)) {
                    event.preventDefault();
                    alert('Only JPG, PNG, and PDF files are allowed.');
                    return false;
                }
            }
            
            // Additional client-side validation can be added here
        });
    }
    
    // Terms and conditions modal functionality
    const termsCheckbox = document.querySelector('#AgreeToTerms');
    const termsModal = document.querySelector('#termsModal');
    
    if (termsModal) {
        termsModal.addEventListener('hidden.bs.modal', function () {
            // Focus back on checkbox when modal is closed
            if (termsCheckbox) {
                termsCheckbox.focus();
            }
        });
    }
});