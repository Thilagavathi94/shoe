document.addEventListener('DOMContentLoaded', () => {
    // Add functionality to the favorite buttons
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Toggle the 'favorited' class or change the icon
            const icon = button.querySelector('i');
            icon.classList.toggle('far'); // Outline heart
            icon.classList.toggle('fas'); // Solid heart
            icon.style.color = icon.classList.contains('fas') ? '#f7a956' : '#ccc';
            console.log('Favorite button clicked!');
        });
    });

    // Add functionality to the "Buy Now" buttons
    const buyNowButtons = document.querySelectorAll('.buy-now-btn');
    buyNowButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('Buy Now button clicked!');
            // Add your logic for adding an item to the cart or redirecting to a product page.
        });
    });

    // Add functionality to the search input
    const searchInput = document.querySelector('.search-box input');
    searchInput.addEventListener('input', (event) => {
        console.log(`Searching for: ${event.target.value}`);
        // Add your search and filtering logic here
    });

});
document.addEventListener('DOMContentLoaded', () => {
    const buyNowButtons = document.querySelectorAll('.product-card .buy-now-btn');
    const favoriteButtons = document.querySelectorAll('.product-card .favorite-btn');

    buyNowButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productCard = e.target.closest('.product-card');
            const productDetails = {
                name: productCard.querySelector('.product-name').textContent.trim(),
                price: parseFloat(productCard.querySelector('.price').textContent.replace('Rs. ', '').replace(',', '')),
                image: productCard.querySelector('img').src
            };

            let cart = JSON.parse(localStorage.getItem('cart1')) || [];
            cart.push(productDetails);
            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${productDetails.name} added to cart!`);
        });
    });

    favoriteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productCard = e.target.closest('.product-card');
            const productDetails = {
                name: productCard.querySelector('.product-name').textContent.trim(),
                price: parseFloat(productCard.querySelector('.price').textContent.replace('Rs. ', '').replace(',', '')),
                image: productCard.querySelector('img').src
            };

            let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            wishlist.push(productDetails);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            alert(`${productDetails.name} added to wishlist!`);
        });
    });
});