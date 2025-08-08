document.addEventListener('DOMContentLoaded', () => {

    const checkoutItemsList = document.getElementById('checkout-items-list');
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    const subtotalPrice = document.getElementById('checkout-subtotal-price');
    const shippingPrice = document.getElementById('checkout-shipping-price');
    const totalPrice = document.getElementById('checkout-total-price');
    const placeOrderButton = document.getElementById('place-order-button');
    const shippingForm = document.getElementById('shipping-form');
    const paymentForm = document.getElementById('payment-form');
    const messageModal = document.getElementById('message-modal');
    const modalMessage = document.getElementById('modal-message');
    const modalOkBtn = document.getElementById('modal-ok-btn');

    // Function to show a custom modal message instead of alert()
    const showMessageModal = (message) => {
        modalMessage.textContent = message;
        messageModal.style.display = 'flex';
    };

    // Close the modal when the OK button is clicked
    modalOkBtn.addEventListener('click', () => {
        messageModal.style.display = 'none';
        // Redirect to homepage after a successful order
        if (modalMessage.textContent.includes('Your order has been placed successfully!')) {
            window.location.href = 'index.html';
        }
    });

    // Render all cart items and update totals for checkout
    const renderCheckoutSummary = () => {
        const cart = JSON.parse(localStorage.getItem('shopMartCart')) || [];
        // Log the cart data to the console for debugging purposes
        console.log('Cart data loaded on checkout page:', cart);

        checkoutItemsList.innerHTML = ''; // Clear existing items

        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
            placeOrderButton.disabled = true;
        } else {
            emptyCartMessage.style.display = 'none';
            placeOrderButton.disabled = false;
            cart.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('flex', 'justify-between', 'items-center');
                itemDiv.innerHTML = `
                    <div class="flex items-center">
                        <img src="${item.image}" alt="${item.name}" class="h-16 w-16 object-cover rounded-md mr-4">
                        <div>
                            <p class="font-medium text-gray-900">${item.name}</p>
                            <p class="text-sm text-gray-500">Qty: ${item.quantity}</p>
                        </div>
                    </div>
                    <span class="font-medium text-gray-900">${item.price}</span>
                `;
                checkoutItemsList.appendChild(itemDiv);
            });
        }
        updateTotals(cart);
    };

    // Update the subtotal, shipping, and total prices
    const updateTotals = (cart) => {
        const subtotal = cart.reduce((sum, item) => {
            // Remove 'Rs. ' and convert to a number for calculation
            const price = parseFloat(item.price.replace('Rs. ', ''));
            // Ensure the quantity is treated as a number
            return sum + (price * item.quantity);
        }, 0);
        const shipping = subtotal > 0 ? 50.00 : 0.00; // Example: flat rate shipping
        const total = subtotal + shipping;

        subtotalPrice.textContent = `Rs. ${subtotal.toFixed(2)}`;
        shippingPrice.textContent = `Rs. ${shipping.toFixed(2)}`;
        totalPrice.textContent = `Rs. ${total.toFixed(2)}`;
    };

    // Handle the "Place Order" button click
    placeOrderButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default form submission

        // Form validation
        const shippingFormIsValid = shippingForm.checkValidity();
        const paymentFormIsValid = paymentForm.checkValidity();
        
        if (!shippingFormIsValid || !paymentFormIsValid) {
            showMessageModal('Please fill in all required fields.');
            return;
        }

        // Simulate a payment process
        setTimeout(() => {
            // Check if cart is not empty before proceeding
            const cart = JSON.parse(localStorage.getItem('shopMartCart')) || [];
            if (cart.length === 0) {
                 showMessageModal('Your cart is empty. Please add items before checking out.');
                 return;
            }

            // Clear the cart from local storage after a successful order
            localStorage.removeItem('shopMartCart');

            // Show a success message in the custom modal
            showMessageModal('Your order has been placed successfully! Thank you for shopping with us.');
        }, 1000); // Simulate a 1-second delay for processing
    });

    // Initial render of the checkout summary when the page loads
    renderCheckoutSummary();
});
