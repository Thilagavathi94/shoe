// This script will be used on all your product display pages (shop.html, sneaker.html, etc.)
document.addEventListener('DOMContentLoaded', () => {

    // Helper function to get product details from a product card element
    const getProductData = (productElement) => {
        const productName = productElement.querySelector('.product-name, h3').innerText.trim();
        const productPriceElement = productElement.querySelector('.price');
        const productPrice = productPriceElement ? productPriceElement.innerText.trim() : 'Rs. 0.00';
        const productImage = productElement.querySelector('img').src;
        // Create a unique ID for each product
        const productId = productName.toLowerCase().replace(/[^a-z0-9]/g, '-'); 

        return {
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1 // Always add 1 to the cart initially
        };
    };

    // Update the cart count in the header across all pages
    const updateCartCount = () => {
        const cart = JSON.parse(localStorage.getItem('shopMartCart')) || [];
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = totalItems;
            cartCountElement.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    };

    // Add to Cart functionality
    const addToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem('shopMartCart')) || [];
        const existingProductIndex = cart.findIndex(item => item.id === product.id);

        if (existingProductIndex > -1) {
            // If the product already exists, increase its quantity
            cart[existingProductIndex].quantity++;
        } else {
            // If it's a new product, add it to the cart
            cart.push(product);
        }
        localStorage.setItem('shopMartCart', JSON.stringify(cart));
        updateCartCount();
        alert(`${product.name} has been added to your cart.`);
    };

    // Add to Wishlist functionality
    const addToWishlist = (product) => {
        let wishlist = JSON.parse(localStorage.getItem('shopMartWishlist')) || [];
        const existingProductIndex = wishlist.findIndex(item => item.id === product.id);

        if (existingProductIndex > -1) {
            // If the product exists, remove it from the wishlist
            wishlist.splice(existingProductIndex, 1);
            alert(`${product.name} removed from your wishlist.`);
        } else {
            // If it's a new product, add it to the wishlist
            wishlist.push(product);
            alert(`${product.name} added to your wishlist.`);
        }
        localStorage.setItem('shopMartWishlist', JSON.stringify(wishlist));
    };

    // Add event listeners to all "Add to Bag" and "Buy Now" buttons
    const cartButtons = document.querySelectorAll('.buy-now-btn, .add-to-bag-btn');
    cartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productCard = event.target.closest('.product-card, .product-info');
            if (productCard) {
                const productData = getProductData(productCard);
                addToCart(productData);
            }
        });
    });

    // Add event listeners to all wishlist/favorite icons
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productCard = event.target.closest('.product-card');
            const productData = getProductData(productCard);

            // Toggle the heart icon's style
            const icon = button.querySelector('i');
            icon.classList.toggle('far'); // Outline heart
            icon.classList.toggle('fas'); // Solid heart
            icon.style.color = icon.classList.contains('fas') ? '#f7a956' : '#ccc';

            addToWishlist(productData);
        });
    });

    // Initial call to set the cart count on page load
    updateCartCount();

});
// Functionality for the hero section image slider
const heroImages = [
    'Shoe Website Imges/Men_s Cedric Dress Lace-up Almond Toe Oxfords.jpeg',
    'Shoe Website Imges/Fashionable Running Sneakers Flexible Fly Knit Non-Slip Sports Shoes CLS24718 - China Shoes Manufacturer.jpeg',
    'Shoe Website Imges/The Cloudultra 2_ Cushioned, Ultrarunning Trail Shoe.jpeg'
];
let currentImageIndex = 0;
const heroShoeImage = document.getElementById('hero-shoe-image');

const changeHeroImage = () => {
    heroShoeImage.src = heroImages[currentImageIndex];
    currentImageIndex = (currentImageIndex + 1) % heroImages.length;
};

setInterval(changeHeroImage, 3000); // Change image every 3 seconds

// Functionality for the promo banner text
const promoHeadings = [
    'Lightweight & Unbeatable',
    'Performance & Style',
    'Built For The Streets'
];
const promoDescriptions = [
    'Experience the fusion of high-performance materials and fashion-forward design.',
    'Engineered for peak performance, crafted for style. Take your run to the next level.',
    'Make a statement with every step. Durable, bold, and unapologetically you.'
];
let currentPromoIndex = 0;
const promoHeadingElement = document.getElementById('promo-heading');
const promoDescriptionElement = document.getElementById('promo-description');

const changePromoText = () => {
    promoHeadingElement.textContent = promoHeadings[currentPromoIndex];
    promoDescriptionElement.textContent = promoDescriptions[currentPromoIndex];
    currentPromoIndex = (currentPromoIndex + 1) % promoHeadings.length;
};

setInterval(changePromoText, 2000); // Change text every 3 seconds


// Functionality for the promo banner image slider
document.addEventListener('DOMContentLoaded', () => {
    // Other existing code...

    const promoImageLeft = document.getElementById('promo-image-left');
    const promoImageRight = document.getElementById('promo-image-right');
    const promoHeading = document.getElementById('promo-heading');
    const promoDescription = document.getElementById('promo-description');
    const buyNowButton = document.getElementById('buy-now-button');

    // Array of objects, each representing a banner state
    const promoStates = [
        {
            heading: "Buy 2, Get 1 Free",
            description: "Mix & match across men's, women's, and kids' styles.\nAdd 3 to your cart — the lowest-priced pair is free.",
            imageLeft: "Shoe Website Imges/Fashionable Running Sneakers Flexible Fly Knit Non-Slip Sports Shoes CLS24718 - China Shoes Manufacturer.jpeg",
            imageRight: "Shoe Website Imges/Chunky Loafers Fall Outfit.jpeg"
        },
        {
            heading: "Made for Movement. Built to Last.",
            description: "We craft every pair with premium, eco-conscious materials to ensure comfort, durability, and sustainability.",
            imageLeft: "Shoe Website Imges/The Cloudultra 2_ Cushioned, Ultrarunning Trail Shoe.jpeg",
            imageRight: "Shoe Website Imges/3 Übungen für den perfekten Hintern.jpeg" // Using a placeholder as the original image only has one person
        },
        {
            heading: "Limited Time Offer",
            description: "Get 25% off all sneakers this weekend only!\nNo code needed - discount applied at checkout.",
            imageLeft: "Shoe Website Imges/download.jpeg",
            imageRight: "Shoe Website Imges/Lantern Sleeve Solid Shirt.jpeg"
        }
    ];

    let currentPromoIndex = 0;

    function updatePromoBanner() {
        const currentState = promoStates[currentPromoIndex];
        
        // Update images
        promoImageLeft.src = currentState.imageLeft;
        promoImageRight.src = currentState.imageRight;
        
        // Update text
        promoHeading.textContent = currentState.heading;
        promoDescription.textContent = currentState.description;
        
        // Update the index for the next cycle
        currentPromoIndex = (currentPromoIndex + 1) % promoStates.length;
    }

    // Set the initial state of the banner
    updatePromoBanner();

    // Change the banner every 5 seconds (5000 milliseconds)
    setInterval(updatePromoBanner, 3000);
});