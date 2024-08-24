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

        function updateArrows() {
            const prevIndex = (counter - 1 + carouselItems.length) % carouselItems.length;
            const nextIndex = (counter + 1) % carouselItems.length;

            const prevImage = carouselItems[prevIndex].querySelector('img').src;
            const nextImage = carouselItems[nextIndex].querySelector('img').src;

            prevButton.querySelector('.arrow-image').style.backgroundImage = `url(${prevImage})`;
            nextButton.querySelector('.arrow-image').style.backgroundImage = `url(${nextImage})`;
        }

        function showItem(index) {
            if (index < 0) {
                counter = carouselItems.length - 1;
            } else if (index >= carouselItems.length) {
                counter = 0;
            } else {
                counter = index;
            }
            carouselSlide.style.transform = `translateX(${-counter * size}px)`;
            container.style.backgroundPosition = `${-counter * 10}px 0`;
            updateArrows();
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
            carousel.style.transform = `translateY(${(i - index) * 100}vh)`;
            carousel.style.transition = 'transform 0.5s ease-in-out';
        });
    }

    function handleVerticalNavigation(direction) {
        if (direction === 'down' && currentRegionIndex < carousels.length - 1) {
            currentRegionIndex++;
        } else if (direction === 'up' && currentRegionIndex > 0) {
            currentRegionIndex--;
        }
        showRegion(currentRegionIndex);
    }


    document.addEventListener('wheel', (e) => {
        handleVerticalNavigation(e.deltaY > 0 ? 'down' : 'up');
    });

    let touchStartY = 0;
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    });

    document.addEventListener('touchend', (e) => {
        const touchEndY = e.changedTouches[0].clientY;
        const deltaY = touchStartY - touchEndY;
        if (Math.abs(deltaY) > 50) {
            handleVerticalNavigation(deltaY > 0 ? 'down' : 'up');
        }
    });


    showRegion(currentRegionIndex);
});
