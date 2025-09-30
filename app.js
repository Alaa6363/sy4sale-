/**
 * Listings App - sy4sale.com
 * Handles data fetching, rendering, favorites, and interactions
 */

class ListingsApp {
  constructor() {
    this.data = null;
    this.favorites = this.loadFavorites();
    this.init();
  }

  async init() {
    try {
      await this.loadData();
      this.renderSections();
      this.setupEventListeners();
      this.hideSkeletons();
    } catch (error) {
      console.error('Failed to initialize app:', error);
      this.showError();
    }
  }

  async loadData() {
    try {
      const response = await fetch('./data/listings.json');
      if (!response.ok) throw new Error('Failed to fetch data');
      this.data = await response.json();
    } catch (error) {
      console.error('Error loading data:', error);
      throw error;
    }
  }

  renderSections() {
    this.renderSection('featured', this.data.featured);
    this.renderSection('latest', this.data.latest);
  }

  renderSection(sectionType, items) {
    const container = document.querySelector(`[data-section="${sectionType}"] .listings__grid`);
    if (!container) return;

    container.innerHTML = '';
    
    // Show only first 4 items for each section
    const displayItems = items.slice(0, 4);
    
    displayItems.forEach(item => {
      const cardElement = this.createCard(item);
      container.appendChild(cardElement);
    });
  }

  createCard(item) {
    const isFavorited = this.favorites.has(item.id);
    const badgeHtml = item.is_featured ? '<span class="listing-card__badge">🚀</span>' : '';
    
    const cardHtml = `
      <article class="listing-card" data-id="${item.id}">
        <div class="listing-card__media">
          <img 
            src="${item.image}" 
            alt="${item.title}"
            class="listing-card__image"
            loading="lazy"
            onerror="this.parentElement.classList.add('listing-card__media--error')"
          >
          ${badgeHtml}
          <button 
            class="listing-card__favorite ${isFavorited ? 'listing-card__favorite--active' : ''}"
            aria-pressed="${isFavorited}"
            aria-label="${isFavorited ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}"
            data-id="${item.id}"
          >
            <svg class="listing-card__heart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>
        <div class="listing-card__body">
          <div class="listing-card__location">${item.location}</div>
          <h3 class="listing-card__title">${item.title}</h3>
          <div class="listing-card__meta">
            ${item.year} · ${this.formatNumber(item.km)} كم · ${item.color}
          </div>
          <div class="listing-card__price-row">
            <a href="#" class="listing-card__price">${this.formatPrice(item.price_kwd)}</a>
            <span class="listing-card__time">${item.posted_ago}</span>
          </div>
        </div>
      </article>
    `;

    const cardElement = document.createElement('li');
    cardElement.innerHTML = cardHtml;
    return cardElement.firstElementChild;
  }

  formatPrice(price) {
    // Convert to Arabic numerals and add thousands separator
    const arabicPrice = this.toArabicNumerals(price.toLocaleString('en-US'));
    return `د.ك ${arabicPrice}`;
  }

  formatNumber(num) {
    // Convert numbers to Arabic numerals
    return this.toArabicNumerals(num.toLocaleString('en-US'));
  }

  toArabicNumerals(str) {
    const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return str.replace(/[0-9]/g, (digit) => arabicNumerals[parseInt(digit)]);
  }

  setupEventListeners() {
    // Favorite buttons
    document.addEventListener('click', (e) => {
      if (e.target.closest('.listing-card__favorite')) {
        e.preventDefault();
        const button = e.target.closest('.listing-card__favorite');
        const itemId = button.dataset.id;
        this.toggleFavorite(itemId, button);
      }
    });

    // View all links
    document.addEventListener('click', (e) => {
      if (e.target.closest('.listings__view-all')) {
        e.preventDefault();
        const section = e.target.closest('[data-section]').dataset.section;
        this.handleViewAll(section);
      }
    });

    // Price links
    document.addEventListener('click', (e) => {
      if (e.target.closest('.listing-card__price')) {
        e.preventDefault();
        const card = e.target.closest('.listing-card');
        const itemId = card.dataset.id;
        this.handlePriceClick(itemId);
      }
    });

    // Keyboard accessibility for favorites
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.closest('.listing-card__favorite')) {
          e.preventDefault();
          e.target.click();
        }
      }
    });
  }

  toggleFavorite(itemId, button) {
    const isCurrentlyFavorited = this.favorites.has(itemId);
    
    if (isCurrentlyFavorited) {
      this.favorites.delete(itemId);
      button.classList.remove('listing-card__favorite--active');
      button.setAttribute('aria-pressed', 'false');
      button.setAttribute('aria-label', 'إضافة للمفضلة');
    } else {
      this.favorites.add(itemId);
      button.classList.add('listing-card__favorite--active');
      button.setAttribute('aria-pressed', 'true');
      button.setAttribute('aria-label', 'إزالة من المفضلة');
    }
    
    this.saveFavorites();
    
    // Add visual feedback
    button.style.transform = 'scale(1.2)';
    setTimeout(() => {
      button.style.transform = '';
    }, 150);
  }

  handleViewAll(section) {
    // Placeholder for view all functionality
    console.log(`View all ${section} listings`);
    // In a real app, this would navigate to a full listings page
    alert(`عرض جميع إعلانات ${section === 'featured' ? 'المميزة' : 'الأحدث'}`);
  }

  handlePriceClick(itemId) {
    // Placeholder for price click functionality
    console.log(`Price clicked for item: ${itemId}`);
    // In a real app, this would navigate to the item detail page
    const item = this.findItemById(itemId);
    if (item) {
      alert(`عرض تفاصيل: ${item.title}`);
    }
  }

  findItemById(itemId) {
    const allItems = [...this.data.featured, ...this.data.latest];
    return allItems.find(item => item.id === itemId);
  }

  loadFavorites() {
    try {
      const saved = localStorage.getItem('sy4sale_favorites');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch (error) {
      console.error('Error loading favorites:', error);
      return new Set();
    }
  }

  saveFavorites() {
    try {
      localStorage.setItem('sy4sale_favorites', JSON.stringify([...this.favorites]));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }

  hideSkeletons() {
    const skeletons = document.querySelectorAll('.listing-card--skeleton');
    skeletons.forEach(skeleton => {
      skeleton.style.display = 'none';
    });
  }

  showError() {
    const containers = document.querySelectorAll('.listings__grid');
    containers.forEach(container => {
      container.innerHTML = `
        <div class="listings__error">
          <p>عذراً، حدث خطأ في تحميل البيانات</p>
          <button onclick="location.reload()" class="listings__retry">إعادة المحاولة</button>
        </div>
      `;
    });
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ListingsApp();
});

// Preload critical images for better LCP
document.addEventListener('DOMContentLoaded', () => {
  const preloadImages = [
    'https://via.placeholder.com/400x300/FF6B35/FFFFFF?text=KTM+500+EXC',
    'https://via.placeholder.com/400x300/FFFFFF/333333?text=Bus+Rider'
  ];
  
  preloadImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
});