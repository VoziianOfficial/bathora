"use strict";

/* ================= HELPERS ================= */

function getCurrentPageName() {
    return window.location.pathname.split("/").pop() || "index.html";
}

function getConfigValue(group, fallback = "") {
    if (typeof SITE_CONFIG === "undefined") return fallback;

    const currentPage = getCurrentPageName();

    return (
        SITE_CONFIG[group]?.[currentPage] ||
        SITE_CONFIG[group]?.default ||
        fallback
    );
}

/* ================= APPLY BASIC CONFIG ================= */

function applySiteContent() {
    if (typeof SITE_CONFIG === "undefined") return;

    document.querySelectorAll("[data-company-name]").forEach((el) => {
        el.textContent = SITE_CONFIG.companyName;
    });

    document.querySelectorAll("[data-phone-link]").forEach((el) => {
        el.setAttribute("href", `tel:${SITE_CONFIG.phone}`);
    });

    document.querySelectorAll("[data-phone-text]").forEach((el) => {
        el.textContent = SITE_CONFIG.phoneDisplay;
    });

    document.querySelectorAll("[data-phone-label]").forEach((el) => {
        el.textContent = SITE_CONFIG.phoneLabel;
    });

    document.querySelectorAll("[data-email-link]").forEach((el) => {
        el.setAttribute("href", `mailto:${SITE_CONFIG.email}`);
    });

    document.querySelectorAll("[data-email-text]").forEach((el) => {
        el.textContent = SITE_CONFIG.email;
    });

    document.querySelectorAll("[data-company-address]").forEach((el) => {
        el.textContent = SITE_CONFIG.address;
    });

    document.querySelectorAll("[data-company-id]").forEach((el) => {
        el.textContent = SITE_CONFIG.companyId;
    });

    document.querySelectorAll("[data-footer-text]").forEach((el) => {
        el.textContent = SITE_CONFIG.footerText;
    });

    document.querySelectorAll("[data-service-area]").forEach((el) => {
        el.textContent = SITE_CONFIG.serviceArea;
    });

    document.querySelectorAll("[data-disclaimer]").forEach((el) => {
        el.textContent = SITE_CONFIG.disclaimer;
    });

    document.querySelectorAll("[data-year]").forEach((el) => {
        el.textContent = new Date().getFullYear();
    });
}

/* ================= APPLY DYNAMIC CTA ================= */

function applyDynamicCTA() {
    const desktopCta = getConfigValue("ctaByPage", "Request Options");
    const mobileCta = getConfigValue("mobileCtaByPage", "Call Now");
    const stickyCta = getConfigValue("stickyCtaByPage", "Compare Local Providers");

    document.querySelectorAll("[data-dynamic-cta]").forEach((el) => {
        el.textContent = desktopCta;
    });

    document.querySelectorAll("[data-mobile-dynamic-cta]").forEach((el) => {
        el.textContent = mobileCta;
    });

    document.querySelectorAll("[data-sticky-dynamic-cta]").forEach((el) => {
        el.textContent = stickyCta;
    });
}

/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", () => {
    applySiteContent();
    applyDynamicCTA();
});