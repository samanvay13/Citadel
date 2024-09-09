document.addEventListener('DOMContentLoaded', (event) => {
    const lengthSlider = document.getElementById('lengthSlider');
    const passwordLength = document.getElementById('passwordLength');

    lengthSlider.addEventListener('input', function() {
        const value = (this.value - this.min) / (this.max - this.min) * 100;
        this.style.background = `linear-gradient(to right, #c956ff ${value}%, #eeeeee ${value}%)`;
        passwordLength.value = this.value;
    });

    // Set initial slider background
    const initialValue = (lengthSlider.value - lengthSlider.min) / (lengthSlider.max - lengthSlider.min) * 100;
    lengthSlider.style.background = `linear-gradient(to right, #c956ff ${initialValue}%, #eeeeee ${initialValue}%)`;
});
