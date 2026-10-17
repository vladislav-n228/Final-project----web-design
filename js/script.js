const slides = document.querySelector('.slides');
const dots = document.querySelectorAll('.dot');

let currentSlide = 0;
let timer;

function showSlide(index) {
    currentSlide = index;
    slides.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach((dot, i) => {
        dot.classList.toggle('dot-active', i === index);
    });
}

function nextSlide() {
    showSlide((currentSlide + 1) % dots.length);
}

function startTimer() {
    clearInterval(timer);
    timer = setInterval(nextSlide, 6000);
}

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        showSlide(i);
        startTimer();
    });
});

startTimer();

