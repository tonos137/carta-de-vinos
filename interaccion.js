document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    const slideWidth = slides[0].getBoundingClientRect().width;

    // Arrange the slides next to one another
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    slides.forEach(setSlidePosition);

    const moveToSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    };

    // Next button
    nextButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling || slides[0];
        moveToSlide(track, currentSlide, nextSlide);
    });

    // Prev button
    prevButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling || slides[slides.length - 1];
        moveToSlide(track, currentSlide, prevSlide);
    });
});

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
