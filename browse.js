let filteredComics = [...comicsData];

// Create comic card HTML (moved from script.js)
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

// Update cart count (moved from script.js)
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

// Initialize browse page
function initBrowsePage() {
    displayComics(filteredComics);
    updateResultsCount();
    updateCartCount();
    checkURLParams();
}

// Display comics
function displayComics(comics) {
    const browseGrid = document.getElementById('browse-grid');
    const noResults = document.getElementById('no-results');
    
    if (comics.length === 0) {
        browseGrid.innerHTML = '';
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
        browseGrid.innerHTML = comics.map(comic => createComicCard(comic)).join('');
    }
}

// Update results count
function updateResultsCount() {
    const resultsCount = document.getElementById('results-count');
    const count = filteredComics.length;
    resultsCount.textContent = `Showing ${count} comic${count !== 1 ? 's' : ''}`;
}

// Filter comics
function filterComics() {
    const publisherFilter = document.getElementById('publisher-filter').value;
    const characterFilter = document.getElementById('character-filter').value;
    const genreFilter = document.getElementById('genre-filter').value;

    filteredComics = comicsData.filter(comic => {
        const matchPublisher = publisherFilter === 'all' || comic.publisher === publisherFilter;
        const matchCharacter = characterFilter === 'all' || comic.character === characterFilter;
        const matchGenre = genreFilter === 'all' || comic.genre === genreFilter;
        
        return matchPublisher && matchCharacter && matchGenre;
    });

    sortComics();
}

// Sort comics
function sortComics() {
    const sortValue = document.getElementById('sort-select').value;

    switch(sortValue) {
        case 'title-asc':
            filteredComics.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'title-desc':
            filteredComics.sort((a, b) => b.title.localeCompare(a.title));
            break;
        case 'price-asc':
            filteredComics.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filteredComics.sort((a, b) => b.price - a.price);
            break;
        case 'date-desc':
            filteredComics.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
            break;
        case 'date-asc':
            filteredComics.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
            break;
    }

    displayComics(filteredComics);
    updateResultsCount();
}

// Check URL parameters
function checkURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const publisher = urlParams.get('publisher');
    
    if (publisher) {
        document.getElementById('publisher-filter').value = publisher;
        filterComics();
    }
}

// Reset filters
function resetFilters() {
    document.getElementById('publisher-filter').value = 'all';
    document.getElementById('character-filter').value = 'all';
    document.getElementById('genre-filter').value = 'all';
    document.getElementById('sort-select').value = 'title-asc';
    filteredComics = [...comicsData];
    sortComics();
}

// Mobile menu toggle (moved from script.js)
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Navbar scroll effect (moved from script.js)
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Event listeners
if (document.getElementById('browse-grid')) {
    document.getElementById('publisher-filter').addEventListener('change', filterComics);
    document.getElementById('character-filter').addEventListener('change', filterComics);
    document.getElementById('genre-filter').addEventListener('change', filterComics);
    document.getElementById('sort-select').addEventListener('change', sortComics);
    document.getElementById('reset-filters').addEventListener('click', resetFilters);
    
    initBrowsePage();
}
