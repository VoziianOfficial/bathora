"use strict";

/* ================= ABOUT REVEAL ================= */

function initAboutReveal() {
    const items = document.querySelectorAll(
        ".about-hero-copy, .about-portrait-stack, .story-number, .story-copy, .model-card, .operating-image, .operating-copy, .clarity-grid article, .about-cta-box"
    );

    if (!items.length) return;

    items.forEach((item) => {
        item.classList.add("about-reveal");
    });

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("is-visible");
                obs.unobserve(entry.target);
            });
        },
        { threshold: 0.14 }
    );

    items.forEach((item) => observer.observe(item));
}

/* ================= ABOUT PARALLAX ================= */

function initAboutParallax() {
    const mainCard = document.querySelector(".portrait-card-main");
    const smallCard = document.querySelector(".portrait-card-small");
    const note = document.querySelector(".about-floating-note");

    if (!mainCard) return;

    const move = () => {
        const scroll = window.scrollY;

        mainCard.style.transform = `translateY(${Math.min(scroll * 0.035, 28)}px)`;

        if (smallCard) {
            smallCard.style.transform = `translateY(${Math.min(scroll * -0.025, 0)}px)`;
        }

        if (note) {
            note.style.transform = `translateY(${Math.min(scroll * -0.018, 0)}px)`;
        }
    };

    move();
    window.addEventListener("scroll", move, { passive: true });
}

function prefersReducedMotionAbout() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", () => {
    initAboutReveal();

    if (!prefersReducedMotionAbout()) {
        initAboutParallax();
    }
});