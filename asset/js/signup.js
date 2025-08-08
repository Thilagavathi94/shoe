document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    
    // Add event listener to each tab for dynamic active state
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            // Remove 'active' class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add 'active' class to the clicked tab
            e.target.classList.add('active');
        });
    });

    // You can add form validation here if needed
    const signupForm = document.querySelector('.signup-form');
    signupForm.addEventListener('submit', (e) => {
        // Prevent default form submission
        // e.preventDefault();

        // Get input values
        const username = signupForm.querySelector('input[type="text"]').value;
        const phone = signupForm.querySelector('input[type="tel"]').value;
        const email = signupForm.querySelector('input[type="email"]').value;
        const password = signupForm.querySelector('input[type="password"]').value;

        // Simple validation example
        if (username.trim() === '' || phone.trim() === '' || email.trim() === '' || password.trim() === '') {
            alert('Please fill in all fields.');
        } else {
            // Here you would typically send data to a server
            console.log('Signup form submitted:', { username, phone, email, password });
            // Add your logic for successful signup, e.g., redirecting to another page
        }
    });
});