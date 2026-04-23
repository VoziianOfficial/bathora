"use strict";

/* ================= SERVICES FILTER ================= */

function initServicesFilter() {
    const buttons = document.querySelectorAll("[data-service-filter]");
    const cards = document.querySelectorAll("[data-service-category]");

    if (!buttons.length || !cards.length) return;

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.dataset.serviceFilter;

            buttons.forEach((btn) => btn.classList.remove("is-active"));
            button.classList.add("is-active");

            cards.forEach((card) => {
                const category = card.dataset.serviceCategory;
                const shouldShow = filter === "all" || category === filter;

                card.classList.toggle("is-hidden", !shouldShow);
            });
        });
    });
}

/* ================= SERVICES REVEAL ================= */

function initServicesReveal() {
    const items = document.querySelectorAll(
        ".services-hero-copy, .services-hero-panel, .service-directory-card, .compare-points article, .services-cta-box, .faq-list details"
    );

    if (!items.length) return;

    items.forEach((item) => {
        item.classList.add("services-reveal");
    });

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("is-visible");
                obs.unobserve(entry.target);
            });
        },
        { threshold: 0.15 }
    );

    items.forEach((item) => observer.observe(item));
}

/* ================= SERVICES IMAGE TILT ================= */

function initServicesTilt() {
    const cards = document.querySelectorAll(".service-directory-card");

    cards.forEach((card) => {
        card.addEventListener("mousemove", (event) => {
            const rect = card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const rotateY = ((x / rect.width) - 0.5) * 3.5;
            const rotateX = ((y / rect.height) - 0.5) * -3.5;

            card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });
}

function prefersReducedMotionServices() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", () => {
    initServicesFilter();
    initServicesReveal();

    if (!prefersReducedMotionServices()) {
        initServicesTilt();
    }
});