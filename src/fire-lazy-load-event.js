const LAZY_LOAD_EVENT = "lazy-load";

export const fireLazyLoadEvent = () => {
    // fire lazy load event to lazy load images
    const event = new Event(LAZY_LOAD_EVENT);
    window.dispatchEvent(event);
};
