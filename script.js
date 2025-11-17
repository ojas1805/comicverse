// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

// Hero Carousel
class HeroCarousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.carousel-slide');
        this.prevBtn = document.getElementById('carousel-prev');
        this.nextBtn = document.getElementById('carousel-next');
        this.indicatorsContainer = document.getElementById('carousel-indicators');
        this.autoPlayInterval = null;
        
        this.init();
    }

    init() {
        this.createIndicators();
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        this.startAutoPlay();
    }

    createIndicators() {
        this.slides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => this.goToSlide(index));
            this.indicatorsContainer.appendChild(indicator);
        });
    }

    goToSlide(n) {
        this.slides[this.currentSlide].classList.remove('active');
        this.indicatorsContainer.children[this.currentSlide].classList.remove('active');
        
        this.currentSlide = (n + this.slides.length) % this.slides.length;
        
        this.slides[this.currentSlide].classList.add('active');
        this.indicatorsContainer.children[this.currentSlide].classList.add('active');
    }

    nextSlide() {
        this.goToSlide(this.currentSlide + 1);
        this.resetAutoPlay();
    }

    prevSlide() {
        this.goToSlide(this.currentSlide - 1);
        this.resetAutoPlay();
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
    }

    resetAutoPlay() {
        clearInterval(this.autoPlayInterval);
        this.startAutoPlay();
    }
}

// Create comic card HTML
function createComicCard(comic) {
    return `
        <div class="comic-card" onclick="window.location.href='comic-detail.html?id=${comic.id}'">
            <div class="comic-image-container">
                <img src="${comic.image}" alt="${comic.title}" class="comic-image">
            </div>
            <div class="comic-info">
                <h3 class="comic-title">${comic.title}</h3>
                <p class="comic-character">${comic.character}</p>
                <p class="comic-publisher">${comic.publisher}</p>
                <p class="comic-price">$${comic.price.toFixed(2)}</p>
            </div>
        </div>
    `;
}

// Display comics on homepage
function displayHomeComics() {
    // New Releases (last 4 comics)
    const newReleases = comicsData
        .filter(comic => comic.featured)
        .slice(0, 4);
    
    const newReleasesGrid = document.getElementById('new-releases-grid');
    if (newReleasesGrid) {
        newReleasesGrid.innerHTML = newReleases.map(createComicCard).join('');
    }

    // Popular Series
    const popularSeries = comicsData
        .filter(comic => comic.popular)
        .slice(0, 4);
    
    const popularSeriesGrid = document.getElementById('popular-series-grid');
    if (popularSeriesGrid) {
        popularSeriesGrid.innerHTML = popularSeries.map(createComicCard).join('');
    }
}

// Initialize homepage
if (document.getElementById('hero-carousel')) {
    new HeroCarousel();
    displayHomeComics();
    updateCartCount();
}
