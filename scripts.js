let currentIndex = 0;
const images = document.querySelectorAll('.carousel-container img');
const totalImages = images.length;

function showNextImage() {
    const container = document.querySelector('.carousel-container');
    currentIndex = (currentIndex + 1) % totalImages;
    container.style.transform = `translateX(-${currentIndex * 100}%)`;
}

setInterval(showNextImage, 3000); // Change image every 3 seconds
