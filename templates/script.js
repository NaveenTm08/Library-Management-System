// DOM Elements
const carouselBtns = document.querySelectorAll('.carousel-btn');
const trendingCarousel = document.querySelector('.trending-carousel');
const searchInput = document.querySelector('.search-bar input');
const filterSelects = document.querySelectorAll('.filter-select');
const applyFiltersBtn = document.querySelector('.btn-filter');
const bookCards = document.querySelectorAll('.book-card');
const borrowBtns = document.querySelectorAll('.btn-borrow');
const bookmarkBtns = document.querySelectorAll('.bookmark-btn');
const loginForm = document.querySelector('.login-form');
const passwordInput = document.querySelector('#password');
const passwordToggle = document.querySelector('.password-toggle');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeCarousel();
    initializeSearch();
    initializeFilters();
    initializeBookmarks();
    initializeBorrowButtons();
    initializeLogin();
});

// Carousel functionality
function initializeCarousel() {
    if (!carouselBtns || !trendingCarousel) return;

    carouselBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const scrollAmount = 200;
            if (index === 0) {
                // Previous
                trendingCarousel.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
            } else {
                // Next
                trendingCarousel.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Search functionality
function initializeSearch() {
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        filterBooks(searchTerm);
    });

    // Keyboard shortcut (⌘K / Ctrl+K)
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
    });
}

// Filter books based on search
function filterBooks(searchTerm) {
    const booksGrid = document.querySelector('.books-grid');
    if (!booksGrid) return;

    const books = booksGrid.querySelectorAll('.book-card');
    books.forEach(book => {
        const title = book.querySelector('.book-title')?.textContent.toLowerCase();
        const author = book.querySelector('.book-author')?.textContent.toLowerCase();

        if (title && author) {
            if (title.includes(searchTerm) || author.includes(searchTerm)) {
                book.style.display = '';
            } else {
                book.style.display = 'none';
            }
        }
    });
}

// Filter functionality
function initializeFilters() {
    if (!applyFiltersBtn) return;

    applyFiltersBtn.addEventListener('click', () => {
        const categorySelect = filterSelects[0];
        const availabilitySelect = filterSelects[1];

        const selectedCategory = categorySelect?.value;
        const selectedAvailability = availabilitySelect?.value;

        console.log('Filters applied:', {
            category: selectedCategory,
            availability: selectedAvailability
        });

        // Show a feedback message
        applyFiltersBtn.textContent = 'Filters Applied!';
        applyFiltersBtn.style.backgroundColor = '#10b981';

        setTimeout(() => {
            applyFiltersBtn.textContent = 'Apply Filters';
            applyFiltersBtn.style.backgroundColor = '';
        }, 2000);
    });
}

// Bookmark functionality
function initializeBookmarks() {
    bookmarkBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            btn.classList.toggle('bookmarked');

            if (btn.classList.contains('bookmarked')) {
                btn.style.color = '#2563eb';
                console.log('Book bookmarked');
            } else {
                btn.style.color = '';
                console.log('Book unbookmarked');
            }
        });
    });
}

// Borrow button functionality
function initializeBorrowButtons() {
    borrowBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            const originalText = btn.textContent;
            btn.textContent = 'Borrowed!';
            btn.style.backgroundColor = '#10b981';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = '';
                btn.disabled = false;
            }, 2000);

            console.log('Book borrowed');
        });
    });
}

// Login functionality
function initializeLogin() {
    if (!loginForm || !passwordInput || !passwordToggle) return;

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginForm.querySelector('#email')?.value?.trim();
        const password = passwordInput.value;

        if (!email || !password) {
            alert('Please enter your email and password.');
            return;
        }

        loginForm.querySelector('.login-btn').textContent = 'Logging in...';
        setTimeout(() => {
            loginForm.querySelector('.login-btn').textContent = 'Login';
            alert(`Welcome back, ${email}!`);
        }, 900);
    });

    passwordToggle.addEventListener('click', () => {
        const isPasswordVisible = passwordInput.type === 'text';
        passwordInput.type = isPasswordVisible ? 'password' : 'text';
        passwordToggle.querySelector('.material-icons').textContent = isPasswordVisible ? 'visibility' : 'visibility_off';
    });
}

// Navigation link active state
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Icon button notifications example
const notificationBtn = document.querySelector('.navbar-right .icon-btn');
if (notificationBtn) {
    notificationBtn.addEventListener('click', () => {
        console.log('Notifications clicked');
    });
}

