const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const items = document.querySelectorAll('.item');
const dots = document.querySelectorAll('.dot');
const numberIndicator = document.querySelector('.numbers');

let active = 0;
const total = items.length;
let timer;

function restartTimer() {
    clearInterval(timer);
    timer = setInterval(() => update(1, false), 5000);
}

function update(direction, restart = true) {
    items[active].classList.remove('active');
    dots[active].classList.remove('active');

    active = (active + direction + total) % total;

    items[active].classList.add('active');
    dots[active].classList.add('active');
    numberIndicator.textContent = String(active + 1).padStart(2, '0');

    if (restart) restartTimer();
}

prevButton.addEventListener('click', () => update(-1));
nextButton.addEventListener('click', () => update(1));

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        if (index === active) return;
        const direction = index > active ? index - active : -(active - index);
        update(direction);
    });
    dot.style.cursor = 'pointer';
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') update(-1);
    if (event.key === 'ArrowRight') update(1);
});

restartTimer();
