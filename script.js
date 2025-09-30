// SY4Sale JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const userActions = document.querySelector('.user-actions');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            userActions.classList.toggle('active');
            this.classList.toggle('active');
            
            // Accessibility
            const expanded = this.getAttribute('aria-expanded') === 'true' || false;
            this.setAttribute('aria-expanded', !expanded);
        });
    }
    
    // Category Tabs
    const tabs = document.querySelectorAll('.category-tabs .tab');
    const listingsContainer = document.querySelector('.listings-grid');
    
    if (tabs.length > 0) {
        // Set first tab as active by default
        tabs[0].classList.add('active');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                tabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                console.log('Selected category:', category);
                
                // Simulate filtering with animation
                if (listingsContainer) {
                    listingsContainer.style.opacity = '0';
                    
                    setTimeout(() => {
                        // In a real implementation, you would filter listings here
                        listingsContainer.style.opacity = '1';
                        
                        // Update active category display
                        const categoryTitle = document.querySelector('.active-category');
                        if (categoryTitle) {
                            categoryTitle.textContent = this.textContent;
                        }
                    }, 300);
                }
            });
        });
    }
    
    // Horizontal scrolling functionality
    const scrollContainers = document.querySelectorAll('.scroll-container');
    
    scrollContainers.forEach(container => {
        const scrollWrapper = container.querySelector('.scroll-wrapper');
        const prevBtn = container.querySelector('.scroll-btn.prev');
        const nextBtn = container.querySelector('.scroll-btn.next');
        
        if (scrollWrapper && prevBtn && nextBtn) {
            // Scroll amount (width of one card + gap)
            const scrollAmount = 300;
            
            prevBtn.addEventListener('click', () => {
                scrollWrapper.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
            });
            
            nextBtn.addEventListener('click', () => {
                scrollWrapper.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            });
            
            // Hide/show buttons based on scroll position
            scrollWrapper.addEventListener('scroll', () => {
                const isAtStart = scrollWrapper.scrollLeft <= 10;
                const isAtEnd = scrollWrapper.scrollLeft >= scrollWrapper.scrollWidth - scrollWrapper.clientWidth - 10;
                
                prevBtn.style.opacity = isAtStart ? '0.5' : '0.8';
                nextBtn.style.opacity = isAtEnd ? '0.5' : '0.8';
            });
            
            // Initial check
            prevBtn.style.opacity = '0.5';
        }
    });
    
    // Search Functionality
    const searchBox = document.querySelector('.search-box input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchBtn && searchBox) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = searchBox.value.trim();
            if (searchTerm) {
                console.log('Searching for:', searchTerm);
                // In a real implementation, you would redirect to search results page
                // window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
                alert('بحث عن: ' + searchTerm);
            }
        });
        
        // Also trigger search on Enter key
        searchBox.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }
    
    // Responsive Navigation for Mobile
    function setupResponsiveNav() {
        if (window.innerWidth <= 768) {
            // Add mobile-specific classes and behavior
            document.body.classList.add('mobile-view');
            
            // Setup mobile menu
            if (mainNav && userActions) {
                mainNav.style.display = 'none';
                userActions.style.display = 'none';
                
                if (menuToggle) {
                    menuToggle.addEventListener('click', function() {
                        if (mainNav.style.display === 'none') {
                            mainNav.style.display = 'flex';
                            mainNav.style.flexDirection = 'column';
                            mainNav.style.position = 'absolute';
                            mainNav.style.top = '60px';
                            mainNav.style.right = '0';
                            mainNav.style.width = '100%';
                            mainNav.style.backgroundColor = 'var(--light-color)';
                            mainNav.style.padding = '20px';
                            mainNav.style.boxShadow = 'var(--shadow)';
                            
                            userActions.style.display = 'flex';
                            userActions.style.flexDirection = 'column';
                            userActions.style.position = 'absolute';
                            userActions.style.top = mainNav.offsetHeight + 60 + 'px';
                            userActions.style.right = '0';
                            userActions.style.width = '100%';
                            userActions.style.backgroundColor = 'var(--light-color)';
                            userActions.style.padding = '0 20px 20px';
                            userActions.style.boxShadow = 'var(--shadow)';
                        } else {
                            mainNav.style.display = 'none';
                            userActions.style.display = 'none';
                        }
                    });
                }
            }
        } else {
            // Reset for desktop view
            document.body.classList.remove('mobile-view');
            if (mainNav && userActions) {
                mainNav.style.display = 'flex';
                userActions.style.display = 'flex';
                
                // Reset any inline styles
                mainNav.style.flexDirection = '';
                mainNav.style.position = '';
                mainNav.style.top = '';
                mainNav.style.right = '';
                mainNav.style.width = '';
                mainNav.style.backgroundColor = '';
                mainNav.style.padding = '';
                mainNav.style.boxShadow = '';
                
                userActions.style.flexDirection = '';
                userActions.style.position = '';
                userActions.style.top = '';
                userActions.style.right = '';
                userActions.style.width = '';
                userActions.style.backgroundColor = '';
                userActions.style.padding = '';
                userActions.style.boxShadow = '';
            }
        }
    }
    
    // Initial setup
    setupResponsiveNav();
    
    // Update on window resize
    window.addEventListener('resize', setupResponsiveNav);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add animation to elements when they come into view
    function animateOnScroll() {
        const elements = document.querySelectorAll('.category-card, .listing-card, .tip-card, .stat-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    }
    
    // Add animation class to CSS
    const style = document.createElement('style');
    style.textContent = `
        .category-card, .listing-card, .tip-card, .stat-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .category-card.animate, .listing-card.animate, .tip-card.animate, .stat-item.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Initial check for elements in view
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
});