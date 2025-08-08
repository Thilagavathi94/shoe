// This script is specifically for the cart.html page
document.addEventListener('DOMContentLoaded', () => {

    const cartItemsList = document.getElementById('cart-items-list');
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    const subtotalPrice = document.getElementById('subtotal-price');
    const shippingPrice = document.getElementById('shipping-price');
    const totalPrice = document.getElementById('total-price');
    const checkoutButton = document.getElementById('checkout-button');
    
    // Function to update the cart count in the navbar
    const updateCartCount = () => {
        const cart = JSON.parse(localStorage.getItem('shopMartCart')) || [];
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = totalItems;
            cartCountElement.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    };
    
    // Render all cart items and update totals
    const renderCart = () => {
        let cart = JSON.parse(localStorage.getItem('shopMartCart')) || [];
        cartItemsList.innerHTML = ''; // Clear existing items

        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
            checkoutButton.disabled = true;
        } else {
            emptyCartMessage.style.display = 'none';
            checkoutButton.disabled = false;
            
            cart.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'cart-item';
                itemElement.innerHTML = `
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p class="price">${item.price}</p>
                    </div>
                    <div class="cart-item-quantity">
                        <input type="number" min="1" value="${item.quantity}" data-product-id="${item.id}">
                    </div>
                    <button class="remove-item-btn" data-product-id="${item.id}">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                `;
                cartItemsList.appendChild(itemElement);
            });
        }
        
        updateTotals(cart);
        updateCartCount();
    };

    // Calculate and update the subtotal, shipping, and total prices
    const updateTotals = (cart) => {
        const subtotal = cart.reduce((total, item) => {
            // Remove 'Rs.' and commas before parsing
            const price = parseFloat(item.price.replace('Rs.', '').replace(/,/g, ''));
            return total + (price * item.quantity);
        }, 0);
        
        const shipping = subtotal > 0 ? 150.00 : 0.00; // Example flat shipping rate
        const total = subtotal + shipping;
        
        subtotalPrice.textContent = `Rs. ${subtotal.toFixed(2)}`;
        shippingPrice.textContent = `Rs. ${shipping.toFixed(2)}`;
        totalPrice.textContent = `Rs. ${total.toFixed(2)}`;
    };

    // Handle removing a product from the cart
    const handleRemoveProduct = (productId) => {
        let cart = JSON.parse(localStorage.getItem('shopMartCart')) || [];
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('shopMartCart', JSON.stringify(cart));
        renderCart();
    };

    // Handle updating product quantity
    const handleUpdateQuantity = (productId, newQuantity) => {
        let cart = JSON.parse(localStorage.getItem('shopMartCart')) || [];
        const item = cart.find(i => i.id === productId);
        if (item) {
            item.quantity = parseInt(newQuantity, 10);
            localStorage.setItem('shopMartCart', JSON.stringify(cart));
            updateTotals(cart);
        }
    };

    // Add event listeners for dynamic elements
    cartItemsList.addEventListener('click', (event) => {
        const removeButton = event.target.closest('.remove-item-btn');
        if (removeButton) {
            const productId = removeButton.dataset.productId;
            handleRemoveProduct(productId);
        }
    });

    cartItemsList.addEventListener('change', (event) => {
        if (event.target.tagName === 'INPUT' && event.target.type === 'number') {
            const productId = event.target.dataset.productId;
            const newQuantity = event.target.value;
            handleUpdateQuantity(productId, newQuantity);
        }
    });

    // Initial render of the cart when the page loads
    renderCart();

});
