"use strict";

/* ================= APPLY CONFIG ================= */

function applySiteContent() {
    if (typeof SITE_CONFIG === "undefined") return;

    /* COMPANY NAME */
    document.querySelectorAll("[data-company-name]").forEach(el => {
        el.textContent = SITE_CONFIG.companyName;
    });

    /* PHONE LINKS */
    document.querySelectorAll("[data-phone-link]").forEach(el => {
        el.setAttribute("href", `tel:${SITE_CONFIG.phone}`);
    });

    document.querySelectorAll("[data-phone-text]").forEach(el => {
        el.textContent = SITE_CONFIG.phoneDisplay;
    });

    document.querySelectorAll("[data-phone-label]").forEach(el => {
        el.textContent = SITE_CONFIG.phoneLabel;
    });

    /* EMAIL */
    document.querySelectorAll("[data-email-link]").forEach(el => {
        el.setAttribute("href", `mailto:${SITE_CONFIG.email}`);
    });

    document.querySelectorAll("[data-email-text]").forEach(el => {
        el.textContent = SITE_CONFIG.email;
    });

    /* ADDRESS / ID */
    document.querySelectorAll("[data-company-address]").forEach(el => {
        el.textContent = SITE_CONFIG.address;
    });

    document.querySelectorAll("[data-company-id]").forEach(el => {
        el.textContent = SITE_CONFIG.companyId;
    });

    /* FOOTER TEXT */
    document.querySelectorAll("[data-footer-text]").forEach(el => {
        el.textContent = SITE_CONFIG.footerText;
    });

    /* SERVICE AREA */
    document.querySelectorAll("[data-service-area]").forEach(el => {
        el.textContent = SITE_CONFIG.serviceArea;
    });

    /* DISCLAIMER */
    document.querySelectorAll("[data-disclaimer]").forEach(el => {
        el.textContent = SITE_CONFIG.disclaimer;
    });

    /* YEAR */
    document.querySelectorAll("[data-year]").forEach(el => {
        el.textContent = new Date().getFullYear();
    });
}

document.addEventListener("DOMContentLoaded", applySiteContent);