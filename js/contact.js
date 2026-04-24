"use strict";



function initContactReveal() {
    const items = document.querySelectorAll(
        ".contact-copy, .contact-form, .contact-cards a, .map-copy, .map-frame, .contact-steps article"
    );

    if (!items.length) return;

    items.forEach((item) => {
        item.classList.add("contact-reveal");
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



function initMapHover() {
    const mapFrame = document.querySelector(".map-frame");

    if (!mapFrame) return;

    mapFrame.addEventListener("mousemove", (event) => {
        const rect = mapFrame.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 3;
        const rotateX = ((y / rect.height) - 0.5) * -3;

        mapFrame.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    mapFrame.addEventListener("mouseleave", () => {
        mapFrame.style.transform = "";
    });
}



function initContactFieldStates() {
    const form = document.querySelector(".contact-form");

    if (!form) return;

    const fields = form.querySelectorAll("input, select, textarea");

    fields.forEach((field) => {
        const label = field.closest("label");

        const update = () => {
            if (!label) return;
            label.classList.toggle("has-value", Boolean(field.value));
        };

        field.addEventListener("input", update);
        field.addEventListener("change", update);
        update();
    });
}

function prefersReducedMotionContact() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}



document.addEventListener("DOMContentLoaded", () => {
    initContactReveal();
    initContactFieldStates();

    if (!prefersReducedMotionContact()) {
        initMapHover();
    }
});