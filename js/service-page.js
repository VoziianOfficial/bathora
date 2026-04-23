"use strict";

/* ================= SERVICE PAGE REVEAL ================= */

function initServicePageReveal() {
    const items = document.querySelectorAll(
        ".service-hero-copy, .service-hero-card, .service-rich-text, .service-factor-grid article, .service-form-copy, .quote-form, .faq-list details"
    );

    if (!items.length) return;

    items.forEach((item) => {
        item.classList.add("service-reveal");
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

/* ================= SERVICE HERO PARALLAX ================= */

function initServiceHeroParallax() {
    const image = document.querySelector(".service-hero-bg img");

    if (!image) return;

    const move = () => {
        const scroll = window.scrollY;
        image.style.transform = `scale(1.04) translateY(${Math.min(scroll * 0.08, 46)}px)`;
    };

    move();
    window.addEventListener("scroll", move, { passive: true });
}

/* ================= SERVICE FACTOR TILT ================= */

function initServiceFactorTilt() {
    const cards = document.querySelectorAll(".service-factor-grid article");

    cards.forEach((card) => {
        card.addEventListener("mousemove", (event) => {
            const rect = card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const rotateY = ((x / rect.width) - 0.5) * 3;
            const rotateX = ((y / rect.height) - 0.5) * -3;

            card.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });
}

function prefersReducedMotionServicePage() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", () => {
    initServicePageReveal();

    if (!prefersReducedMotionServicePage()) {
        initServiceHeroParallax();
        initServiceFactorTilt();
    }
});