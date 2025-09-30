// Used Cars Page JavaScript Functionality
// SY4Sale - Complete Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    
    // Global state management
    const filterState = {
        brands: [],
        priceMin: '',
        priceMax: '',
        yearMin: '',
        yearMax: '',
        mileage: '',
        location: '',
        quickFilters: [],
        featuredFilters: [],
        sortBy: 'newest'
    };

    let totalResults = 247; // Initial count
    
    // Initialize all functionality
    initializeFilters();
    initializeBrandSelection();
    initializePriceFilters();
    initializeYearMileageFilters();
    initializeQuickFilters();
    initializeFeaturedFilters();
    initializeSortingAndView();
    initializeApplyButton();
    initializeClearFilters();
    initializeFavoriteButtons();
    initializeCarCardClicks();

    // ===== BRAND SELECTION FUNCTIONALITY =====
    function initializeBrandSelection() {
        const brandChips = document.querySelectorAll('.brand-chip');
        const expandBrandsBtn = document.querySelector('.expand-brands');
        
        // Brand chip selection
        brandChips.forEach(chip => {
            const checkbox = chip.querySelector('input[type="checkbox"]');
            const brandValue = checkbox.value;
            
            chip.addEventListener('click', function(e) {
                if (e.target !== checkbox) {
                    checkbox.checked = !checkbox.checked;
                }
                
                if (checkbox.checked) {
                    chip.classList.add('selected');
                    if (!filterState.brands.includes(brandValue)) {
                        filterState.brands.push(brandValue);
                    }
                } else {
                    chip.classList.remove('selected');
                    filterState.brands = filterState.brands.filter(brand => brand !== brandValue);
                }
                
                updateActiveFiltersCount();
                updateResultsCount();
                console.log('Selected brands:', filterState.brands);
            });
        });

        // Expand brands functionality
        if (expandBrandsBtn) {
            expandBrandsBtn.addEventListener('click', function() {
                const isExpanded = this.classList.contains('expanded');
                
                if (!isExpanded) {
                    // Show more brands (simulate)
                    this.innerHTML = 'عرض أقل <i class="fas fa-chevron-up"></i>';
                    this.classList.add('expanded');
                    
                    // Add more brand options dynamically
                    addMoreBrands();
                } else {
                    this.innerHTML = 'عرض جميع الماركات <i class="fas fa-chevron-down"></i>';
                    this.classList.remove('expanded');
                    
                    // Hide additional brands
                    hideAdditionalBrands();
                }
            });
        }
    }

    function addMoreBrands() {
        const popularBrands = document.querySelector('.popular-brands');
        const additionalBrands = [
            { name: 'كيا', value: 'kia', count: 18 },
            { name: 'مازدا', value: 'mazda', count: 15 },
            { name: 'شيفروليه', value: 'chevrolet', count: 12 },
            { name: 'فورد', value: 'ford', count: 10 }
        ];

        additionalBrands.forEach(brand => {
            const brandChip = document.createElement('label');
            brandChip.className = 'brand-chip additional-brand';
            brandChip.innerHTML = `
                <input type="checkbox" value="${brand.value}">
                <span class="chip-content">
                    <span class="brand-name">${brand.name}</span>
                    <span class="brand-count">${brand.count}</span>
                </span>
            `;
            
            // Add event listener for new brand
            const checkbox = brandChip.querySelector('input[type="checkbox"]');
            brandChip.addEventListener('click', function(e) {
                if (e.target !== checkbox) {
                    checkbox.checked = !checkbox.checked;
                }
                
                if (checkbox.checked) {
                    brandChip.classList.add('selected');
                    if (!filterState.brands.includes(brand.value)) {
                        filterState.brands.push(brand.value);
                    }
                } else {
                    brandChip.classList.remove('selected');
                    filterState.brands = filterState.brands.filter(b => b !== brand.value);
                }
                
                updateActiveFiltersCount();
                updateResultsCount();
            });
            
            popularBrands.appendChild(brandChip);
        });
    }

    function hideAdditionalBrands() {
        const additionalBrands = document.querySelectorAll('.additional-brand');
        additionalBrands.forEach(brand => {
            const checkbox = brand.querySelector('input[type="checkbox"]');
            if (checkbox.checked) {
                // Remove from filter state
                filterState.brands = filterState.brands.filter(b => b !== checkbox.value);
            }
            brand.remove();
        });
        updateActiveFiltersCount();
        updateResultsCount();
    }

    // ===== PRICE FILTERS FUNCTIONALITY =====
    function initializePriceFilters() {
        const priceInputs = document.querySelectorAll('.price-input');
        
        priceInputs.forEach((input, index) => {
            input.addEventListener('input', function() {
                // Format number with commas
                let value = this.value.replace(/,/g, '');
                if (value && !isNaN(value)) {
                    this.value = parseInt(value).toLocaleString();
                    
                    if (index === 0) {
                        filterState.priceMin = value;
                    } else {
                        filterState.priceMax = value;
                    }
                    
                    updateActiveFiltersCount();
                    updateResultsCount();
                }
            });

            input.addEventListener('blur', function() {
                if (this.value === '0') {
                    this.value = '';
                }
            });
        });
    }

    // ===== YEAR & MILEAGE FILTERS =====
    function initializeYearMileageFilters() {
        const yearSelects = document.querySelectorAll('.year-mileage select');
        const mileageChips = document.querySelectorAll('.mileage-chip');
        
        // Year selection
        yearSelects.forEach((select, index) => {
            select.addEventListener('change', function() {
                if (index === 0) {
                    filterState.yearMin = this.value;
                } else {
                    filterState.yearMax = this.value;
                }
                updateActiveFiltersCount();
                updateResultsCount();
            });
        });

        // Mileage chips
        mileageChips.forEach(chip => {
            const radio = chip.querySelector('input[type="radio"]');
            
            chip.addEventListener('click', function() {
                // Remove selected class from all chips
                mileageChips.forEach(c => c.classList.remove('selected'));
                
                if (radio.checked) {
                    // If already selected, unselect
                    radio.checked = false;
                    filterState.mileage = '';
                } else {
                    // Select this chip
                    radio.checked = true;
                    chip.classList.add('selected');
                    filterState.mileage = radio.value;
                }
                
                updateActiveFiltersCount();
                updateResultsCount();
            });
        });
    }

    // ===== QUICK FILTERS =====
    function initializeQuickFilters() {
        const quickPills = document.querySelectorAll('.pill-btn');
        
        quickPills.forEach(pill => {
            pill.addEventListener('click', function() {
                const filterValue = this.getAttribute('data-filter');
                
                if (this.classList.contains('active')) {
                    // Remove filter
                    this.classList.remove('active');
                    filterState.quickFilters = filterState.quickFilters.filter(f => f !== filterValue);
                } else {
                    // Add filter
                    this.classList.add('active');
                    filterState.quickFilters.push(filterValue);
                }
                
                updateActiveFiltersCount();
                updateResultsCount();
                console.log('Quick filters:', filterState.quickFilters);
            });
        });
    }

    // ===== FEATURED FILTERS =====
    function initializeFeaturedFilters() {
        const featuredTags = document.querySelectorAll('.featured-tag');
        
        featuredTags.forEach(tag => {
            tag.addEventListener('click', function() {
                const filterValue = this.getAttribute('data-filter');
                
                if (this.classList.contains('active')) {
                    this.classList.remove('active');
                    filterState.featuredFilters = filterState.featuredFilters.filter(f => f !== filterValue);
                } else {
                    this.classList.add('active');
                    filterState.featuredFilters.push(filterValue);
                }
                
                updateActiveFiltersCount();
                updateResultsCount();
            });
        });
    }

    // ===== SORTING AND VIEW =====
    function initializeSortingAndView() {
        const sortSelect = document.querySelector('.sort-select');
        
        if (sortSelect) {
            sortSelect.addEventListener('change', function() {
                filterState.sortBy = this.value;
                applySorting(this.value);
                console.log('Sorting by:', this.value);
            });
        }
    }

    function applySorting(sortType) {
        const carCards = document.querySelectorAll('.car-card');
        const carsGrid = document.querySelector('.cars-grid');
        
        // Add loading animation
        carsGrid.style.opacity = '0.5';
        
        setTimeout(() => {
            // Simulate sorting animation
            carsGrid.style.opacity = '1';
            
            // In a real implementation, you would sort the actual data
            console.log(`Sorted by: ${sortType}`);
        }, 300);
    }

    // ===== APPLY BUTTON FUNCTIONALITY =====
    function initializeApplyButton() {
        const applyBtn = document.querySelector('.apply-btn');
        
        if (applyBtn) {
            applyBtn.addEventListener('click', function() {
                // Add loading state
                this.classList.add('loading');
                this.disabled = true;
                
                // Build filter parameters for URL
                const filterParams = buildFilterParams();
                
                // Navigate to cars.html with filters
                setTimeout(() => {
                    const baseUrl = 'http://localhost:8000/cars.html';
                    const fullUrl = filterParams ? `${baseUrl}?${filterParams}` : baseUrl;
                    
                    console.log('Navigating to:', fullUrl);
                    console.log('Applied filters:', filterState);
                    
                    // Navigate to cars page
                    window.location.href = fullUrl;
                }, 800);
            });
        }
    }

    // Build URL parameters from current filter state
    function buildFilterParams() {
        const params = new URLSearchParams();
        
        // Add brands
        if (filterState.brands.length > 0) {
            params.append('brands', filterState.brands.join(','));
        }
        
        // Add price range
        if (filterState.priceMin) {
            params.append('price_min', filterState.priceMin);
        }
        if (filterState.priceMax) {
            params.append('price_max', filterState.priceMax);
        }
        
        // Add year range
        if (filterState.yearMin) {
            params.append('year_min', filterState.yearMin);
        }
        if (filterState.yearMax) {
            params.append('year_max', filterState.yearMax);
        }
        
        // Add mileage
        if (filterState.mileage) {
            params.append('mileage', filterState.mileage);
        }
        
        // Add location
        if (filterState.location) {
            params.append('location', filterState.location);
        }
        
        // Add quick filters
        if (filterState.quickFilters.length > 0) {
            params.append('quick_filters', filterState.quickFilters.join(','));
        }
        
        // Add featured filters
        if (filterState.featuredFilters.length > 0) {
            params.append('featured_filters', filterState.featuredFilters.join(','));
        }
        
        // Add sorting
        if (filterState.sortBy && filterState.sortBy !== 'newest') {
            params.append('sort', filterState.sortBy);
        }
        
        return params.toString();
    }

    function applyAllFilters() {
        console.log('Applying filters:', filterState);
        
        // Simulate filtering results
        const carsGrid = document.querySelector('.cars-grid');
        if (carsGrid) {
            carsGrid.style.opacity = '0';
            
            setTimeout(() => {
                carsGrid.style.opacity = '1';
                // In real implementation, update the grid with filtered results
            }, 500);
        }
    }

    function showFilterAppliedFeedback() {
        // Create temporary success message
        const feedback = document.createElement('div');
        feedback.className = 'filter-feedback';
        feedback.innerHTML = '<i class="fas fa-check"></i> تم تطبيق الفلاتر بنجاح';
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--success-color, #28a745);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.remove();
        }, 3000);
    }

    // ===== CLEAR FILTERS =====
    function initializeClearFilters() {
        const clearBtn = document.querySelector('.clear-filters');
        
        if (clearBtn) {
            clearBtn.addEventListener('click', function() {
                // Reset all filter states
                filterState.brands = [];
                filterState.priceMin = '';
                filterState.priceMax = '';
                filterState.yearMin = '';
                filterState.yearMax = '';
                filterState.mileage = '';
                filterState.quickFilters = [];
                filterState.featuredFilters = [];
                
                // Reset UI elements
                resetAllFilterUI();
                
                // Update counts
                updateActiveFiltersCount();
                totalResults = 247;
                updateResultsCount();
                
                console.log('All filters cleared');
            });
        }
    }

    function resetAllFilterUI() {
        // Reset brand chips
        document.querySelectorAll('.brand-chip').forEach(chip => {
            chip.classList.remove('selected');
            chip.querySelector('input').checked = false;
        });
        
        // Reset price inputs
        document.querySelectorAll('.price-input').forEach(input => {
            input.value = '';
        });
        
        // Reset year selects
        document.querySelectorAll('.year-mileage select').forEach(select => {
            select.selectedIndex = 0;
        });
        
        // Reset mileage chips
        document.querySelectorAll('.mileage-chip').forEach(chip => {
            chip.classList.remove('selected');
            chip.querySelector('input').checked = false;
        });
        
        // Reset quick pills
        document.querySelectorAll('.pill-btn').forEach(pill => {
            pill.classList.remove('active');
        });
        
        // Reset featured tags
        document.querySelectorAll('.featured-tag').forEach(tag => {
            tag.classList.remove('active');
        });
        
        // Reset location
        const locationSelect = document.querySelector('.filter-section select');
        if (locationSelect) {
            locationSelect.selectedIndex = 0;
        }
    }

    // ===== FAVORITE BUTTONS =====
    function initializeFavoriteButtons() {
        const favoriteButtons = document.querySelectorAll('.favorite-btn');
        
        favoriteButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent card click
                
                const icon = this.querySelector('i');
                
                if (icon.classList.contains('far')) {
                    // Add to favorites
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    this.classList.add('favorited');
                    
                    // Show feedback
                    showFavoriteFeedback('تم إضافة السيارة للمفضلة');
                } else {
                    // Remove from favorites
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    this.classList.remove('favorited');
                    
                    showFavoriteFeedback('تم إزالة السيارة من المفضلة');
                }
            });
        });
    }

    function showFavoriteFeedback(message) {
        const feedback = document.createElement('div');
        feedback.className = 'favorite-feedback';
        feedback.textContent = message;
        feedback.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 10px 16px;
            border-radius: 6px;
            z-index: 1000;
            font-size: 0.9rem;
            animation: slideUp 0.3s ease;
        `;
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.remove();
        }, 2000);
    }

    // ===== CAR CARD CLICKS =====
    function initializeCarCardClicks() {
        const carCards = document.querySelectorAll('.car-card');
        
        carCards.forEach(card => {
            card.addEventListener('click', function(e) {
                // Don't trigger if clicking favorite button
                if (e.target.closest('.favorite-btn')) {
                    return;
                }
                
                // Simulate navigation to car details
                const carTitle = this.querySelector('.car-title').textContent;
                console.log('Navigating to car details:', carTitle);
                
                // Add click animation
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                    // In real implementation: window.location.href = 'ad-details.html?id=...';
                }, 150);
            });
        });
    }

    // ===== UTILITY FUNCTIONS =====
    function updateActiveFiltersCount() {
        const activeCount = getActiveFiltersCount();
        const activeCountElement = document.querySelector('.active-count');
        
        if (activeCountElement) {
            activeCountElement.textContent = activeCount;
        }
    }

    function getActiveFiltersCount() {
        let count = 0;
        
        count += filterState.brands.length;
        count += filterState.priceMin ? 1 : 0;
        count += filterState.priceMax ? 1 : 0;
        count += filterState.yearMin ? 1 : 0;
        count += filterState.yearMax ? 1 : 0;
        count += filterState.mileage ? 1 : 0;
        count += filterState.quickFilters.length;
        count += filterState.featuredFilters.length;
        
        return count;
    }

    function updateResultsCount() {
        // Simulate result count based on filters
        const baseCount = 247;
        const activeFilters = getActiveFiltersCount();
        
        // Simulate filtering effect on count
        let newCount = Math.max(5, baseCount - (activeFilters * 15) + Math.floor(Math.random() * 20));
        
        // Update results count in button
        const resultsCountElement = document.querySelector('.results-count');
        if (resultsCountElement) {
            resultsCountElement.textContent = `(${newCount})`;
        }
        
        // Update header count
        const headerCount = document.querySelector('.results-info h2');
        if (headerCount) {
            headerCount.textContent = `سيارات مستعملة (${newCount} إعلان)`;
        }
        
        totalResults = newCount;
    }

    function initializeFilters() {
        // Location filter
        const locationSelect = document.querySelector('.filter-section select');
        if (locationSelect) {
            locationSelect.addEventListener('change', function() {
                filterState.location = this.value;
                updateActiveFiltersCount();
                updateResultsCount();
            });
        }
    }

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideUp {
            from { transform: translateY(100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        .apply-btn.loading {
            opacity: 0.7;
            pointer-events: none;
        }
        
        .apply-btn.loading::after {
            content: '';
            width: 16px;
            height: 16px;
            border: 2px solid transparent;
            border-top: 2px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-right: 8px;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    console.log('Used Cars page functionality initialized successfully!');
});