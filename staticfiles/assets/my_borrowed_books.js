// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    initializeSearch();
    initializeFiltersAndSort();
});

// Initialize all event listeners
function initializeEventListeners() {
    // Renew book buttons
    const renewButtons = document.querySelectorAll('.action-btn.primary');
    renewButtons.forEach((btn) => {
        if (btn.textContent.includes('Renew')) {
            btn.addEventListener('click', handleRenewBook);
        }
    });

    // Return request buttons
    renewButtons.forEach((btn) => {
        if (btn.textContent.includes('Return')) {
            btn.addEventListener('click', handleReturnRequest);
        }
    });

    // View details buttons
    const detailsButtons = document.querySelectorAll('.action-btn.secondary');
    detailsButtons.forEach((btn) => {
        btn.addEventListener('click', handleViewDetails);
    });

    // View borrowing history button
    const historyBtn = document.querySelector('.view-history-btn');
    if (historyBtn) {
        historyBtn.addEventListener('click', handleViewHistory);
    }

    // Find a book button
    const findBookBtn = document.querySelector('.find-book-btn');
    if (findBookBtn) {
        findBookBtn.addEventListener('click', handleFindBook);
    }

    // Navigation links
    const navLinks = document.querySelectorAll('.nav-main a, .sidebar-nav a');
    navLinks.forEach((link) => {
        link.addEventListener('click', handleNavigation);
    });

    // Keyboard shortcut for search
    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('.search-box input');
            if (searchInput) {
                searchInput.focus();
            }
        }
    });

    // Notification button
    const notificationBtn = document.querySelector('.icon-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', handleNotifications);
    }
}

// Handle renew book action
function handleRenewBook(e) {
    const bookCard = e.target.closest('.book-card');
    const bookTitle = bookCard.querySelector('.book-title').textContent;
    
    console.log(`Renewing book: ${bookTitle}`);
    
    // Show confirmation or success message
    showNotification(`${bookTitle} has been renewed successfully!`, 'success');
    
    // Update the progress bar and remaining days
    const progressText = bookCard.querySelector('.progress-text');
    const daysRemaining = parseInt(progressText.textContent);
    if (!isNaN(daysRemaining)) {
        const newDays = daysRemaining + 14; // Typically 14 days extension
        progressText.textContent = `${newDays} Days Remaining`;
        
        // Update progress bar
        const progressFill = bookCard.querySelector('.progress-fill');
        const newPercentage = Math.min((newDays / 30) * 100, 100);
        progressFill.style.width = `${newPercentage}%`;
        
        // Update percentage text
        const progressPercentage = bookCard.querySelector('.progress-percentage');
        progressPercentage.textContent = `${Math.round(newPercentage)}%`;
    }
}

// Handle return request
function handleReturnRequest(e) {
    const bookCard = e.target.closest('.book-card');
    const bookTitle = bookCard.querySelector('.book-title').textContent;
    
    if (confirm(`Are you sure you want to request return for "${bookTitle}"?`)) {
        console.log(`Requesting return for: ${bookTitle}`);
        showNotification(`Return request submitted for ${bookTitle}`, 'success');
        
        // Optionally disable the button or change its state
        e.target.disabled = true;
        e.target.textContent = 'Return Requested';
    }
}

// Handle view details
function handleViewDetails(e) {
    const bookCard = e.target.closest('.book-card');
    const bookTitle = bookCard.querySelector('.book-title').textContent;
    const bookAuthor = bookCard.querySelector('.book-author').textContent;
    
    console.log(`Viewing details for: ${bookTitle} by ${bookAuthor}`);
    showNotification(`Opening details for ${bookTitle}...`, 'info');
    
    // In a real application, this would navigate to a details page
    // window.location.href = `/book-details/${bookId}`;
}

// Handle view borrowing history
function handleViewHistory(e) {
    e.preventDefault();
    console.log('Viewing borrowing history');
    showNotification('Navigating to borrowing history...', 'info');
    
    // In a real application, this would navigate to the history page
    // window.location.href = '/borrowing-history';
}

// Handle find book
function handleFindBook(e) {
    console.log('Opening find book');
    showNotification('Opening book search...', 'info');
    
    // In a real application, this would navigate to the books page or open a search modal
    // window.location.href = '/books';
}

// Handle navigation
function handleNavigation(e) {
    if (e.target.getAttribute('href') === '#') {
        e.preventDefault();
    }
    
    const linkText = e.target.textContent.trim();
    console.log(`Navigating to: ${linkText}`);
}

// Handle notifications
function handleNotifications(e) {
    console.log('Opening notifications');
    showNotification('You have 2 new notifications', 'info');
}

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-box input');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            filterBooks(searchTerm);
        });
    }
}

// Filter books based on search term
function filterBooks(searchTerm) {
    const bookCards = document.querySelectorAll('.book-card');
    
    bookCards.forEach((card) => {
        const title = card.querySelector('.book-title').textContent.toLowerCase();
        const author = card.querySelector('.book-author').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || author.includes(searchTerm)) {
            card.style.display = 'grid';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Check if any results found
    const visibleCards = document.querySelectorAll('.book-card[style="display: grid;"], .book-card:not([style])');
    if (visibleCards.length === 0 && searchTerm.length > 0) {
        showNotification('No books found matching your search', 'warning');
    }
}

// Initialize filters and sort
function initializeFiltersAndSort() {
    const filterBtn = document.querySelectorAll('.control-btn')[0];
    const sortBtn = document.querySelectorAll('.control-btn')[1];
    
    if (filterBtn) {
        filterBtn.addEventListener('click', handleFilter);
    }
    
    if (sortBtn) {
        sortBtn.addEventListener('click', handleSort);
    }
}

// Handle filter action
function handleFilter() {
    console.log('Opening filter options');
    showNotification('Filter options would open here', 'info');
    
    // In a real application, this would show a filter modal or dropdown
    // with options like: All, Active, Due Soon, Overdue, etc.
}

// Handle sort action
function handleSort() {
    console.log('Opening sort options');
    showNotification('Sort options would open here', 'info');
    
    // In a real application, this would show a sort dropdown
    // with options like: Date Added, Due Date, Title, Author, etc.
}

// Utility function to show notifications
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles if not already in CSS
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 16px 20px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Set type-specific styles
    if (type === 'success') {
        notification.style.backgroundColor = '#dcfce7';
        notification.style.color = '#15803d';
        notification.style.border = '1px solid #86efac';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#fee2e2';
        notification.style.color = '#991b1b';
        notification.style.border = '1px solid #fca5a5';
    } else if (type === 'warning') {
        notification.style.backgroundColor = '#fef3c7';
        notification.style.color = '#b45309';
        notification.style.border = '1px solid #fcd34d';
    } else {
        notification.style.backgroundColor = '#dbeafe';
        notification.style.color = '#1e40af';
        notification.style.border = '1px solid #93c5fd';
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Utility function to format dates
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Utility function to calculate days remaining
function calculateDaysRemaining(dueDate) {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

// Export functions for external use if needed
window.libraryApp = {
    formatDate,
    calculateDaysRemaining,
    showNotification,
    filterBooks,
    handleRenewBook,
    handleReturnRequest,
    handleViewDetails
};
