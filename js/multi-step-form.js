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

            currentFields.forEach((field) => {
                const isCheckbox = field.type === "checkbox";
                const isEmpty = !isCheckbox && !field.value.trim();
                const unchecked = isCheckbox && !field.checked;

                field.classList.remove("is-invalid");

                if (isEmpty || unchecked) {
                    valid = false;
                    field.classList.add("is-invalid");
                }
            });

            return valid;
        };

        nextBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                if (!validateStep()) return;

                currentStep = Math.min(currentStep + 1, steps.length - 1);
                showStep(currentStep);
            });
        });

        prevBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                currentStep = Math.max(currentStep - 1, 0);
                showStep(currentStep);
            });
        });

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            if (!validateStep()) return;

            if (message) {
                message.classList.remove("is-error");
                message.classList.add("is-success");
                message.textContent =
                    "Thank you. Your request is ready for a provider-matching flow.";
            }

            form.reset();
            currentStep = 0;
            showStep(currentStep);
        });

        showStep(currentStep);
    });
}

document.addEventListener("DOMContentLoaded", initMultiStepForms);