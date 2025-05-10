/**
 * View Application Details JavaScript
 * Handles document preview, action buttons, and UI interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Setup document preview functionality
    setupDocumentPreview();
    
    // Setup action button handlers
    setupActionButtons();
    
    // Setup timeline animation
    setupTimelineAnimation();
});

/**
 * Sets up document preview functionality
 */
function setupDocumentPreview() {
    const documentLinks = document.querySelectorAll('.document-link');
    
    documentLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const documentUrl = this.getAttribute('href');
            const documentType = this.getAttribute('data-type');
            
            if (documentType === 'pdf') {
                // Open PDF in new tab
                window.open(documentUrl, '_blank');
            } else {
                // Show image in modal
                const previewModal = document.getElementById('documentPreviewModal');
                if (previewModal) {
                    const previewImage = previewModal.querySelector('.modal-preview-image');
                    if (previewImage) {
                        previewImage.src = documentUrl;
                    }
                    
                    const modalTitle = previewModal.querySelector('.modal-title');
                    if (modalTitle) {
                        modalTitle.textContent = this.getAttribute('data-title') || 'Document Preview';
                    }
                    
                    const modal = new bootstrap.Modal(previewModal);
                    modal.show();
                }
            }
        });
    });
}

/**
 * Sets up action button handlers
 */
function setupActionButtons() {
    // Approve application button
    const approveButton = document.querySelector('.btn-approve-application');
    if (approveButton) {
        approveButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const applicationId = this.getAttribute('data-id');
            const businessName = this.getAttribute('data-business-name');
            
            if (confirm(`Are you sure you want to approve the seller application for "${businessName}"?`)) {
                // Show loading state
                this.disabled = true;
                this.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...';
                
                // Submit form
                const form = document.getElementById('approveApplicationForm');
                if (form) {
                    form.submit();
                } else {
                    window.location.href = `/Admin/ApproveApplication/${applicationId}`;
                }
            }
        });
    }
    
    // Reject application button
    const rejectButton = document.querySelector('.btn-reject-application');
    if (rejectButton) {
        rejectButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const applicationId = this.getAttribute('data-id');
            const businessName = this.getAttribute('data-business-name');
            
            // Show rejection modal if available
            const rejectionModal = document.getElementById('rejectionReasonModal');
            if (rejectionModal) {
                const modal = new bootstrap.Modal(rejectionModal);
                modal.show();
            } else {
                // Simple confirmation
                if (confirm(`Are you sure you want to reject the seller application for "${businessName}"?`)) {
                    // Show loading state
                    this.disabled = true;
                    this.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...';
                    
                    // Submit form
                    const form = document.getElementById('rejectApplicationForm');
                    if (form) {
                        form.submit();
                    } else {
                        window.location.href = `/Admin/RejectApplication/${applicationId}`;
                    }
                }
            }
        });
    }
    
    // Rejection reason form
    const rejectionForm = document.getElementById('rejectionReasonForm');
    if (rejectionForm) {
        rejectionForm.addEventListener('submit', function(e) {
            const reasonInput = this.querySelector('#rejectionReason');
            if (reasonInput && !reasonInput.value.trim()) {
                e.preventDefault();
                alert('Please provide a reason for rejection.');
                reasonInput.focus();
            }
        });
    }
}

/**
 * Sets up timeline animation
 */
function setupTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length > 0) {
        // Add animation classes with delay
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animate__animated', 'animate__fadeInLeft');
            }, index * 300);
        });
    }
}

/**
 * Toggles sections visibility
 */
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const isVisible = section.style.display !== 'none';
        
        if (isVisible) {
            section.style.display = 'none';
            document.querySelector(`[data-toggle="${sectionId}"] i`).classList.replace('bi-chevron-up', 'bi-chevron-down');
        } else {
            section.style.display = 'block';
            document.querySelector(`[data-toggle="${sectionId}"] i`).classList.replace('bi-chevron-down', 'bi-chevron-up');
        }
    }
}

/**
 * Zooms in on document preview
 */
function zoomDocument(element) {
    element.classList.toggle('zoomed');
    
    if (element.classList.contains('zoomed')) {
        element.style.maxHeight = 'none';
        element.style.cursor = 'zoom-out';
    } else {
        element.style.maxHeight = '300px';
        element.style.cursor = 'zoom-in';
    }
}