document.addEventListener('DOMContentLoaded', () => {
    const addIcon = document.getElementById('addIcon');
    const addPasswordForm = document.getElementById('addPasswordForm');
    const saveNewPassword = document.getElementById('saveNewPassword');

    addIcon.addEventListener('click', () => {
        addPasswordForm.style.display = addPasswordForm.style.display === 'block' ? 'none' : 'block';
    });

    saveNewPassword.addEventListener('click', (event) => {
        event.preventDefault();
        const category = document.getElementById('category').value;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const url = document.getElementById('url').value;
        const tags = document.getElementById('tags').value;

        // Perform validation and save the password data
        if (category && name && email && password) {
            console.log('Password Data:', {
                category,
                name,
                email,
                password,
                url,
                tags
            });
            // Reset the form
            document.querySelector('#addPasswordForm form').reset();
            addPasswordForm.style.display = 'none';
        } else {
            alert('Please fill in all required fields.');
        }
    });
});
