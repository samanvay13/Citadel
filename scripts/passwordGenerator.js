class PasswordGenerator {
    constructor() {
        this.charsetDefault = {
            letter_lower: "abcdefghijklmnopqrstuvwxyz",
            letter_upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            number: "0123456789",
            char_special: "~!@#$%^&*()-_+=|\\{}[];:'\",.<>/?"
        };
        this.init();
    }

    init() {
        document.getElementById('lengthSlider').addEventListener('input', this.updatePassword.bind(this));
        document.getElementById('lowercase').addEventListener('change', this.updatePassword.bind(this));
        document.getElementById('uppercase').addEventListener('change', this.updatePassword.bind(this));
        document.getElementById('specialChars').addEventListener('change', this.updatePassword.bind(this));
        document.getElementById('numbers').addEventListener('change', this.updatePassword.bind(this));
        document.getElementById('regenerateIcon').addEventListener('click', this.updatePassword.bind(this));
        document.getElementById('copyIcon').addEventListener('click', this.copyPassword.bind(this));

        // Initial password generation
        this.updatePassword();
    }

    updatePassword() {
        const length = document.getElementById('lengthSlider').value;
        const includeLower = document.getElementById('lowercase').checked;
        const includeUpper = document.getElementById('uppercase').checked;
        const includeSpecial = document.getElementById('specialChars').checked;
        const includeNumbers = document.getElementById('numbers').checked;

        const password = this.generatePassword({
            length: parseInt(length, 10),
            req_number: includeNumbers,
            req_char_spl: includeSpecial,
            req_letter_upper: includeUpper,
            req_letter_lower: includeLower,
            exclude_chars: '',
            start_with_letter: true
        });

        document.getElementById('generatedPassword').value = password;
    }

    copyPassword() {
        const passwordField = document.getElementById('generatedPassword');
        passwordField.select();
        navigator.clipboard.writeText(passwordField.value).then(function() {
            const notification = document.getElementById('copyNotification');
            notification.classList.add('show');
    
            setTimeout(function() {
                notification.classList.remove('show');
            }, 1000);
        }).catch(function(err) {
            console.error('Failed to copy: ', err);
        });
    }

    removeChars(str, chars) {
        let regex = new RegExp(`[${chars}]`, 'g');
        return str.replace(regex, '');
    }

    generatePassword(input) {
        const password = new Array(input.length);
        const charsetCorrected = {
            letter_lower: this.removeChars(this.charsetDefault.letter_lower, input.exclude_chars),
            letter_upper: this.removeChars(this.charsetDefault.letter_upper, input.exclude_chars),
            number: this.removeChars(this.charsetDefault.number, input.exclude_chars),
            char_special: this.removeChars(this.charsetDefault.char_special, input.exclude_chars)
        };

        input.req_number = input.req_number && (charsetCorrected.number.length > 0);
        input.req_char_spl = input.req_char_spl && (charsetCorrected.char_special.length > 0);
        input.req_letter_upper = input.req_letter_upper && (charsetCorrected.letter_upper.length > 0);
        input.req_letter_lower = input.req_letter_lower && (charsetCorrected.letter_lower.length > 0);

        let length_remaining = input.length;
        let count;
        let i = 0;

        if (input.req_char_spl && input.no_of_spl_char) {
            count = input.no_of_spl_char;
            length_remaining -= count;
            i = this.fillCharCharset(password, i, count, charsetCorrected.char_special);
        }

        if (input.req_number) {
            count = Math.min(Math.ceil(0.25 * input.length), length_remaining);
            length_remaining -= count;
            i = this.fillCharCharset(password, i, count, charsetCorrected.number);
        }

        if (input.req_char_spl && !input.no_of_spl_char) {
            count = Math.ceil(0.15 * input.length);
            length_remaining -= count;
            i = this.fillCharCharset(password, i, count, charsetCorrected.char_special);
        }

        const letterStart = i;

        if (input.req_letter_upper) {
            count = Math.floor(0.50 * length_remaining);
            length_remaining -= count;
            i = this.fillCharCharset(password, i, count, charsetCorrected.letter_upper);
        }

        if (input.req_letter_lower) {
            count = length_remaining;
            length_remaining = 0;
            i = this.fillCharCharset(password, i, count, charsetCorrected.letter_lower);
        }

        if (length_remaining) {
            if (input.req_letter_upper) {
                i = this.fillCharCharset(password, i, length_remaining, charsetCorrected.letter_upper);
            } else if (input.req_char_spl && (input.no_of_spl_char == 0)) {
                i = this.fillCharCharset(password, i, length_remaining, charsetCorrected.char_special);
            } else if (input.req_number) {
                i = this.fillCharCharset(password, i, length_remaining, charsetCorrected.number);
            }
        }

        const startWithLetter = input.start_with_letter && (input.req_letter_upper || input.req_letter_lower);

        if (startWithLetter) {
            this.swap(password, password.length - 1, this.generateRandomRange(letterStart, password.length));
        }

        let end = i;
        this.shuffle(password, startWithLetter ? end - 1 : end);

        if (startWithLetter) {
            let index_end = end - 1;
            let temp = password[0];
            password[0] = password[index_end];
            password[index_end] = temp;
        }

        this.correctPassword(password, end, charsetCorrected);

        return password.join("");
    }

    fillCharCharset(password, i, count, charset) {
        while (count-- > 0) {
            password[i++] = charset[this.generateRandom(charset.length)];
        }
        return i;
    }

    shuffle(array, end) {
        let posRand;
        for (let i = end - 1; i > 0; i--) {
            posRand = this.generateRandom(i + 1);
            this.swap(array, i, posRand);
        }
    }

    swap(array, i, j) {
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    correctPassword(password, length, charsetAll) {
        let charsetReq = "";
        for (let i = 1; i < length; i++) {
            if (Math.abs(password[i].charCodeAt(0) - password[i - 1].charCodeAt(0)) > 1) {
                continue;
            }
            for (let key in charsetAll) {
                if (charsetAll[key].includes(password[i])) {
                    charsetReq = charsetAll[key];
                    break;
                }
            }
            charsetReq = this.removeChars(charsetReq, this.getCharAdj(password[i]));
            if (charsetReq.length) {
                password[i] = charsetReq[this.generateRandom(charsetReq.length)];
            }
        }
    }

    getCharAdj(ch) {
        const code = ch.charCodeAt(0);
        return String.fromCharCode(code - 1) + ch + String.fromCharCode(code + 1);
    }

    generateRandom(max) {
        return Math.floor(Math.random() * max);
    }

    generateRandomRange(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}

// Initialize the password generator
document.addEventListener('DOMContentLoaded', () => {
    new PasswordGenerator();
});
