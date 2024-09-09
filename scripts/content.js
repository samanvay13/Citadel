document.addEventListener('DOMContentLoaded', () => {
    const searchIcon = document.getElementById('searchIcon');
    const searchBar = document.getElementById('searchBar');
    const passwordsTab = document.getElementById('passwordsTab');
    const generatorTab = document.getElementById('generatorTab');
    const tabSlider = document.getElementById('tabSlider');
    const passwordsTabContainer = document.querySelector('.passwordsTabContainer');
    const generatorTabContainer = document.querySelector('.generatorTabContainer');

    // Set Passwords Tab as Default
    tabSlider.style.left = '0%';
    passwordsTabContainer.classList.add('active');

    searchIcon.addEventListener('click', () => {
        searchBar.classList.toggle('expanded');
        if (searchBar.classList.contains('expanded')) {
            searchBar.focus();
        } else {
            searchBar.value = '';
        }
    });

    document.addEventListener('click', (event) => {
        if (!searchBar.contains(event.target) && !searchIcon.contains(event.target)) {
            searchBar.classList.remove('expanded');
        }
    });

    searchBar.addEventListener('blur', () => {
        searchBar.classList.remove('expanded');
    });

    passwordsTab.addEventListener('click', () => {
        tabSlider.style.left = '0%';
        passwordsTabContainer.classList.add('active');
        generatorTabContainer.classList.remove('active');
    });

    generatorTab.addEventListener('click', () => {
        tabSlider.style.left = '50%';
        generatorTabContainer.classList.add('active');
        passwordsTabContainer.classList.remove('active');
    });

    const lengthSlider = document.getElementById('lengthSlider');
    const passwordLength = document.getElementById('passwordLength');

    lengthSlider.addEventListener('input', () => {
        passwordLength.value = lengthSlider.value;
    });

    passwordLength.addEventListener('input', () => {
        lengthSlider.value = passwordLength.value;
    });
});
