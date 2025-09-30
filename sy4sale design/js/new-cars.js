// New Cars Page JavaScript

// Configuration - Set this to control brand visibility
let hasNewCars = true; // Change to false to hide all brand information

// Sample data - In a real application, this would come from an API
const carsData = [
    {
        id: 1,
        title: "تويوتا كامري 2024",
        brand: "Toyota",
        brandLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiMwMDQwMzAiLz4KPHRleHQgeD0iMjAiIHk9IjI2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iYm9sZCI+VDwvdGV4dD4KPC9zdmc+",
        type: "sedan",
        year: 2024,
        price: 85000,
        image: "https://via.placeholder.com/400x250/667eea/ffffff?text=Toyota+Camry",
        specs: {
            engine: "2.5L",
            fuel: "بنزين",
            transmission: "أوتوماتيك"
        },
        isNew: true,
        location: "دمشق",
        phone: "+963 11 123 4567"
    },
    {
        id: 2,
        title: "هيونداي إلنترا 2024",
        brand: "Hyundai",
        brandLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiMwMDQwMzAiLz4KPHRleHQgeD0iMjAiIHk9IjI2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iYm9sZCI+SDwvdGV4dD4KPC9zdmc+",
        type: "sedan",
        year: 2024,
        price: 75000,
        image: "https://via.placeholder.com/400x250/764ba2/ffffff?text=Hyundai+Elantra",
        specs: {
            engine: "2.0L",
            fuel: "بنزين",
            transmission: "أوتوماتيك"
        },
        isNew: true,
        location: "حلب",
        phone: "+963 21 123 4567"
    },
    {
        id: 3,
        title: "كيا سيراتو 2023",
        brand: "Kia",
        brandLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiMwMDQwMzAiLz4KPHRleHQgeD0iMjAiIHk9IjI2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iYm9sZCI+SzwvdGV4dD4KPC9zdmc+",
        type: "sedan",
        year: 2023,
        price: 65000,
        image: "https://via.placeholder.com/400x250/ff6b6b/ffffff?text=Kia+Cerato",
        specs: {
            engine: "1.6L",
            fuel: "بنزين",
            transmission: "أوتوماتيك"
        },
        isNew: true,
        location: "دمشق",
        phone: "+963 11 987 6543"
    },
    {
        id: 4,
        title: "نيسان التيما 2024",
        brand: "Nissan",
        brandLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiMwMDQwMzAiLz4KPHRleHQgeD0iMjAiIHk9IjI2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iYm9sZCI+TjwvdGV4dD4KPC9zdmc+",
        type: "sedan",
        year: 2024,
        price: 90000,
        image: "https://via.placeholder.com/400x250/28a745/ffffff?text=Nissan+Altima",
        specs: {
            engine: "2.5L",
            fuel: "بنزين",
            transmission: "CVT"
        },
        isNew: true,
        location: "حمص",
        phone: "+963 31 123 4567"
    },
    {
        id: 5,
        title: "هوندا أكورد 2024",
        brand: "Honda",
        brandLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiMwMDQwMzAiLz4KPHRleHQgeD0iMjAiIHk9IjI2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmb250LXdlaWdodD0iYm9sZCI+SG88L3RleHQ+Cjwvc3ZnPg==",
        type: "sedan",
        year: 2024,
        price: 95000,
        image: "https://via.placeholder.com/400x250/6f42c1/ffffff?text=Honda+Accord",
        specs: {
            engine: "1.5L Turbo",
            fuel: "بنزين",
            transmission: "أوتوماتيك"
        },
        isNew: true,
        location: "دمشق",
        phone: "+963 11 555 7777"
    },
    {
        id: 6,
        title: "تويوتا RAV4 2024",
        brand: "Toyota",
        brandLogo: "🚗",
        type: "suv",
        year: 2024,
        price: 120000,
        image: "https://via.placeholder.com/400x250/fd7e14/ffffff?text=Toyota+RAV4",
        specs: {
            engine: "2.5L",
            fuel: "هايبرد",
            transmission: "أوتوماتيك"
        },
        isNew: true,
        location: "حلب",
        phone: "+963 21 888 9999"
    }
];

