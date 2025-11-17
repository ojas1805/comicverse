// Update cart count (added)
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

// Display cart items
function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCart = document.getElementById('empty-cart');
    const cartSummary = document.getElementById('cart-summary');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '';
        emptyCart.style.display = 'block';
        cartSummary.style.display = 'none';
    } else {
        emptyCart.style.display = 'none';
        cartSummary.style.display = 'block';
        
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3 class="cart-item-title">${item.title}</h3>
                    <p class="cart-item-character">${item.character}</p>
                    <p class="cart-item-publisher">${item.publisher}</p>
                    <p class="cart-item-price">$${item.price.toFixed(2)} each</p>
                </div>
                <div class="cart-item-actions">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="decreaseQuantity('${item.id}')">−</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="increaseQuantity('${item.id}')">+</button>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart('${item.id}')">Remove</button>
                </div>
            </div>
        `).join('');

        updateCartSummary(cart);
    }
}

// Update cart summary
function updateCartSummary(cart) {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    document.getElementById('cart-item-count').textContent = totalItems;
    document.getElementById('cart-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('cart-total').textContent = `$${subtotal.toFixed(2)}`;
}

// Increase quantity
function increaseQuantity(comicId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(c => c.id === comicId);
    
    if (item) {
        item.quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
        updateCartCount();
    }
}

// Decrease quantity
function decreaseQuantity(comicId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(c => c.id === comicId);
    
    if (item && item.quantity > 1) {
        item.quantity -= 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
        updateCartCount();
    }
}

// Remove from cart
function removeFromCart(comicId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== comicId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}

// Checkout
function checkout() {
    const modal = document.getElementById('checkout-modal');
    modal.classList.add('active');
}

// Close modal and clear cart
function closeModal() {
    const modal = document.getElementById('checkout-modal');
    modal.classList.remove('active');
    localStorage.removeItem('cart');
    displayCartItems();
    updateCartCount();
    window.location.href = 'browse.html';
}

// Initialize cart page
if (document.getElementById('cart-items')) {
    displayCartItems();
    updateCartCount();

    document.getElementById('checkout-btn').addEventListener('click', checkout);
    document.getElementById('close-modal-btn').addEventListener('click', closeModal);

    // Close modal on background click
    document.getElementById('checkout-modal').addEventListener('click', (e) => {
        if (e.target.id === 'checkout-modal') {
            closeModal();
        }
    });
}
