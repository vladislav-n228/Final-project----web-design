const params = new URLSearchParams(window.location.search);
let link = params.get('to');

if (!link || !link.startsWith('https://')) {
    link = 'index.html';
}

const siteName = document.querySelector('#site-name');
const secondsText = document.querySelector('#seconds');
const goNowButton = document.querySelector('#go-now');

siteName.textContent = link === 'index.html' ? 'home page' : new URL(link).hostname;
goNowButton.href = link;

let seconds = 3;

const timer = setInterval(() => {
    seconds--;

    if (seconds === 0) {
        clearInterval(timer);
        window.location.replace(link);
        return;
    }

    if (seconds === 1) {
        secondsText.textContent = '1 second';
    } else {
        secondsText.textContent = seconds + ' seconds';
    }
}, 1000);
