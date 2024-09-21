const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');

const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

// Clonar la primera y última imagen para crear un efecto de bucle
const firstClone = carouselImages[0].cloneNode(true);
const lastClone = carouselImages[carouselImages.length - 1].cloneNode(true);

// Añadir clones al DOM
carouselSlide.appendChild(firstClone);
carouselSlide.insertBefore(lastClone, carouselImages[0]);

let counter = 1; // Empezamos en 1 para evitar el primer clon inmediatamente
const size = carouselImages[0].clientWidth;
carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

// Botón "Siguiente"
nextBtn.addEventListener('click', () => {
    if (counter >= carouselImages.length) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter++;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

    // Cuando llega al primer clon (final del carrusel), volver al inicio sin transición
    carouselSlide.addEventListener('transitionend', () => {
        if (counter === carouselImages.length - 1) {
            carouselSlide.style.transition = "none"; // Sin transición
            counter = 1; // Volvemos a la primera imagen real
            carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        }
    });
});

// Botón "Anterior"
prevBtn.addEventListener('click', () => {
    if (counter <= 0) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter--;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

    // Cuando llega al último clon (inicio del carrusel), volver al final sin transición
    carouselSlide.addEventListener('transitionend', () => {
        if (counter === 0) {
            carouselSlide.style.transition = "none"; // Sin transición
            counter = carouselImages.length - 2; // Volvemos a la última imagen real
            carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        }
    });
});

// Desplazamiento automático
setInterval(() => {
    nextBtn.click();
}, 5000); // Cambia cada 5 segundos
