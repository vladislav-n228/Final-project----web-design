const counters = document.querySelectorAll('.counter');

counters.forEach((counter) => {
    const target = Number(counter.dataset.target);
    const step = target / 60;
    let current = 0;

    const timer = setInterval(() => {
        current += step;

        if (current >= target) {
            current = target;
            clearInterval(timer);
        }

        counter.textContent = Math.floor(current);
    }, 25);
});

const timeline = document.querySelector('.timeline');
const timelineFill = document.querySelector('.timeline-fill');
const chapters = document.querySelectorAll('.chapter');

function updateTimeline() {
    const box = timeline.getBoundingClientRect();

    let progress = window.innerHeight / 2 - box.top;

    if (progress < 0) {
        progress = 0;
    }

    if (progress > box.height) {
        progress = box.height;
    }

    timelineFill.style.height = progress + 'px';

    chapters.forEach((chapter) => {
        const chapterTop = chapter.offsetTop + 30;
        chapter.classList.toggle('active', progress >= chapterTop);
    });
}

window.addEventListener('scroll', updateTimeline);
window.addEventListener('resize', updateTimeline);
updateTimeline();
