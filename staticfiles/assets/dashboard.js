// Dashboard functionality

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeSearch();
    initializeButtons();
});

// Navigation functionality
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Search functionality
function initializeSearch() {
    const searchInput = document.querySelector('.header-search input');
    
    if (searchInput) {
        // Handle keyboard shortcut Cmd+K or Ctrl+K
        document.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                searchInput.focus();
            }
        });
    }
}

// Button interactions
function initializeButtons() {
    // Renew All Books button
    const renewBtn = document.querySelector('.renew-all-btn');
    if (renewBtn) {
        renewBtn.addEventListener('click', function() {
            this.textContent = 'Books Renewed!';
            this.style.backgroundColor = '#10b981';
            
            setTimeout(() => {
                this.textContent = 'Renew All Books';
                this.style.backgroundColor = '';
            }, 2000);
        });
    }
    
    // Recent Activity items
    const activityItems = document.querySelectorAll('.activity-item');
    activityItems.forEach(item => {
        item.addEventListener('click', function() {
            console.log('Activity item clicked');
        });
    });
    
    // Book cards
    const bookCards = document.querySelectorAll('.book-card');
    bookCards.forEach(card => {
        card.addEventListener('click', function() {
            console.log('Book card clicked');
        });
    });
    
    // Action buttons
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const label = this.querySelector('span:last-child').textContent;
            console.log(`Action clicked: ${label}`);
        });
    });
}

// Notification button
const notificationBtn = document.querySelector('.header-action-btn');
if (notificationBtn) {
    notificationBtn.addEventListener('click', function() {
        console.log('Notifications clicked');
    });
}

// Profile button
const profileImg = document.querySelector('.profile-img');
if (profileImg) {
    profileImg.addEventListener('click', function() {
        console.log('Profile clicked');
    });
}

// View All link
const viewAllLink = document.querySelector('.view-all-link');
if (viewAllLink) {
    viewAllLink.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('View All clicked');
    });
}
