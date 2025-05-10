/**
 * Seller Applications List JavaScript
 * Handles table functionality, filtering, and actions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize DataTable if available
    initializeDataTable();
    
    // Setup filter functionality
    setupFilters();
    
    // Setup action button handlers
    setupActionButtons();
    
    // Setup alert dismissal
    setupAlertDismissal();
});

/**
 * Initializes the DataTable for the applications list
 */
function initializeDataTable() {
    const applicationsTable = document.getElementById('applicationsTable');
    
    if (applicationsTable && typeof $.fn.DataTable !== 'undefined') {
        $(applicationsTable).DataTable({
            responsive: true,
            order: [[3, 'desc']], // Sort by submission date descending
            language: {
                search: "_INPUT_",
                searchPlaceholder: "Search applications...",
                lengthMenu: "Show _MENU_ applications per page",
                info: "Showing _START_ to _END_ of _TOTAL_ applications",
                infoEmpty: "Showing 0 to 0 of 0 applications",
                infoFiltered: "(filtered from _MAX_ total applications)",
                zeroRecords: "No matching applications found",
                emptyTable: "No applications available"
            },
            columnDefs: [
                { orderable: false, targets: [5] } // Disable sorting on actions column
            ],
            dom: '<"applications-table-top"lf>rt<"applications-table-bottom"ip>',
            lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
            pageLength: 10
        });
        
        // Add custom classes to DataTable elements
        $('.dataTables_length select').addClass('form-select form-select-sm');
        $('.dataTables_filter input').addClass('form-control form-control-sm');
    }
}

/**
 * Sets up filter functionality for the applications list
 */
function setupFilters() {
    const statusFilter = document.getElementById('statusFilter');
    const dateFilter = document.getElementById('dateFilter');
    
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            filterApplications();
        });
    }
    
    if (dateFilter) {
        dateFilter.addEventListener('change', function() {
            filterApplications();
        });
    }
}

/**
 * Filters the applications list based on selected filters
 */
function filterApplications() {
    const statusFilter = document.getElementById('statusFilter');
    const dateFilter = document.getElementById('dateFilter');
    const applicationsTable = document.getElementById('applicationsTable');
    
    if (!applicationsTable) return;
    
    const rows = applicationsTable.querySelectorAll('tbody tr');
    
    rows.forEach(row => {
        let showRow = true;
        
        // Apply status filter
        if (statusFilter && statusFilter.value !== 'all') {
            const statusCell = row.querySelector('td:nth-child(5)');
            if (statusCell) {
                const statusText = statusCell.textContent.trim().toLowerCase();
                if (statusText !== statusFilter.value.toLowerCase()) {
                    showRow = false;
                }
            }
        }
        
        // Apply date filter
        if (dateFilter && dateFilter.value !== 'all' && showRow) {
            const dateCell = row.querySelector('td:nth-child(4)');
            if (dateCell) {
                const dateText = dateCell.textContent.trim();
                const rowDate = new Date(dateText);
                const today = new Date();
                
                switch (dateFilter.value) {
                    case 'today':
                        if (rowDate.toDateString() !== today.toDateString()) {
                            showRow = false;
                        }
                        break;
                    case 'yesterday':
                        const yesterday = new Date();
                        yesterday.setDate(today.getDate() - 1);
                        if (rowDate.toDateString() !== yesterday.toDateString()) {
                            showRow = false;
                        }
                        break;
                    case 'week':
                        const weekAgo = new Date();
                        weekAgo.setDate(today.getDate() - 7);
                        if (rowDate < weekAgo) {
                            showRow = false;
                        }
                        break;
                    case 'month':
                        const monthAgo = new Date();
                        monthAgo.setMonth(today.getMonth() - 1);
                        if (rowDate < monthAgo) {
                            showRow = false;
                        }
                        break;
                }
            }
        }
        
        // Show or hide row
        row.style.display = showRow ? '' : 'none';
    });
}

/**
 * Sets up action button handlers
 */
function setupActionButtons() {
    // View application buttons
    const viewButtons = document.querySelectorAll('.btn-view-application');
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const applicationId = this.getAttribute('data-id');
            window.location.href = `/Admin/ViewApplication/${applicationId}`;
        });
    });
    
    // Approve application buttons
    const approveButtons = document.querySelectorAll('.btn-approve-application');
    approveButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const applicationId = this.getAttribute('data-id');
            const businessName = this.getAttribute('data-business-name');
            
            if (confirm(`Are you sure you want to approve the seller application for "${businessName}"?`)) {
                window.location.href = `/Admin/ApproveApplication/${applicationId}`;
            }
        });
    });
    
    // Reject application buttons
    const rejectButtons = document.querySelectorAll('.btn-reject-application');
    rejectButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const applicationId = this.getAttribute('data-id');
            const businessName = this.getAttribute('data-business-name');
            
            if (confirm(`Are you sure you want to reject the seller application for "${businessName}"?`)) {
                window.location.href = `/Admin/RejectApplication/${applicationId}`;
            }
        });
    });
}

/**
 * Sets up alert dismissal functionality
 */
function setupAlertDismissal() {
    const alerts = document.querySelectorAll('.alert-dismissible');
    alerts.forEach(alert => {
        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        }, 5000);
    });
}