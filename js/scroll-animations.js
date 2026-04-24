"use strict";



function initScrollAnimations() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const headings = document.querySelectorAll(
        ".section-heading, .service-intro-grid, .quote-copy, .service-form-copy, .map-copy, .operating-copy"
    );

    headings.forEach((item) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 82%",
                once: true
            },
            opacity: 0,
            y: 36,
            duration: 0.85,
            ease: "power3.out"
        });
    });

    const cardGroups = [
        ".service-mosaic .image-card",
        ".services-card-grid .service-directory-card",
        ".service-factor-grid article",
        ".process-steps article",
        ".compare-points article",
        ".clarity-grid article",
        ".contact-steps article",
        ".faq-list details"
    ];

    cardGroups.forEach((selector) => {
        const cards = document.querySelectorAll(selector);
        if (!cards.length) return;

        gsap.from(cards, {
            scrollTrigger: {
                trigger: cards[0].parentElement,
                start: "top 82%",
                once: true
            },
            opacity: 0,
            y: 34,
            scale: 0.96,
            filter: "blur(8px)",
            stagger: 0.08,
            duration: 0.75,
            ease: "power3.out",
            clearProps: "filter,transform"
        });
    });

    const imageBlocks = document.querySelectorAll(
        ".services-hero-image, .operating-image, .map-frame, .portrait-card, .quote-form, .contact-form"
    );

    imageBlocks.forEach((item) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 84%",
                once: true
            },
            opacity: 0,
            y: 34,
            scale: 0.96,
            duration: 0.85,
            ease: "power3.out"
        });
    });
}

document.addEventListener("DOMContentLoaded", initScrollAnimations);