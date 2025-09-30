// Cars Page JavaScript Functionality
// SY4Sale - Filter and Navigation Features

document.addEventListener('DOMContentLoaded', function() {
    
    // Global state management for filters
    const filterState = {
        location: '',
        brands: [],
        models: [],
        yearMin: '',
        yearMax: '',
        priceMin: '',
        priceMax: '',
        transmission: [],
        fuel: [],
        condition: [],
        sortBy: 'newest'
    };

    let totalResults = 2641; // Initial count from the page
    
    // Initialize all functionality
    initializeFilters();
    initializeApplyButton();
    initializeResetButton();
    initializeSortingAndView();
    initializeFavoriteButtons();
    initializeCarCardClicks();
    parseUrlFilters(); // Parse filters from URL if coming from used-cars page

    // ===== PARSE URL FILTERS =====
    function parseUrlFilters() {
        const urlParams = new URLSearchParams(window.location.search);
        
        // Parse brands
        const brands = urlParams.get('brands');
        if (brands) {
            filterState.brands = brands.split(',');
            applyBrandFilters();
        }
        
        // Parse price range
        const priceMin = urlParams.get('price_min');
        const priceMax = urlParams.get('price_max');
        if (priceMin) {
            filterState.priceMin = priceMin;
            setPriceInput('min', priceMin);
        }
        if (priceMax) {
            filterState.priceMax = priceMax;
            setPriceInput('max', priceMax);
        }
        
        // Parse year range
        const yearMin = urlParams.get('year_min');
        const yearMax = urlParams.get('year_max');
        if (yearMin) {
            filterState.yearMin = yearMin;
            setYearSelect('min', yearMin);
        }
        if (yearMax) {
            filterState.yearMax = yearMax;
            setYearSelect('max', yearMax);
        }
        
        // Parse location
        const location = urlParams.get('location');
        if (location) {
            filterState.location = location;
            setLocationSelect(location);
        }
        
        // Parse sorting
        const sort = urlParams.get('sort');
        if (sort) {
            filterState.sortBy = sort;
            setSortSelect(sort);
        }
        
        // Show applied filters feedback if any filters were applied
        if (urlParams.toString()) {
            showFiltersAppliedFeedback();
        }
    }

    // ===== FILTER INITIALIZATION =====
    function initializeFilters() {
        // Location filter
        const locationSelect = document.querySelector('.filter-group select');
        if (locationSelect) {
            locationSelect.addEventListener('change', function() {
                filterState.location = this.value;
                console.log('Location filter:', filterState.location);
            });
        }

        // Brand checkboxes
        const brandCheckboxes = document.querySelectorAll('input[id^="brand-"]');
        brandCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const brandValue = this.id.replace('brand-', '');
                
                if (this.checked) {
                    if (!filterState.brands.includes(brandValue)) {
                        filterState.brands.push(brandValue);
                    }
                } else {
                    filterState.brands = filterState.brands.filter(brand => brand !== brandValue);
                }
                
                console.log('Selected brands:', filterState.brands);
            });
        });

        // Model checkboxes
        const modelCheckboxes = document.querySelectorAll('input[id^="model-"]');
        modelCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const modelValue = this.id.replace('model-', '');
                
                if (this.checked) {
                    if (!filterState.models.includes(modelValue)) {
                        filterState.models.push(modelValue);
                    }
                } else {
                    filterState.models = filterState.models.filter(model => model !== modelValue);
                }
                
                console.log('Selected models:', filterState.models);
            });
        });

        // Year selects
        const yearSelects = document.querySelectorAll('.filter-group select');
        yearSelects.forEach((select, index) => {
            if (select.querySelector('option[value="2023"]')) { // Year select identification
                select.addEventListener('change', function() {
                    if (index % 2 === 0) { // First select is "from"
                        filterState.yearMin = this.value;
                    } else { // Second select is "to"
                        filterState.yearMax = this.value;
                    }
                    console.log('Year range:', filterState.yearMin, '-', filterState.yearMax);
                });
            }
        });

        // Price inputs
        const priceInputs = document.querySelectorAll('.price-input');
        priceInputs.forEach((input, index) => {
            input.addEventListener('input', function() {
                if (index === 0) { // First input is min price
                    filterState.priceMin = this.value;
                } else { // Second input is max price
                    filterState.priceMax = this.value;
                }
                console.log('Price range:', filterState.priceMin, '-', filterState.priceMax);
                updateSliderFromInputs();
            });
        });

        // Price range sliders
        const priceSliderMin = document.getElementById('price-range-min');
        const priceSliderMax = document.getElementById('price-range-max');
        const sliderRange = document.querySelector('.slider-range');

        function updateSliderFromInputs() {
            const minVal = parseInt(filterState.priceMin) || 0;
            const maxVal = parseInt(filterState.priceMax) || 100000000;
            
            if (priceSliderMin) priceSliderMin.value = minVal;
            if (priceSliderMax) priceSliderMax.value = maxVal;
            updateSliderRange();
        }

        function updateInputsFromSlider() {
            if (priceSliderMin && priceSliderMax) {
                const minVal = parseInt(priceSliderMin.value);
                const maxVal = parseInt(priceSliderMax.value);
                
                filterState.priceMin = minVal.toString();
                filterState.priceMax = maxVal.toString();
                
                const minInput = document.getElementById('price-min');
                const maxInput = document.getElementById('price-max');
                
                if (minInput) minInput.value = minVal > 0 ? minVal.toLocaleString() : '';
                if (maxInput) maxInput.value = maxVal < 100000000 ? maxVal.toLocaleString() : '';
            }
        }

        function updateSliderRange() {
            if (priceSliderMin && priceSliderMax && sliderRange) {
                const minVal = parseInt(priceSliderMin.value);
                const maxVal = parseInt(priceSliderMax.value);
                const minPercent = (minVal / 100000000) * 100;
                const maxPercent = (maxVal / 100000000) * 100;
                
                sliderRange.style.left = minPercent + '%';
                sliderRange.style.width = (maxPercent - minPercent) + '%';
            }
        }

        if (priceSliderMin) {
            priceSliderMin.addEventListener('input', function() {
                const minVal = parseInt(this.value);
                const maxVal = parseInt(priceSliderMax.value);
                
                if (minVal >= maxVal) {
                    this.value = maxVal - 1000000;
                }
                
                updateInputsFromSlider();
                updateSliderRange();
            });
        }

        if (priceSliderMax) {
            priceSliderMax.addEventListener('input', function() {
                const minVal = parseInt(priceSliderMin.value);
                const maxVal = parseInt(this.value);
                
                if (maxVal <= minVal) {
                    this.value = minVal + 1000000;
                }
                
                updateInputsFromSlider();
                updateSliderRange();
            });
        }

        // Initialize slider range
        updateSliderRange();

        // Transmission checkboxes
        const transmissionCheckboxes = document.querySelectorAll('input[id^="transmission-"]');
        transmissionCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const transmissionValue = this.id.replace('transmission-', '');
                
                if (this.checked) {
                    if (!filterState.transmission.includes(transmissionValue)) {
                        filterState.transmission.push(transmissionValue);
                    }
                } else {
                    filterState.transmission = filterState.transmission.filter(t => t !== transmissionValue);
                }
                
                console.log('Selected transmission:', filterState.transmission);
            });
        });

        // Fuel checkboxes
        const fuelCheckboxes = document.querySelectorAll('input[id^="fuel-"]');
        fuelCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const fuelValue = this.id.replace('fuel-', '');
                
                if (this.checked) {
                    if (!filterState.fuel.includes(fuelValue)) {
                        filterState.fuel.push(fuelValue);
                    }
                } else {
                    filterState.fuel = filterState.fuel.filter(f => f !== fuelValue);
                }
                
                console.log('Selected fuel:', filterState.fuel);
            });
        });

        // Condition checkboxes
        const conditionCheckboxes = document.querySelectorAll('input[id^="condition-"]');
        conditionCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const conditionValue = this.id.replace('condition-', '');
                
                if (this.checked) {
                    if (!filterState.condition.includes(conditionValue)) {
                        filterState.condition.push(conditionValue);
                    }
                } else {
                    filterState.condition = filterState.condition.filter(c => c !== conditionValue);
                }
                
                console.log('Selected condition:', filterState.condition);
            });
        });
    }

    // ===== APPLY BUTTON FUNCTIONALITY =====
    function initializeApplyButton() {
        const applyBtn = document.querySelector('.btn.btn-primary.btn-block');
        
        if (applyBtn) {
            applyBtn.addEventListener('click', function() {
                // Add loading state
                this.classList.add('loading');
                this.disabled = true;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التطبيق...';
                
                // Apply filters and refresh results
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.disabled = false;
                    this.innerHTML = 'تطبيق الفلاتر';
                    
                    // Apply all filters
                    applyAllFilters();
                    
                    // Show success feedback
                    showFilterAppliedFeedback();
                    
                    // Scroll to results
                    scrollToResults();
                }, 1000);
            });
        }
    }

    // ===== RESET BUTTON FUNCTIONALITY =====
    function initializeResetButton() {
        const resetBtn = document.querySelector('.reset-filters');
        
        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                // Reset all filter state
                filterState.location = '';
                filterState.brands = [];
                filterState.models = [];
                filterState.yearMin = '';
                filterState.yearMax = '';
                filterState.priceMin = '';
                filterState.priceMax = '';
                filterState.transmission = [];
                filterState.fuel = [];
                filterState.condition = [];
                
                // Reset all form elements
                resetAllFormElements();
                
                // Apply reset filters
                applyAllFilters();
                
                // Show reset feedback
                showResetFeedback();
                
                console.log('Filters reset');
            });
        }
    }

    // ===== SORTING AND VIEW FUNCTIONALITY =====
    function initializeSortingAndView() {
        // Sorting dropdown
        const sortSelect = document.querySelector('.listings-sorting select');
        if (sortSelect) {
            sortSelect.addEventListener('change', function() {
                filterState.sortBy = this.value;
                applySorting();
                console.log('Sort by:', filterState.sortBy);
            });
        }

        // View options (grid/list)
        const viewOptions = document.querySelectorAll('.view-option');
        viewOptions.forEach(option => {
            option.addEventListener('click', function() {
                const viewType = this.dataset.view;
                
                // Update active state
                viewOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                
                // Apply view change
                applyViewChange(viewType);
                
                console.log('View changed to:', viewType);
            });
        });
    }

    // ===== FAVORITE BUTTONS =====
    function initializeFavoriteButtons() {
        const favoriteButtons = document.querySelectorAll('.favorite-btn');
        
        favoriteButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const icon = this.querySelector('i');
                const isCurrentlyFavorited = icon.classList.contains('fas');
                
                if (isCurrentlyFavorited) {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    this.classList.remove('favorited');
                    showFeedback('تم إزالة من المفضلة', 'info');
                } else {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    this.classList.add('favorited');
                    showFeedback('تم إضافة إلى المفضلة', 'success');
                }
                
                console.log('Favorite toggled');
            });
        });
    }

    // ===== CAR CARD CLICKS =====
    function initializeCarCardClicks() {
        const carCards = document.querySelectorAll('.car-card');
        
        carCards.forEach(card => {
            card.addEventListener('click', function(e) {
                // Don't trigger if clicking on favorite button
                if (e.target.closest('.favorite-btn')) {
                    return;
                }
                
                // Navigate to ad details page
                const carId = this.dataset.carId || Math.floor(Math.random() * 1000);
                const detailsUrl = `http://localhost:8000/ad-details.html?id=${carId}`;
                
                console.log('Navigating to car details:', detailsUrl);
                window.location.href = detailsUrl;
            });
        });
    }

    // ===== HELPER FUNCTIONS =====
    function applyBrandFilters() {
        filterState.brands.forEach(brand => {
            const checkbox = document.querySelector(`#brand-${brand}`);
            if (checkbox) {
                checkbox.checked = true;
            }
        });
    }

    function setPriceInput(type, value) {
        const priceInputs = document.querySelectorAll('.price-input');
        if (type === 'min' && priceInputs[0]) {
            priceInputs[0].value = value;
        } else if (type === 'max' && priceInputs[1]) {
            priceInputs[1].value = value;
        }
    }

    function setYearSelect(type, value) {
        const yearSelects = document.querySelectorAll('.filter-group select');
        yearSelects.forEach((select, index) => {
            if (select.querySelector('option[value="2023"]')) {
                if (type === 'min' && index % 2 === 0) {
                    select.value = value;
                } else if (type === 'max' && index % 2 === 1) {
                    select.value = value;
                }
            }
        });
    }

    function setLocationSelect(value) {
        const locationSelect = document.querySelector('.filter-group select');
        if (locationSelect) {
            locationSelect.value = value;
        }
    }

    function setSortSelect(value) {
        const sortSelect = document.querySelector('.listings-sorting select');
        if (sortSelect) {
            sortSelect.value = value;
        }
    }

    function resetAllFormElements() {
        // Reset all checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
        
        // Reset all selects
        document.querySelectorAll('select').forEach(select => select.selectedIndex = 0);
        
        // Reset all text inputs
        document.querySelectorAll('input[type="text"]').forEach(input => input.value = '');
    }

    function applyAllFilters() {
        console.log('Applying all filters:', filterState);
        
        // Simulate filtering results
        const listingsContent = document.querySelector('.listings-content');
        if (listingsContent) {
            listingsContent.style.opacity = '0.5';
            
            setTimeout(() => {
                listingsContent.style.opacity = '1';
                updateResultsCount();
            }, 500);
        }
    }

    function applySorting() {
        const listingsContent = document.querySelector('.listings-content');
        if (listingsContent) {
            listingsContent.style.opacity = '0.5';
            
            setTimeout(() => {
                listingsContent.style.opacity = '1';
                // In real implementation, re-sort the results
            }, 300);
        }
    }

    function applyViewChange(viewType) {
        const carCards = document.querySelectorAll('.car-card');
        
        if (viewType === 'list') {
            carCards.forEach(card => card.classList.add('list-view'));
        } else {
            carCards.forEach(card => card.classList.remove('list-view'));
        }
    }

    function updateResultsCount() {
        // Simulate result count based on filters
        const activeFilters = Object.values(filterState).filter(value => 
            Array.isArray(value) ? value.length > 0 : value !== ''
        ).length;
        
        const newCount = Math.max(50, totalResults - (activeFilters * 150));
        
        const resultsCountElement = document.querySelector('.results-count span');
        if (resultsCountElement) {
            resultsCountElement.textContent = `${newCount.toLocaleString()} إعلان`;
        }
    }

    function scrollToResults() {
        const listingsContent = document.querySelector('.listings-content');
        if (listingsContent) {
            listingsContent.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    function showFilterAppliedFeedback() {
        showFeedback('تم تطبيق الفلاتر بنجاح', 'success');
    }

    function showFiltersAppliedFeedback() {
        showFeedback('تم تطبيق الفلاتر من الصفحة السابقة', 'info');
    }

    function showResetFeedback() {
        showFeedback('تم إعادة تعيين جميع الفلاتر', 'info');
    }

    function showFeedback(message, type = 'success') {
        // Create feedback element
        const feedback = document.createElement('div');
        feedback.className = `filter-feedback ${type}`;
        feedback.innerHTML = `<i class="fas fa-${type === 'success' ? 'check' : 'info-circle'}"></i> ${message}`;
        
        // Style the feedback
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : type === 'info' ? '#17a2b8' : '#ffc107'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 1000;
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(feedback);
        
        // Animate in
        setTimeout(() => {
            feedback.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            feedback.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (feedback.parentNode) {
                    feedback.parentNode.removeChild(feedback);
                }
            }, 300);
        }, 3000);
    }

    console.log('Cars page JavaScript initialized');
});