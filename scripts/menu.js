document.addEventListener('DOMContentLoaded', function() {
    const hamburgerIcon = document.getElementById('hamburgerIcon');
    const menuContent = document.getElementById('menuContent');
    const closeButton = document.getElementById('closeButton');
    const signoutButton = document.getElementById('signoutButton');

    hamburgerIcon.addEventListener('click', function() {
        menuContent.classList.toggle('show');
    });

    closeButton.addEventListener('click', function() {
        menuContent.classList.remove('show');
    });

    signoutButton.addEventListener('click', function() {
        const confirmSignOut = confirm("Are you sure you want to sign out?");
        if (confirmSignOut) {
            // Proceed with sign out
            // Add your sign-out logic here
        }
    });

    document.addEventListener('click', function(event) {
        if (!menuContent.contains(event.target) && !hamburgerIcon.contains(event.target)) {
            menuContent.classList.remove('show');
        }
    });
});
