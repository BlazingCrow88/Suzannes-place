// ============================================
// SUZANNE'S PLACE - WEBSITE JAVASCRIPT
// Mobile menu and interactive functionality
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = this.querySelectorAll('span');
            if (mainNav.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on a nav link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    mainNav.classList.remove('active');
                    const spans = mobileMenuToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
        });
    }
    
    
    // ============================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ============================================
    
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal anchor links, not just "#"
            if (href && href !== '#') {
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    
                    // Calculate offset to account for sticky header
                    const headerHeight = document.querySelector('.site-header').offsetHeight;
                    const menuNavHeight = document.querySelector('.menu-nav')?.offsetHeight || 0;
                    const offset = headerHeight + menuNavHeight + 20;
                    
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    
    // ============================================
    // FORM VALIDATION AND SUBMISSION
    // ============================================
    
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Basic validation is handled by HTML5 required attributes
            // This is a placeholder for additional validation if needed
            
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#D84315';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill out all required fields.');
            }
        });
        
        // Remove error styling when user starts typing
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = '';
            });
        });
    });
    
    
    // ============================================
    // HIGHLIGHT CURRENT PAGE IN NAVIGATION
    // ============================================
    
    function highlightCurrentPage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.main-nav a');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            
            if (linkPage === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    highlightCurrentPage();
    
    
    // ============================================
    // LAZY LOADING FOR IMAGES (PERFORMANCE)
    // ============================================
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // If image has data-src attribute, use it
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    
                    observer.unobserve(img);
                }
            });
        });
        
        // Observe all images with data-src attribute
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    
    // ============================================
    // ACTIVE SECTION HIGHLIGHTING (for menu navigation)
    // ============================================
    
    const menuCategoryLinks = document.querySelectorAll('.menu-cat-link');
    
    if (menuCategoryLinks.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    
                    menuCategoryLinks.forEach(link => {
                        link.classList.remove('active');
                        
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            rootMargin: '-20% 0px -70% 0px'
        });
        
        const sections = document.querySelectorAll('.menu-category');
        sections.forEach(section => observer.observe(section));
    }
    
    
    // ============================================
    // ADD LOADING STATE TO BUTTONS
    // ============================================
    
    const submitButtons = document.querySelectorAll('button[type="submit"]');
    
    submitButtons.forEach(button => {
        button.addEventListener('click', function() {
            const form = this.closest('form');
            
            if (form.checkValidity()) {
                this.classList.add('loading');
                this.disabled = true;
                
                // Re-enable after form submission (handled by form action)
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.disabled = false;
                }, 3000);
            }
        });
    });
    
    
    // ============================================
    // SCROLL TO TOP BUTTON (Optional Enhancement)
    // ============================================
    
    // Create scroll to top button
    const scrollTopButton = document.createElement('button');
    scrollTopButton.innerHTML = '↑';
    scrollTopButton.className = 'scroll-to-top';
    scrollTopButton.setAttribute('aria-label', 'Scroll to top');
    scrollTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #D84315;
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(scrollTopButton);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopButton.style.display = 'block';
        } else {
            scrollTopButton.style.display = 'none';
        }
    });
    
    // Scroll to top when clicked
    scrollTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect for scroll to top button
    scrollTopButton.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#BF360C';
        this.style.transform = 'scale(1.1)';
    });
    
    scrollTopButton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#D84315';
        this.style.transform = 'scale(1)';
    });
    
    
    // ============================================
    // PERFORMANCE: Defer non-critical resources
    // ============================================
    
    // This function can be used to load non-critical resources after page load
    function loadDeferredResources() {
        // Example: Load analytics, social media widgets, etc.
        // This keeps initial page load fast
    }
    
    // Load deferred resources after page is fully loaded
    if (document.readyState === 'complete') {
        loadDeferredResources();
    } else {
        window.addEventListener('load', loadDeferredResources);
    }
    
    
    // ============================================
    // CONSOLE MESSAGE (Optional branding)
    // ============================================
    
    console.log('%cSuzanne\'s Place', 'font-size: 24px; font-weight: bold; color: #D84315;');
    console.log('%cCold Beer, Great Food', 'font-size: 14px; color: #5D4037;');
    console.log('Website built with care for the Dorrance, Kansas community');
    
});
