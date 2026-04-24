"use strict";



function initGsapHero() {
    if (typeof gsap === "undefined") return;

    const hero =
        document.querySelector(".hero") ||
        document.querySelector(".service-hero") ||
        document.querySelector(".services-hero") ||
        document.querySelector(".about-hero") ||
        document.querySelector(".contact-hero");

    if (!hero) return;

    const title = hero.querySelector("h1");
    const eyebrow = hero.querySelector(".eyebrow");
    const text = hero.querySelector("p:not(.eyebrow)");
    const buttons = hero.querySelectorAll(".btn");
    const image = hero.querySelector(".hero-bg img, .service-hero-bg img, .services-hero-image img, .portrait-card-main img");
    const card = hero.querySelector(".hero-info-card, .service-hero-card, .services-mini-card, .about-floating-note, .contact-form");

    const timeline = gsap.timeline({
        defaults: {
            ease: "power3.out",
            duration: 0.9
        }
    });

    if (image) {
        gsap.set(image, {
            scale: 1.08,
            filter: "brightness(0.72)"
        });
    }

    if (eyebrow) {
        gsap.set(eyebrow, {
            opacity: 0,
            y: 22
        });
    }

    if (title) {
        gsap.set(title, {
            opacity: 0,
            y: 38,
            letterSpacing: "-0.08em"
        });
    }

    if (text) {
        gsap.set(text, {
            opacity: 0,
            y: 24
        });
    }

    if (buttons.length) {
        gsap.set(buttons, {
            opacity: 0,
            y: 18
        });
    }

    if (card) {
        gsap.set(card, {
            opacity: 0,
            y: 34,
            scale: 0.96
        });
    }

    if (image) {
        timeline.to(image, {
            scale: 1,
            filter: "brightness(1)",
            duration: 1.4
        }, 0);
    }

    if (eyebrow) {
        timeline.to(eyebrow, {
            opacity: 1,
            y: 0
        }, 0.18);
    }

    if (title) {
        timeline.to(title, {
            opacity: 1,
            y: 0,
            letterSpacing: "-0.045em"
        }, 0.28);
    }

    if (text) {
        timeline.to(text, {
            opacity: 1,
            y: 0
        }, 0.44);
    }

    if (buttons.length) {
        timeline.to(buttons, {
            opacity: 1,
            y: 0,
            stagger: 0.08
        }, 0.58);
    }

    if (card) {
        timeline.to(card, {
            opacity: 1,
            y: 0,
            scale: 1
        }, 0.68);
    }
}



function initHeroMouseParallax() {
    if (typeof gsap === "undefined") return;

    const hero =
        document.querySelector(".hero") ||
        document.querySelector(".service-hero") ||
        document.querySelector(".services-hero") ||
        document.querySelector(".about-hero") ||
        document.querySelector(".contact-hero");

    if (!hero) return;

    const movingItems = hero.querySelectorAll(
        ".hero-info-card, .service-hero-card, .services-hero-panel, .about-portrait-stack, .contact-form"
    );

    if (!movingItems.length) return;

    hero.addEventListener("mousemove", (event) => {
        const rect = hero.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        movingItems.forEach((item) => {
            gsap.to(item, {
                x: x * 18,
                y: y * 18,
                rotateX: y * -2,
                rotateY: x * 2,
                duration: 0.55,
                ease: "power3.out"
            });
        });
    });

    hero.addEventListener("mouseleave", () => {
        movingItems.forEach((item) => {
            gsap.to(item, {
                x: 0,
                y: 0,
                rotateX: 0,
                rotateY: 0,
                duration: 0.7,
                ease: "power3.out"
            });
        });
    });
}



document.addEventListener("DOMContentLoaded", () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) return;

    initGsapHero();
    initHeroMouseParallax();
});