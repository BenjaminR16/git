// Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Carousel Variables
    const carouselTrack = document.querySelector('.carousel-track');
    const slides = Array.from(carouselTrack.children);
    const prevButton = document.querySelector('.carousel-btn.prev');
    const nextButton = document.querySelector('.carousel-btn.next');
    const dots = Array.from(document.querySelectorAll('.dot'));

    let currentIndex = 0;
    const slideCount = slides.length;
    let autoAdvanceTimer;

    // Set initial slide position
    function updateCarouselPosition() {
        carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Navigate to previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateCarouselPosition();
        resetAutoAdvance();
    }

    // Navigate to next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateCarouselPosition();
        resetAutoAdvance();
    }

    // Auto advance functionality
    function startAutoAdvance() {
        autoAdvanceTimer = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    function resetAutoAdvance() {
        clearInterval(autoAdvanceTimer);
        startAutoAdvance();
    }

    // Event Listeners
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarouselPosition();
            resetAutoAdvance();
        });
    });

    // Pause auto-advance on hover
    const carousel = document.querySelector('.hero-carousel');
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoAdvanceTimer);
    });

    carousel.addEventListener('mouseleave', () => {
        resetAutoAdvance();
    });

    // Start auto-advance
    startAutoAdvance();

    // Scroll Animations with Intersection Observer
    const fadeElements = document.querySelectorAll('.fade-in, .slide-up, .scale-in, .stagger-children');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // For staggered children, we need to add visible to parent
                if (entry.target.classList.contains('stagger-children')) {
                    entry.target.classList.add('visible');
                }
                // Uncomment the line below if you want elements to animate only once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });
});

// Intersection Observer polyfill for older browsers if needed
if ('IntersectionObserver' in window === false) {
    // Simple fallback - just show all elements
    document.addEventListener('DOMContentLoaded', function() {
        const elements = document.querySelectorAll('.fade-in, .slide-up, .scale-in, .stagger-children');
        elements.forEach(el => el.classList.add('visible'));

        const staggerParents = document.querySelectorAll('.stagger-children');
        staggerParents.forEach(parent => parent.classList.add('visible'));
    });
}