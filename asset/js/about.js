document.addEventListener('DOMContentLoaded', () => {
    // Testimonial Carousel
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentCardIndex = 0;

    function showTestimonial(index) {
        testimonialCards.forEach(card => {
            card.classList.remove('active');
        });
        testimonialCards[index].classList.add('active');
    }

    function nextTestimonial() {
        currentCardIndex++;
        if (currentCardIndex >= testimonialCards.length) {
            currentCardIndex = 0;
        }
        showTestimonial(currentCardIndex);
    }

    // Change testimonial every 5 seconds (5000 milliseconds)
    setInterval(nextTestimonial, 5000);

    // Initial call to show the first testimonial
    showTestimonial(currentCardIndex);
});
document.addEventListener('DOMContentLoaded', () => {
    // Add event listener to the search input
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', (event) => {
            console.log(`User is searching for: ${event.target.value}`);
            // In a real-world scenario, you would filter products or perform an API call here.
        });
    }

    // Add event listeners to the navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // Prevent the default link behavior
            event.preventDefault(); 
            
            // Remove 'active' class from all links
            navLinks.forEach(item => item.classList.remove('active'));
            
            // Add 'active' class to the clicked link
            event.target.classList.add('active');
            
            console.log(`Clicked on link: ${event.target.textContent}`);
            // You can add logic here to load content dynamically based on the link clicked.
        });
    });
});