"use strict";

/* ================= HOME COUNTERS ================= */

function initHomeCounters() {
    const counters = document.querySelectorAll("[data-counter]");

    if (!counters.length) return;

    const animateCounter = (counter) => {
        const target = Number(counter.dataset.counter);
        const duration = 1400;
        const startTime = performance.now();

        const update = (currentTime) => {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.floor(eased * target);

            counter.textContent = target === 100 ? `${value}%` : value;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.textContent = target === 100 ? "100%" : target;
            }
        };

        requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                animateCounter(entry.target);
                obs.unobserve(entry.target);
            });
        },
        { threshold: 0.45 }
    );

    counters.forEach((counter) => observer.observe(counter));
}

/* ================= HOME REVEAL ================= */

function initHomeReveal() {
    const items = document.querySelectorAll(
        ".hero-content, .hero-info-card, .hero-thumbs a, .image-card, .process-steps article, .quote-copy, .quote-form, .faq-list details"
    );

    if (!items.length) return;

    items.forEach((item) => {
        item.classList.add("reveal-item");
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

/* ================= HOME PARALLAX ================= */

function initHeroParallax() {
    const heroImage = document.querySelector(".hero-bg img");
    const heroThumbs = document.querySelector(".hero-thumbs");

    if (!heroImage) return;

    const handleScroll = () => {
        const scroll = window.scrollY;
        const moveImage = Math.min(scroll * 0.08, 42);

        heroImage.style.transform = `scale(1.04) translateY(${moveImage}px)`;

        if (heroThumbs) {
            heroThumbs.style.transform = `translateY(${Math.min(scroll * -0.035, 0)}px)`;
        }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
}

/* ================= IMAGE CARDS MAGNET ================= */

function initCardHoverTilt() {
    const cards = document.querySelectorAll(".image-card");

    if (!cards.length) return;

    cards.forEach((card) => {
        card.addEventListener("mousemove", (event) => {
            const rect = card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const rotateY = ((x / rect.width) - 0.5) * 4;
            const rotateX = ((y / rect.height) - 0.5) * -4;

            card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });
}

/* ================= FORM VISUAL STATE ================= */

function initFormVisualState() {
    const forms = document.querySelectorAll("[data-quote-form]");

    forms.forEach((form) => {
        const fields = form.querySelectorAll("input, select, textarea");

        fields.forEach((field) => {
            const updateState = () => {
                const label = field.closest("label");

                if (!label) return;

                label.classList.toggle("has-value", Boolean(field.value));
            };

            field.addEventListener("input", updateState);
            field.addEventListener("change", updateState);
            updateState();
        });
    });
}

/* ================= REDUCE MOTION ================= */

function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", () => {
    initHomeCounters();
    initHomeReveal();
    initFormVisualState();

    if (!prefersReducedMotion()) {
        initHeroParallax();
        initCardHoverTilt();
    }
});