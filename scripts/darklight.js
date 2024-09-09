document.getElementById('modeToggle').addEventListener('change', function () {
    const mode = this.checked ? 'dark' : 'light';
    chrome.storage.sync.set({ themeMode: mode }, function () {
        if (mode === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get('themeMode', function (data) {
        if (data.themeMode === 'dark') {
            document.body.classList.add('dark-mode');
            document.getElementById('modeToggle').checked = true;
        } else {
            document.body.classList.remove('dark-mode');
            document.getElementById('modeToggle').checked = false;
        }
    });
});