// Brand data
const brandsData = [
    { name: "Toyota", logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiMwMDQwMzAiLz4KPHRleHQgeD0iMjAiIHk9IjI2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iYm9sZCI+VDwvdGV4dD4KPC9zdmc+", count: 2 },
    { name: "Hyundai", logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiMwMDQwMzAiLz4KPHRleHQgeD0iMjAiIHk9IjI2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iYm9sZCI+SDwvdGV4dD4KPC9zdmc+", count: 1 },
    { name: "Kia", logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiMwMDQwMzAiLz4KPHRleHQgeD0iMjAiIHk9IjI2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iYm9sZCI+SzwvdGV4dD4KPC9zdmc+", count: 1 },
    { name: "Nissan", logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiMwMDQwMzAiLz4KPHRleHQgeD0iMjAiIHk9IjI2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iYm9sZCI+TjwvdGV4dD4KPC9zdmc+", count: 1 },
    { name: "Honda", logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiMwMDQwMzAiLz4KPHRleHQgeD0iMjAiIHk9IjI2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmb250LXdlaWdodD0iYm9sZCI+SG88L3RleHQ+Cjwvc3ZnPg==", count: 1 }
];

// Global variables
let filteredCars = [...carsData];
let currentView = 'grid';
let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

// DOM Elements
const carsGrid = document.getElementById('carsGrid');
const brandsGrid = document.getElementById('brandsGrid');
const brandsSection = document.getElementById('brandsSection');
const searchInput = document.getElementById('searchInput');
const brandFilter = document.getElementById('brandFilter');
const typeFilter = document.getElementById('typeFilter');
const priceFilter = document.getElementById('priceFilter');
const yearFilter = document.getElementById('yearFilter');
const resetFiltersBtn = document.getElementById('resetFilters');
const noResults = document.getElementById('noResults');
const loading = document.getElementById('loading');

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
    applyBrandVisibility();
    renderCars();
    renderBrands();
    populateBrandFilter();
});

// Initialize page settings
function initializePage() {
    // Set view buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentView = this.dataset.view;
            carsGrid.className = `cars-grid ${currentView === 'list' ? 'list-view' : ''}`;
        });
    });
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality (only if search input exists)
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
    
    // Filter functionality
    if (brandFilter) brandFilter.addEventListener('change', applyFilters);
    if (typeFilter) typeFilter.addEventListener('change', applyFilters);
    if (priceFilter) priceFilter.addEventListener('change', applyFilters);
    if (yearFilter) yearFilter.addEventListener('change', applyFilters);
    
    // Reset filters
    if (resetFiltersBtn) resetFiltersBtn.addEventListener('click', resetAllFilters);
    
    // Search button (only if it exists)
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) searchBtn.addEventListener('click', handleSearch);
}

// Apply brand visibility based on hasNewCars setting
function applyBrandVisibility() {
    const body = document.body;
    
    if (!hasNewCars) {
        body.classList.add('hide-brands');
        brandsSection.style.display = 'none';
    } else {
        body.classList.remove('hide-brands');
        brandsSection.style.display = 'block';
    }
}

// Populate brand filter dropdown
function populateBrandFilter() {
    if (!hasNewCars) return;
    
    brandFilter.innerHTML = '<option value="">جميع الماركات</option>';
    
    const uniqueBrands = [...new Set(carsData.filter(car => car.isNew).map(car => car.brand))];
    uniqueBrands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand;
        brandFilter.appendChild(option);
    });
}

// Render brands section
function renderBrands() {
    if (!hasNewCars || !brandsGrid) return;
    
    brandsGrid.innerHTML = '';
    
    brandsData.forEach(brand => {
        const brandCard = document.createElement('div');
        brandCard.className = 'brand-card fade-in';
        brandCard.onclick = () => filterByBrand(brand.name);
        
        brandCard.innerHTML = `
            <div class="brand-logo"><img src="${brand.logo}" alt="${brand.name}" /></div>
            <h3>${brand.name}</h3>
            <div class="car-count">${brand.count} سيارة</div>
        `;
        
        brandsGrid.appendChild(brandCard);
    });
}

// Render cars
function renderCars() {
    if (filteredCars.length === 0) {
        showNoResults();
        return;
    }
    
    hideNoResults();
    hideLoading();
    carsGrid.innerHTML = '';
    
    filteredCars.forEach((car, index) => {
        const carCard = createCarCard(car);
        carCard.style.animationDelay = `${index * 0.1}s`;
        carsGrid.appendChild(carCard);
    });
}

// Create car card element
function createCarCard(car) {
    const carCard = document.createElement('div');
    carCard.className = 'car-card fade-in';
    
    const isFavorite = favorites.includes(car.id);
    const showBrandLogo = hasNewCars && car.isNew;
    
    carCard.innerHTML = `
        <div class="car-image">
            <img src="${car.image}" alt="${car.title}" loading="lazy">
            ${car.isNew ? '<div class="car-badge new">جديد</div>' : ''}
            ${showBrandLogo ? `<div class="car-brand-logo">${car.brandLogo}</div>` : ''}
        </div>
        <div class="car-content">
            <div class="car-info">
                <h3 class="car-title">${car.title}</h3>
                <div class="car-specs">
                    <div class="car-spec">
                        <i class="fas fa-cog"></i>
                        <span>${car.specs.engine}</span>
                    </div>
                    <div class="car-spec">
                        <i class="fas fa-gas-pump"></i>
                        <span>${car.specs.fuel}</span>
                    </div>
                    <div class="car-spec">
                        <i class="fas fa-road"></i>
                        <span>${car.specs.transmission}</span>
                    </div>
                </div>
                <div class="car-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${car.location}</span>
                </div>
                <div class="car-price">${formatPrice(car.price)} ل.س</div>
            </div>
            <div class="car-actions">
                <button class="btn-contact" onclick="contactSeller('${car.phone}')">
                    <i class="fas fa-phone"></i>
                    اتصل الآن
                </button>
                <button class="btn-favorite ${isFavorite ? 'active' : ''}" onclick="toggleFavorite(${car.id})">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
        </div>
    `;
    
    return carCard;
}

