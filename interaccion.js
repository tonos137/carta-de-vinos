document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('.carousel-container');

  carousels.forEach((container) => {
    const slide = container.querySelector('.carousel-slide');
    const items = container.querySelectorAll('.carousel-item');
    const prevButton = container.querySelector('.prev');
    const nextButton = container.querySelector('.next');

    let current = 0;

    function updateCarousel() {
      const prev = (current - 1 + items.length) % items.length;
      const next = (current + 1) % items.length;

      items.forEach((item, index) => {
        if (index === current) {
          item.style.order = '2';
        } else if (index === prev) {
          item.style.order = '1';
        } else if (index === next) {
          item.style.order = '3';
        } else {
          item.style.order = '0';
        }
      });

      slide.style.transform = 'translateX(-100%)';

      prevButton.innerHTML = `<img src="${items[prev].querySelector('img').src}" alt="Previous">`;
      nextButton.innerHTML = `<img src="${items[next].querySelector('img').src}" alt="Next">`;
    }

    function moveToNext() {
      current = (current + 1) % items.length;
      updateCarousel();
    }

    function moveToPrev() {
      current = (current - 1 + items.length) % items.length;
      updateCarousel();
    }

    prevButton.addEventListener('click', moveToPrev);
    nextButton.addEventListener('click', moveToNext);

    updateCarousel();
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
