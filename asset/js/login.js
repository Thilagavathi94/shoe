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

    
    const loginForm = document.querySelector('.login-form');
    loginForm.addEventListener('submit', (e) => {
      

       
        const username = loginForm.querySelector('input[type="text"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

       
        if (username.trim() === '' || password.trim() === '') {
            alert('Please fill in both fields.');
        } else {
            // Here you would typically send data to a server
            console.log('Form submitted:', { username, password });
            // Add your logic for successful login, e.g., redirecting to another page
        }
    });
});