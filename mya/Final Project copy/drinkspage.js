function autoplayCarousel() {
    const carouselEl = document.getElementById("carousel");
    const slideContainerEl = carouselEl.querySelector("#slide-container");
    const slideEl = carouselEl.querySelector(".slide");
    let slideWidth = slideEl.offsetWidth;
 
    
    const autoplay = setInterval(() => navigate("forward"), 3000);
    slideContainerEl.addEventListener("mouseenter", () => clearInterval(autoplay));
    
    const getNewScrollPosition = (arg) => {
        const gap = 10;
        const maxScrollLeft = slideContainerEl.scrollWidth - slideWidth;
        if (arg === "forward") {
            const x = slideContainerEl.scrollLeft + slideWidth + gap;
            return x <= maxScrollLeft ? x : 0;
        } else if (arg === "backward") {
            const x = slideContainerEl.scrollLeft - slideWidth - gap;
            return x >= 0 ? x : maxScrollLeft;
        } else if (typeof arg === "number") {
            const x = arg * (slideWidth + gap);
            return x;
        }
    }
    const navigate = (arg) => {
        slideContainerEl.scrollLeft = getNewScrollPosition(arg);
    }
    
    const slideObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const slideIndex = entry.target.dataset.slideindex;
                carouselEl.querySelector('.slide-indicator.active').classList.remove('active');
                carouselEl.querySelectorAll('.slide-indicator')[slideIndex].classList.add('active');
            }
        });
    }, { root: slideContainerEl, threshold: .1 });
    document.querySelectorAll('.slide').forEach((slide) => {
        slideObserver.observe(slide);
    });
}
autoplayCarousel();