// Search functionality
function handleSearch() {
    if (!searchInput) {
        filteredCars = [...carsData];
        renderCars();
        return;
    }
    
    const query = searchInput.value.toLowerCase().trim();
    
    if (query === '') {
        filteredCars = [...carsData];
    } else {
        filteredCars = carsData.filter(car => 
            car.title.toLowerCase().includes(query) ||
            car.brand.toLowerCase().includes(query) ||
            car.type.toLowerCase().includes(query)
        );
    }
    
    renderCars();
}

// Apply filters
function applyFilters() {
    filteredCars = carsData.filter(car => {
        const brandMatch = !brandFilter.value || car.brand === brandFilter.value;
        const typeMatch = !typeFilter.value || car.type === typeFilter.value;
        const yearMatch = !yearFilter.value || car.year.toString() === yearFilter.value;
        
        let priceMatch = true;
        if (priceFilter.value) {
            const [min, max] = priceFilter.value.split('-').map(p => p.replace('+', ''));
            if (max) {
                priceMatch = car.price >= parseInt(min) && car.price <= parseInt(max);
            } else {
                priceMatch = car.price >= parseInt(min);
            }
        }
        
        return brandMatch && typeMatch && yearMatch && priceMatch;
    });
    
    // Apply search if there's a query and search input exists
    if (searchInput) {
        const query = searchInput.value.toLowerCase().trim();
        if (query) {
            filteredCars = filteredCars.filter(car => 
                car.title.toLowerCase().includes(query) ||
                car.brand.toLowerCase().includes(query) ||
                car.type.toLowerCase().includes(query)
            );
        }
    }
    
    renderCars();
}

// Filter by brand (from brand cards)
function filterByBrand(brand) {
    brandFilter.value = brand;
    applyFilters();
    
    // Scroll to cars section
    document.querySelector('.cars-section').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Reset all filters
function resetAllFilters() {
    if (searchInput) searchInput.value = '';
    if (brandFilter) brandFilter.value = '';
    if (typeFilter) typeFilter.value = '';
    if (priceFilter) priceFilter.value = '';
    if (yearFilter) yearFilter.value = '';
    
    filteredCars = [...carsData];
    renderCars();
}

// Toggle favorite
function toggleFavorite(carId) {
    const index = favorites.indexOf(carId);
    
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(carId);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    // Update button state
    const btn = event.target.closest('.btn-favorite');
    btn.classList.toggle('active');
    
    // Show feedback
    showToast(index > -1 ? 'تم إزالة السيارة من المفضلة' : 'تم إضافة السيارة للمفضلة');
}

// Contact seller
function contactSeller(phone) {
    if (confirm('هل تريد الاتصال بالبائع؟')) {
        window.open(`tel:${phone}`);
    }
}

// Utility functions
function formatPrice(price) {
    return price.toLocaleString('ar-SY');
}

function showLoading() {
    loading.style.display = 'block';
    carsGrid.style.display = 'none';
    noResults.style.display = 'none';
}

function hideLoading() {
    loading.style.display = 'none';
    carsGrid.style.display = 'grid';
}

function showNoResults() {
    noResults.style.display = 'block';
    carsGrid.style.display = 'none';
}

function hideNoResults() {
    noResults.style.display = 'none';
}

function showToast(message) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Global functions for window scope
window.resetAllFilters = resetAllFilters;
window.toggleFavorite = toggleFavorite;
window.contactSeller = contactSeller;

// Configuration function to change hasNewCars setting
window.setHasNewCars = function(value) {
    hasNewCars = value;
    applyBrandVisibility();
    populateBrandFilter();
    renderBrands();
    renderCars();
    
    console.log(`Brand visibility ${value ? 'enabled' : 'disabled'}`);
};

// Demo function to toggle between states
window.toggleBrandVisibility = function() {
    setHasNewCars(!hasNewCars);
};

// Initialize with demo message
console.log('New Cars Page Loaded');
console.log('Use setHasNewCars(false) to hide all brand information');
console.log('Use setHasNewCars(true) to show brand information for new cars');
console.log('Current setting: hasNewCars =', hasNewCars);