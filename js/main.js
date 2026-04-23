"use strict";

/* ================= ICONS ================= */

function initIcons() {
    if (window.lucide) {
        lucide.createIcons();
    }
}

/* ================= HEADER SCROLL ================= */

function initStickyHeader() {
    const header = document.querySelector("[data-header]");
    if (!header) return;

    const toggleHeaderState = () => {
        header.classList.toggle("is-scrolled", window.scrollY > 20);
    };

    toggleHeaderState();
    window.addEventListener("scroll", toggleHeaderState, { passive: true });
}

/* ================= MENU ================= */

function initMenu() {
    const openBtn = document.querySelector("[data-menu-open]");
    const closeBtn = document.querySelector("[data-menu-close]");
    const panel = document.querySelector("[data-menu-panel]");
    const menuLinks = document.querySelectorAll(".menu-panel a");

    if (!openBtn || !closeBtn || !panel) return;

    const openMenu = () => {
        panel.classList.add("is-open");
        panel.setAttribute("aria-hidden", "false");
        openBtn.setAttribute("aria-expanded", "true");
        document.body.classList.add("menu-open");
    };

    const closeMenu = () => {
        panel.classList.remove("is-open");
        panel.setAttribute("aria-hidden", "true");
        openBtn.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
    };

    openBtn.addEventListener("click", openMenu);
    closeBtn.addEventListener("click", closeMenu);

    panel.addEventListener("click", (event) => {
        if (event.target === panel) closeMenu();
    });

    menuLinks.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && panel.classList.contains("is-open")) {
            closeMenu();
        }
    });
}

/* ================= COOKIE BANNER ================= */

function initCookieBanner() {
    const banner = document.querySelector("[data-cookie-banner]");
    const acceptBtn = document.querySelector("[data-cookie-accept]");
    const declineBtn = document.querySelector("[data-cookie-decline]");

    if (!banner || !acceptBtn || !declineBtn) return;

    const cookieChoice = localStorage.getItem("bathoraCookieChoice");

    if (cookieChoice === "accepted" || cookieChoice === "declined") {
        banner.classList.add("is-hidden");
        return;
    }

    const saveChoice = (choice) => {
        localStorage.setItem("bathoraCookieChoice", choice);
        banner.classList.add("is-hidden");
    };

    acceptBtn.addEventListener("click", () => saveChoice("accepted"));
    declineBtn.addEventListener("click", () => saveChoice("declined"));
}

/* ================= FORM VALIDATION ================= */

function initForms() {
    const forms = document.querySelectorAll("[data-quote-form]");

    if (!forms.length) return;

    forms.forEach((form) => {
        const message = form.querySelector("[data-form-message]");

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const requiredFields = form.querySelectorAll("[required]");
            let isValid = true;

            requiredFields.forEach((field) => {
                const isCheckbox = field.type === "checkbox";
                const emptyField = !isCheckbox && !field.value.trim();
                const uncheckedBox = isCheckbox && !field.checked;

                field.classList.remove("is-invalid");

                if (emptyField || uncheckedBox) {
                    isValid = false;
                    field.classList.add("is-invalid");
                }
            });

            if (!message) return;

            message.classList.remove("is-success", "is-error");

            if (!isValid) {
                message.textContent = "Please complete the required fields before submitting.";
                message.classList.add("is-error");
                return;
            }

            message.textContent =
                "Thank you. Your request was prepared successfully. A matching flow can be connected here.";
            message.classList.add("is-success");

            form.reset();
        });
    });
}

/* ================= SEARCH ================= */

function initHeaderSearch() {
    const searchInput = document.querySelector(".header-search input");

    if (!searchInput) return;

    const servicePages = [
        {
            keywords: ["remodel", "remodeling", "renovation", "bathroom"],
            url: "bathroom-remodeling.html"
        },
        {
            keywords: ["bathtub", "tub", "replacement"],
            url: "bathtub-replacement.html"
        },
        {
            keywords: ["shower", "walk in shower", "installation"],
            url: "shower-installation.html"
        },
        {
            keywords: ["vanity", "sink", "cabinet"],
            url: "vanity-installation.html"
        },
        {
            keywords: ["tile", "floor", "flooring"],
            url: "tile-and-flooring.html"
        },
        {
            keywords: ["repair", "fix", "leak"],
            url: "bathroom-repair.html"
        }
    ];

    searchInput.addEventListener("keydown", (event) => {
        if (event.key !== "Enter") return;

        const value = searchInput.value.trim().toLowerCase();
        if (!value) return;

        const match = servicePages.find((page) =>
            page.keywords.some((keyword) => value.includes(keyword))
        );

        window.location.href = match ? match.url : "services.html";
    });
}

/* ================= DETAILS UX ================= */

function initFaqDetails() {
    const faqLists = document.querySelectorAll(".faq-list");

    faqLists.forEach((list) => {
        const details = list.querySelectorAll("details");

        details.forEach((item) => {
            item.addEventListener("toggle", () => {
                if (!item.open) return;

                details.forEach((other) => {
                    if (other !== item) {
                        other.removeAttribute("open");
                    }
                });
            });
        });
    });
}

/* ================= SMART STICKY CTA ================= */

function initSmartStickyCTA() {
    const stickyCta = document.querySelector("[data-smart-sticky-cta]");
    const hero = document.querySelector(".hero, .service-hero, .services-hero, .about-hero, .contact-hero, .legal-hero");

    if (!stickyCta) return;

    const toggleStickyCTA = () => {
        const triggerPoint = hero ? hero.offsetHeight * 0.65 : 420;
        const shouldShow = window.scrollY > triggerPoint;

        stickyCta.classList.toggle("is-visible", shouldShow);
    };

    toggleStickyCTA();
    window.addEventListener("scroll", toggleStickyCTA, { passive: true });
}

/* ================= CTA RIPPLE ================= */

function initCTARipple() {
    const buttons = document.querySelectorAll(".btn-gold");

    buttons.forEach((button) => {
        button.addEventListener("pointerdown", (event) => {
            const rect = button.getBoundingClientRect();
            const ripple = document.createElement("span");

            ripple.className = "btn-ripple";
            ripple.style.left = `${event.clientX - rect.left}px`;
            ripple.style.top = `${event.clientY - rect.top}px`;

            button.appendChild(ripple);

            window.setTimeout(() => {
                ripple.remove();
            }, 650);
        });
    });
}

/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", () => {
    initIcons();
    initStickyHeader();
    initMenu();
    initCookieBanner();
    initForms();
    initHeaderSearch();
    initFaqDetails();
    initSmartStickyCTA();
    initCTARipple();
});