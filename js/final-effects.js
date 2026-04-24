"use strict";

/* ================= IMAGE REVEAL MASK ================= */

function initRevealMasks() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    const masks = document.querySelectorAll(".reveal-mask");
    if (!masks.length) return;

    masks.forEach((mask) => {
        gsap.to(mask, {
            scrollTrigger: {
                trigger: mask,
                start: "top 82%",
                once: true
            },
            clipPath: "inset(0 0 0% 0 round 36px)",
            duration: 1,
            ease: "power3.out"
        });
    });
}

/* ================= HORIZONTAL SHOWCASE ================= */

function initHorizontalShowcase() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    const section = document.querySelector("[data-horizontal-showcase]");
    const track = document.querySelector("[data-horizontal-track]");

    if (!section || !track) return;

    const getScrollAmount = () => {
        return -(track.scrollWidth - window.innerWidth + 40);
    };

    gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${track.scrollWidth}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true
        }
    });
}

/* ================= FINAL INIT ================= */

document.addEventListener("DOMContentLoaded", () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    initRevealMasks();
    initHorizontalShowcase();
});