"use strict";

function initMultiStepForms() {
    const forms = document.querySelectorAll("[data-multistep-form]");
    if (!forms.length) return;

    forms.forEach((form) => {
        const steps = Array.from(form.querySelectorAll("[data-form-step]"));
        const nextBtns = form.querySelectorAll("[data-step-next]");
        const prevBtns = form.querySelectorAll("[data-step-prev]");
        const progress = form.querySelector("[data-step-progress]");
        const message = form.querySelector("[data-form-message]");
        let currentStep = 0;
        let resetButton = null;

        const escapeName = (value) => {
            if (window.CSS && typeof window.CSS.escape === "function") {
                return window.CSS.escape(value);
            }

            return value.replace(/"/g, '\\"');
        };

        const ensureMessagePlacement = () => {
            if (!message) return;

            if (message.closest("[data-form-step]")) {
                form.appendChild(message);
            }

            message.setAttribute("role", "status");
            message.setAttribute("aria-live", "polite");
            message.setAttribute("aria-atomic", "true");
        };

        const ensureResetButton = () => {
            if (resetButton) return resetButton;

            resetButton = document.createElement("button");
            resetButton.type = "button";
            resetButton.className = "btn btn-ghost btn-full form-submit-reset";
            resetButton.textContent = "Send another request";
            resetButton.addEventListener("click", () => {
                form.classList.remove("is-submitted");
                form.reset();
                currentStep = 0;
                showStep(currentStep);

                if (message) {
                    message.classList.remove("is-success", "is-error");
                    message.textContent = "";
                }
            });

            form.appendChild(resetButton);
            return resetButton;
        };

        const showError = (text) => {
            if (!message) return;

            message.classList.remove("is-success");
            message.classList.add("is-error");
            message.textContent = text;
            message.scrollIntoView({ block: "nearest", behavior: "smooth" });
        };

        const clearMessage = () => {
            if (!message) return;
            message.classList.remove("is-success", "is-error");
            message.textContent = "";
        };

        const scrollToFirstInvalid = () => {
            const scope = steps[currentStep];
            if (!scope) return;

            const invalid = scope.querySelector(".is-invalid");
            if (!invalid) return;

            const target =
                invalid.closest(".choice-card") ||
                invalid.closest("label") ||
                invalid;

            target.scrollIntoView({ block: "center", behavior: "smooth" });
        };

        const showStep = (index) => {
            steps.forEach((step, stepIndex) => {
                step.classList.toggle("is-active", stepIndex === index);
            });

            if (progress) {
                const percent = ((index + 1) / steps.length) * 100;
                progress.style.width = `${percent}%`;
            }
        };

        const validateStep = () => {
            const currentFields = steps[currentStep].querySelectorAll("[required]");
            let valid = true;
            const processedRadioNames = new Set();

            currentFields.forEach((field) => {
                const isCheckbox = field.type === "checkbox";
                const unchecked = isCheckbox && !field.checked;
                const isRadio = field.type === "radio";
                const isEmpty = !isCheckbox && !isRadio && !field.value.trim();

                field.classList.remove("is-invalid");

                if (isRadio) {
                    if (processedRadioNames.has(field.name)) return;

                    processedRadioNames.add(field.name);
                    const name = escapeName(field.name);
                    const group = steps[currentStep].querySelectorAll(
                        `input[type="radio"][name="${name}"]`
                    );
                    const anyChecked = Array.from(group).some((radio) => radio.checked);

                    group.forEach((radio) => radio.classList.remove("is-invalid"));

                    if (!anyChecked) {
                        valid = false;
                        group.forEach((radio) => radio.classList.add("is-invalid"));
                    }

                    return;
                }

                const isBadValue =
                    isEmpty ||
                    unchecked ||
                    (field.value.trim() && typeof field.checkValidity === "function" && !field.checkValidity());

                if (isBadValue) {
                    valid = false;
                    field.classList.add("is-invalid");
                }
            });

            return valid;
        };

        nextBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                clearMessage();

                if (!validateStep()) {
                    showError("Please complete the required fields to continue.");
                    scrollToFirstInvalid();
                    return;
                }

                currentStep = Math.min(currentStep + 1, steps.length - 1);
                showStep(currentStep);
            });
        });

        prevBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                clearMessage();

                currentStep = Math.max(currentStep - 1, 0);
                showStep(currentStep);
            });
        });

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            clearMessage();

            if (!validateStep()) {
                showError("Please complete the required fields before submitting.");
                scrollToFirstInvalid();
                return;
            }

            if (message) {
                message.classList.remove("is-error");
                message.classList.add("is-success");
                message.textContent =
                    "Thanks! Your request was submitted successfully. We’ll be in touch soon.";
                message.scrollIntoView({ block: "nearest", behavior: "smooth" });
            }

            form.classList.add("is-submitted");
            ensureResetButton();
            form.reset();
        });

        ensureMessagePlacement();
        showStep(currentStep);
    });
}

document.addEventListener("DOMContentLoaded", initMultiStepForms);
