// This script is specifically for the wishlist.html page
document.addEventListener('DOMContentLoaded', () => {

    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    const wishlistItemsList = document.getElementById('wishlist-items-list');
    const emptyWishlistMessage = document.querySelector('.empty-wishlist-message');
    
    // Render all wishlist items
    const renderWishlist = () => {
        wishlistItemsList.innerHTML = '';
        
        if (wishlist.length === 0) {
            emptyWishlistMessage.style.display = 'block';
        } else {
            emptyWishlistMessage.style.display = 'none';
            
            wishlist.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'wishlist-item';
                itemElement.innerHTML = `
                    <div class="wishlist-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="wishlist-item-details">
                        <h3>${item.name}</h3>
                        <p class="price">${item.price}</p>
                    </div>
                    <div class="wishlist-item-actions">
                        <button class="add-to-cart-btn" data-product-id="${item.id}">Add to Cart</button>
                        <button class="remove-item-btn" data-product-id="${item.id}">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                `;
                wishlistItemsList.appendChild(itemElement);
            });
        }
    };
    
    // Add to Cart functionality from wishlist
    const addToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProductIndex = cart.findIndex(item => item.id === product.id);

        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity++;
        } else {
            cart.push(product);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.name} has been moved to your cart.`);
    };

    // Handle removing a product from the wishlist
    const handleRemoveProduct = (productId) => {
        wishlist = wishlist.filter(item => item.id !== productId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        renderWishlist();
    };

    // Add event listeners for dynamic elements
    wishlistItemsList.addEventListener('click', (event) => {
        const productId = event.target.closest('button').dataset.productId;
        const product = wishlist.find(item => item.id === productId);

        if (event.target.closest('.add-to-cart-btn')) {
            if (product) {
                addToCart(product);
                // Also remove from wishlist after adding to cart
                handleRemoveProduct(productId);
            }
        } else if (event.target.closest('.remove-item-btn')) {
            handleRemoveProduct(productId);
        }
    });

    // Initial render of the wishlist when the page loads
    renderWishlist();

});
