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
const signupForm = document.querySelector('.signup-form');
const signupPassword = document.querySelector('#signupPassword');
const signupConfirmPassword = document.querySelector('#confirmPassword');
const signupPasswordToggle = document.querySelector('#signupPasswordToggle');
const signupConfirmPasswordToggle = document.querySelector('#confirmPasswordToggle');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeCarousel();
    initializeSearch();
    initializeFilters();
    initializeBookmarks();
    initializeBorrowButtons();
    initializeLogin();
    initializeSignup();
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

// Signup functionality
function initializeSignup() {
    if (!signupForm) return;

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fullName = signupForm.querySelector('#fullName')?.value?.trim();
        const email = signupForm.querySelector('#signupEmail')?.value?.trim();
        const phone = signupForm.querySelector('#phone')?.value?.trim();
        const memberId = signupForm.querySelector('#memberId')?.value?.trim();
        const password = signupPassword?.value || '';
        const confirmPassword = signupConfirmPassword?.value || '';

        if (!fullName || !email || !phone || !memberId || !password || !confirmPassword) {
            alert('Please complete all fields to create your account.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        const createButton = signupForm.querySelector('.signup-btn');
        createButton.textContent = 'Creating account...';
        createButton.disabled = true;

        setTimeout(() => {
            createButton.textContent = 'Create Account';
            createButton.disabled = false;
            alert(`Account created for ${fullName}!`);
            signupForm.reset();
        }, 1000);
    });

    if (signupPasswordToggle) {
        signupPasswordToggle.addEventListener('click', () => {
            togglePasswordField(signupPassword, signupPasswordToggle);
        });
    }

    if (signupConfirmPasswordToggle) {
        signupConfirmPasswordToggle.addEventListener('click', () => {
            togglePasswordField(signupConfirmPassword, signupConfirmPasswordToggle);
        });
    }
}

function togglePasswordField(input, toggleButton) {
    if (!input || !toggleButton) return;
    const isVisible = input.type === 'text';
    input.type = isVisible ? 'password' : 'text';
    toggleButton.querySelector('.material-icons').textContent = isVisible ? 'visibility' : 'visibility_off';
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

// Books Page Specific Functionality
// Year Slider functionality
const yearSlider = document.getElementById('yearSlider');
const yearDisplay = document.getElementById('yearDisplay');

if (yearSlider) {
    yearSlider.addEventListener('input', (e) => {
        yearDisplay.textContent = e.target.value;
    });
}

// Apply Filters Button for Books Page
const applyFiltersBtn = document.getElementById('applyFiltersBtn');
if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener('click', () => {
        const selectedCategories = [];
        const selectedAvailability = [];
        const selectedAuthors = [];

        document.querySelectorAll('input[name="category"]:checked').forEach(cb => {
            selectedCategories.push(cb.value);
        });
        document.querySelectorAll('input[name="availability"]:checked').forEach(cb => {
            selectedAvailability.push(cb.value);
        });
        document.querySelectorAll('input[name="author"]:checked').forEach(cb => {
            selectedAuthors.push(cb.value);
        });

        console.log('Filters Applied:', {
            categories: selectedCategories,
            availability: selectedAvailability,
            authors: selectedAuthors,
            publicationYear: yearSlider.value
        });

        applyFiltersBtn.textContent = 'Filters Applied!';
        applyFiltersBtn.style.backgroundColor = '#10b981';

        setTimeout(() => {
            applyFiltersBtn.textContent = 'Apply Filters';
            applyFiltersBtn.style.backgroundColor = '';
        }, 2000);
    });
}

// View Toggle
const viewBtns = document.querySelectorAll('.view-btn');
viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        viewBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        console.log('View changed to:', btn.dataset.view);
    });
});

// Borrow Button functionality for Books Page
document.querySelectorAll('.btn-borrow-small').forEach(btn => {
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

// Wishlist Button functionality for Books Page
document.querySelectorAll('.btn-wishlist-small').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        btn.classList.toggle('added-to-wishlist');

        if (btn.classList.contains('added-to-wishlist')) {
            btn.textContent = '✓ Added';
            btn.style.backgroundColor = '#dbeafe';
            btn.style.color = '#1e40af';
        } else {
            btn.textContent = 'Add Wishlist';
            btn.style.backgroundColor = '';
            btn.style.color = '';
        }

        console.log('Wishlist toggled');
    });
});

