document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel-container');
    let touchStartX = 0;
    let touchEndX = 0;
    let currentRegionIndex = 0;

    carousels.forEach((container, index) => {
        const prevButton = container.querySelector('.prev');
        const nextButton = container.querySelector('.next');
        const carouselSlide = container.querySelector('.carousel-slide');
        const carouselItems = container.querySelectorAll('.carousel-item');

        let counter = 0;
        const size = carouselItems[0].clientWidth;

        function showItem(index) {
            if (index < 0) {
                counter = carouselItems.length - 1;
            } else if (index >= carouselItems.length) {
                counter = 0;
            } else {
                counter = index;
            }
            carouselSlide.style.transform = `translateX(${-counter * size}px)`;
            
            // Add movement to background image
            container.style.backgroundPosition = `${-counter * 20}px 0`;
        }

        prevButton.addEventListener('click', () => showItem(counter - 1));
        nextButton.addEventListener('click', () => showItem(counter + 1));

        container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            if (touchStartX - touchEndX > 50) {
                showItem(counter + 1);
            }
            if (touchEndX - touchStartX > 50) {
                showItem(counter - 1);
            }
        }

        showItem(counter);
    });

    function showRegion(index) {
        carousels.forEach((carousel, i) => {
            carousel.style.display = i === index ? 'block' : 'none';
        });
    }

    document.addEventListener('wheel', (e) => {
        if (e.deltaY > 0 && currentRegionIndex < carousels.length - 1) {
            currentRegionIndex++;
        } else if (e.deltaY < 0 && currentRegionIndex > 0) {
            currentRegionIndex--;
        }
        showRegion(currentRegionIndex);
    });

    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    });

    document.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].screenY;
        handleVerticalSwipe();
    });

    function handleVerticalSwipe() {
        if (touchStartY - touchEndY > 50 && currentRegionIndex < carousels.length - 1) {
            currentRegionIndex++;
        }
        if (touchEndY - touchStartY > 50 && currentRegionIndex > 0) {
            currentRegionIndex--;
        }
        showRegion(currentRegionIndex);
    }

    showRegion(currentRegionIndex);
});