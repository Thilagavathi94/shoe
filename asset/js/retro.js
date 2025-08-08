document.addEventListener('DOMContentLoaded', () => {
    // Thumbnail image functionality
    const mainImage = document.querySelector('.main-image img');
    const thumbnails = document.querySelectorAll('.thumbnail-images img');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            mainImage.src = thumbnail.src;
            mainImage.alt = thumbnail.alt;
        });
    });

    // Size button functionality
    const sizeButtons = document.querySelectorAll('.size-options button');
    sizeButtons.forEach(button => {
        button.addEventListener('click', () => {
            sizeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Buy Now and Add to Bag buttons
    const buyNowBtn = document.querySelector('.buy-now-btn');
    const addToBagBtn = document.querySelector('.add-to-bag-btn');

    buyNowBtn.addEventListener('click', () => {
        console.log('Buy Now button clicked!');
        // Add logic for purchasing the product
    });

    addToBagBtn.addEventListener('click', () => {
        console.log('Add to Bag button clicked!');
        // Add logic for adding the product to the shopping bag
    });

});

document.addEventListener('DOMContentLoaded', () => {
    const addToBagBtn = document.querySelector('.add-to-bag-btn');
    const favoriteBtn = document.querySelector('.navbar-icons a[href="#"] .fa-heart'); // Assuming a favorite button on the page

    // Product details from the retro.html page
    const productDetails = {
        name: document.querySelector('.product-name').textContent.trim(),
        price: 1299,
        image: document.querySelector('.main-image img').src
    };

    addToBagBtn.addEventListener('click', () => {
        let cart = JSON.parse(localStorage.getItem('cart1')) || [];
        cart.push(productDetails);
        localStorage.setItem('cart1', JSON.stringify(cart));
        alert(`${productDetails.name} added to cart!`);
    });

    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            wishlist.push(productDetails);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            alert(`${productDetails.name} added to wishlist!`);
        });
    }
});