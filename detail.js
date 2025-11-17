// Update cart count (added from script.js)
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

// Mobile menu toggle (added)
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Navbar scroll effect (added)
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Get comic ID from URL
function getComicIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Display comic details
function displayComicDetails() {
    const comicId = getComicIdFromURL();
    const comic = comicsData.find(c => c.id === comicId);

    if (!comic) {
        window.location.href = 'browse.html';
        return;
    }

    // Update page elements
    document.getElementById('comic-image').src = comic.image;
    document.getElementById('comic-image').alt = comic.title;
    document.getElementById('comic-title').textContent = comic.title;
    document.getElementById('breadcrumb-title').textContent = comic.title;
    document.getElementById('comic-publisher').textContent = comic.publisher;
    document.getElementById('comic-character').textContent = comic.character;
    document.getElementById('comic-price').textContent = `$${comic.price.toFixed(2)}`;
    document.getElementById('comic-description').textContent = comic.description;
    document.getElementById('comic-writer').textContent = comic.writer;
    document.getElementById('comic-artist').textContent = comic.artist;
    document.getElementById('comic-release').textContent = new Date(comic.releaseDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('comic-genre').textContent = comic.genre;

    // Update page title
    document.title = `${comic.title} | ComicVerse Hub`;
}

// Add to cart functionality
function addToCart() {
    const comicId = getComicIdFromURL();
    const comic = comicsData.find(c => c.id === comicId);

    if (!comic) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === comic.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...comic,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showSuccessMessage();
}

// Show success message
function showSuccessMessage() {
    const successMessage = document.getElementById('success-message');
    successMessage.style.display = 'block';
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
}

// Image zoom effect
function initImageZoom() {
    const imageWrapper = document.querySelector('.image-zoom-wrapper');
    const image = document.querySelector('.detail-image');

    if (imageWrapper && image) {
        imageWrapper.addEventListener('mousemove', (e) => {
            const rect = imageWrapper.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            image.style.transformOrigin = `${x}% ${y}%`;
        });
    }
}

// Initialize detail page
if (window.location.pathname.includes('comic-detail.html')) {
    displayComicDetails();
    updateCartCount();
    initImageZoom();

    document.getElementById('add-to-cart-btn').addEventListener('click', addToCart);
}
