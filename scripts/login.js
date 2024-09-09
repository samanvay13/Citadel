document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.querySelector('form');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Basic validation
        if (username === '' || password === '') {
            alert('Please fill in all fields.');
            return;
        }

        // Simulate login
        if (username === 'admin' && password === 'password') {
            alert('Login successful!');
            // Redirect to another page or perform other actions
        } else {
            alert('Invalid username or password.');
        }
    });
});
