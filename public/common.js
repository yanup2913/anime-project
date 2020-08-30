const fireLazyLoad = () => {
    const lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

    if ("IntersectionObserver" in window) {
        const options = {
            root: document.querySelector(".card-wrapper"),
            rootMargin: '0% 0% 33% 0%', // load one extra image other than viewport for better user experience
        };
        const lazyImageObserver = new IntersectionObserver((entries, observer) => {

            entries.forEach(({isIntersecting, target}) => {
                if (isIntersecting) {
                    let lazyImage = target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        }, options);

        lazyImages.forEach(lazyImage => {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        /* TEMP COMMENT: we can also do it with scroll, resize, orientationchange as fallback

        1. get the images using lazy class
        2. Using above event listeners check which image exist in viewport using getBoundingClientRect

      if image is in view port change the src with data-src and remove the lazy class
    */
    }
};


(function() {
    window.addEventListener("lazy-load", fireLazyLoad);
})();
