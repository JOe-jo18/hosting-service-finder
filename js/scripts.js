// ============================================
// HOSTING SERVICE FINDER - ADVANCED SCRIPTS
// ============================================

// ========== INTERSECTION OBSERVER FOR ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// ========== DOM READY ========== 
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeSearch();
    initializeProviderCards();
    initializeCtaButtons();
    initializeNavigation();
    initializeScrollEffects();
    initializeFormValidation();
    setupKeyboardShortcuts();
});

// ========== INITIALIZE ANIMATIONS ==========
function initializeAnimations() {
    const animateElements = document.querySelectorAll(
        '.provider-card, .blog article, .specs, .reviews, .comparison-table'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// ========== SEARCH FUNCTIONALITY ==========
function initializeSearch() {
    const searchButton = document.querySelector('.search-bar button');
    const searchInput = document.querySelector('.search-bar input');
    
    if (searchButton && searchInput) {
        // Search on button click
        searchButton.addEventListener('click', performSearch);
        
        // Search on Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Real-time search feedback
        searchInput.addEventListener('input', function() {
            if (this.value.length > 0) {
                this.style.borderColor = 'var(--primary-light)';
            } else {
                this.style.borderColor = '';
            }
        });
    }
}

function performSearch() {
    const query = document.querySelector('.search-bar input')?.value || '';
    
    if (query.trim() === '') {
        showNotification('Please enter a search term', 'warning');
        return;
    }
    
    showNotification(`Searching for hosting providers: "${query}"`, 'info');
    
    // Simulate search delay
    setTimeout(() => {
        showNotification('Search results loaded!', 'success');
    }, 800);
}

// ========== PROVIDER CARDS ==========
function initializeProviderCards() {
    const providerButtons = document.querySelectorAll('.provider-card button');
    
    providerButtons.forEach((button) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            addRippleEffect(button, e);
            
            const providerName = this.closest('.provider-card')?.querySelector('h4')?.textContent || 'Provider';
            showNotification(`${providerName} details coming soon!`, 'info');
        });
        
        // Add hover sound effect possibility
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ========== CTA BUTTONS ==========
function initializeCtaButtons() {
    const ctaButtons = document.querySelectorAll('.cta button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            addRippleEffect(button, e);
            
            const targetText = button.textContent.trim();
            
            if (targetText === 'Compare Providers') {
                animateNavigation('services.html');
            } else {
                animateNavigation('services.html');
            }
        });
    });
}

// ========== NAVIGATION EFFECTS ==========
function initializeNavigation() {
    const navLinks = document.querySelectorAll('header nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.href === window.location.href) {
                e.preventDefault();
            }
        });
    });
}

// ========== SCROLL EFFECTS ==========
function initializeScrollEffects() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        }
    });
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            hero.style.backgroundPosition = `0 ${scrolled * 0.5}px`;
        });
    }
}

// ========== FORM VALIDATION ==========
function initializeFormValidation() {
    const selects = document.querySelectorAll('.filters select');
    
    selects.forEach(select => {
        select.addEventListener('change', function() {
            console.log(`Filter changed: ${this.id} = ${this.value}`);
            // Trigger filter logic
            applyFilters();
        });
    });
}

function applyFilters() {
    const priceRange = document.getElementById('price-range')?.value;
    const location = document.getElementById('location')?.value;
    
    if (priceRange || location) {
        showNotification('Filters applied!', 'success');
    }
}

// ========== RIPPLE EFFECT ==========
function addRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    // Add ripple animation
    const animation = ripple.animate([
        { transform: 'scale(0)', opacity: 1 },
        { transform: 'scale(4)', opacity: 0 }
    ], {
        duration: 600,
        easing: 'ease-out'
    });
    
    element.appendChild(ripple);
    
    animation.onfinish = () => ripple.remove();
}

// ========== NOTIFICATION SYSTEM ==========
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        background: ${getNotificationColor(type)};
        color: white;
        font-weight: 600;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function getNotificationColor(type) {
    const colors = {
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#6366f1'
    };
    return colors[type] || colors.info;
}

// ========== NAVIGATION ANIMATION ==========
function animateNavigation(url) {
    const main = document.querySelector('main');
    if (main) {
        main.style.opacity = '0.5';
        main.style.transform = 'translateY(10px)';
    }
    
    setTimeout(() => {
        window.location.href = url;
    }, 300);
}

// ========== KEYBOARD SHORTCUTS ==========
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K for search focus
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('.search-bar input');
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        }
        
        // Escape to close notifications
        if (e.key === 'Escape') {
            const notifications = document.querySelectorAll('.notification');
            notifications.forEach(n => n.remove());
        }
    });
}

// ========== PAGE ANIMATIONS ==========
window.addEventListener('load', function() {
    // Fade in page
    document.body.style.opacity = '1';
});

// ========== SMOOTH PAGE TRANSITIONS ==========
document.addEventListener('click', function(e) {
    const link = e.target.closest('a:not([target="_blank"]):not([href^="#"]):not([href^="http"])');
    
    if (link && !link.closest('header nav a')) {
        e.preventDefault();
        const href = link.getAttribute('href');
        
        if (href && href !== window.location.pathname) {
            animateNavigation(href);
        }
    }
});

// ========== ADD ANIMATIONS TO CSS ==========
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        pointer-events: none;
    }
`;
document.head.appendChild(style);