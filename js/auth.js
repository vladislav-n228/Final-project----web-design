const form = document.querySelector('#form');
const message = document.querySelector('#message');

const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const password2Input = document.querySelector('#password2');
const socialButtons = document.querySelectorAll('.auth-social');

function showMessage(text, isSuccess) {
    message.textContent = text;
    message.classList.toggle('success', isSuccess);
}

const rules = document.querySelector('#rules');
const ruleLength = document.querySelector('#rule-length');
const ruleUpper = document.querySelector('#rule-upper');
const ruleNumber = document.querySelector('#rule-number');
const ruleSymbols = document.querySelector('#rule-symbols');

function setRule(rule, isDone) {
    rule.classList.toggle('done', isDone);
}

function checkPassword() {
    const password = passwordInput.value;

    const hasLength = password.length >= 6;
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const noBadSymbols = !/[\s<>"']/.test(password);

    setRule(ruleLength, hasLength);
    setRule(ruleUpper, hasUpper);
    setRule(ruleNumber, hasNumber);
    setRule(ruleSymbols, noBadSymbols);

    return hasLength && hasUpper && hasNumber && noBadSymbols;
}

function showRules() {
    rules.classList.add('show');
}

function hideRules() {
    rules.classList.remove('show');
}

if (rules) {
    passwordInput.addEventListener('mouseenter', showRules);
    passwordInput.addEventListener('focus', showRules);

    passwordInput.addEventListener('mouseleave', () => {
        if (document.activeElement !== passwordInput) {
            hideRules();
        }
    });

    passwordInput.addEventListener('blur', hideRules);

    passwordInput.addEventListener('input', checkPassword);

    checkPassword();
}

socialButtons.forEach((button) => {
    button.addEventListener('click', () => {
        showMessage(button.textContent + ' login will be available soon', true);
    });
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (nameInput && nameInput.value.trim() === '') {
        showMessage('Please enter your account name', false);
        return;
    }

    if (!emailInput.value.includes('@')) {
        showMessage('Please enter a valid email', false);
        return;
    }

    if (passwordInput.value.length < 6) {
        showMessage('Password must be at least 6 characters', false);
        return;
    }

    if (rules && !checkPassword()) {
        rules.classList.add('show');
        showMessage('Password does not meet all the requirements', false);
        return;
    }

    if (password2Input && password2Input.value !== passwordInput.value) {
        showMessage('Passwords do not match', false);
        return;
    }

    showMessage('Success! Redirecting to home page...', true);

    setTimeout(() => {
        goToPage('index.html');
    }, 1000);
});

function goToPage(url) {
    document.body.classList.add('page-leave');

    setTimeout(() => {
        window.location.href = url;
    }, 500);
}

const homeLinks = document.querySelectorAll('a[href="index.html"]');

homeLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        goToPage('index.html');
    });
});

window.addEventListener('pageshow', () => {
    document.body.classList.remove('page-leave');
});
