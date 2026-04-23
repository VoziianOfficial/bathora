"use strict";

/* ================= PREMIUM CURSOR ================= */

function initPremiumCursor() {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouchDevice || reducedMotion) return;

    const cursor = document.createElement("div");
    const dot = document.createElement("div");

    cursor.className = "premium-cursor";
    dot.className = "premium-cursor-dot";

    document.body.append(cursor, dot);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    window.addEventListener("mousemove", (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;

        dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.16;
        cursorY += (mouseY - cursorY) * 0.16;

        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    const interactiveItems = document.querySelectorAll(
        "a, button, .image-card, .service-directory-card, .choice-card, .model-card, .map-frame"
    );

    interactiveItems.forEach((item) => {
        item.addEventListener("mouseenter", () => {
            cursor.classList.add("is-hovering");
            dot.classList.add("is-hovering");
        });

        item.addEventListener("mouseleave", () => {
            cursor.classList.remove("is-hovering");
            dot.classList.remove("is-hovering");
        });
    });
}

/* ================= MAGNETIC BUTTONS ================= */

function initMagneticButtons() {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouchDevice || reducedMotion || typeof gsap === "undefined") return;

    const buttons = document.querySelectorAll(".btn, .logo-mark, .menu-toggle, .header-icon-link");

    buttons.forEach((button) => {
        button.addEventListener("mousemove", (event) => {
            const rect = button.getBoundingClientRect();

            const x = event.clientX - rect.left - rect.width / 2;
            const y = event.clientY - rect.top - rect.height / 2;

            gsap.to(button, {
                x: x * 0.18,
                y: y * 0.18,
                duration: 0.35,
                ease: "power3.out"
            });
        });

        button.addEventListener("mouseleave", () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.45,
                ease: "elastic.out(1, 0.35)"
            });
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initPremiumCursor();
    initMagneticButtons();
});