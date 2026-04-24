"use strict";



function initLegalReveal() {
    const items = document.querySelectorAll(
        ".legal-hero, .legal-nav, .legal-content section"
    );

    if (!items.length) return;

    items.forEach(el => el.classList.add("legal-reveal"));

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("is-visible");
                obs.unobserve(entry.target);
            });
        },
        { threshold: 0.12 }
    );

    items.forEach(el => observer.observe(el));
}



function initLegalNavScroll() {
    const links = document.querySelectorAll(".legal-nav a");

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");

            if (!href.startsWith("#")) return;

            e.preventDefault();

            const target = document.querySelector(href);
            if (!target) return;

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });
}



document.addEventListener("DOMContentLoaded", () => {
    initLegalReveal();
    initLegalNavScroll();
});