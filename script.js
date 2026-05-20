/**
 * Cathy's Cosmos Functional Layer
 * Coordinates loading closures, scroll monitoring, and mock cart behaviors.
 */

document.addEventListener("DOMContentLoaded", function () {

    // 1. PAGE LOADING CLOSE PROCEDURE
    const preloader = document.getElementById("loader");
    if (preloader) {
        window.addEventListener("load", function () {
            preloader.style.opacity = "0";
            setTimeout(() => {
                preloader.style.display = "none";
            }, 500);
        });

        // Safety verification parameters if load has initialized
        if (document.readyState === "complete") {
            setTimeout(() => {
                preloader.style.opacity = "0";
                setTimeout(() => { preloader.style.display = "none"; }, 500);
            }, 600);
        }
    }

    // 2. INTERSECTION OBSERVER CORE (Scroll Reveal Animation Sequence)
    const revealTargets = document.querySelectorAll(".reveal");
    
    const catalogObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Memory execution protection
            }
        });
    }, {
        root: null,
        threshold: 0.08, // Fire slightly before elements approach the center zone
        rootMargin: "0px 0px -50px 0px"
    });

    revealTargets.forEach(target => {
        catalogObserver.observe(target);
    });

    // 3. MOCK ECOMMERCE ADD TO CART CONVERSION ACTIONS
    const checkoutTriggers = document.querySelectorAll(".btn-add-cart, .btn-custom-dark.btn-add-cart");
    const globalCartIndicator = document.querySelector(".navbar .badge");

    checkoutTriggers.forEach(trigger => {
        trigger.addEventListener("click", function (event) {
            event.preventDefault();
            
            const originalLabel = this.innerText;
            this.disabled = true;
            this.innerText = "Formulating...";

            setTimeout(() => {
                this.innerText = "Formula Secured";
                this.style.backgroundColor = "#0F766E"; // Swaps dynamically to Muted Teal
                this.style.color = "#FFFFFF";
                this.style.borderColor = "#0F766E";

                if (globalCartIndicator) {
                    let activeCount = parseInt(globalCartIndicator.innerText);
                    globalCartIndicator.innerText = activeCount + 1;
                }

                setTimeout(() => {
                    this.disabled = false;
                    this.innerText = originalLabel;
                    this.style.backgroundColor = "";
                    this.style.color = "";
                    this.style.borderColor = "";
                }, 1400);

            }, 900);
        });
    });

    // 4. TRANSACTIONAL TELEMETRY TRANSMISSION (Newsletter Submission)
    const transmissionForm = document.getElementById("cosmosNewsletter");
    if (transmissionForm) {
        transmissionForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const emailField = this.querySelector('input[type="email"]');
            const actionButton = this.querySelector('button[type="submit"]');
            
            if (emailField.value) {
                actionButton.disabled = true;
                actionButton.innerText = "Transmitting...";

                setTimeout(() => {
                    emailField.value = "";
                    actionButton.innerText = "Channel Linked";
                    actionButton.style.backgroundColor = "#0F766E";
                    
                    setTimeout(() => {
                        actionButton.disabled = false;
                        actionButton.innerText = "Transmit";
                        actionButton.style.backgroundColor = "";
                    }, 2500);
                }, 1100);
            }
        });
    }

    // 5. MOBILE COLLAPSIBLE NAVIGATION TERMINATION
    const responsiveMenuLinks = document.querySelectorAll(".navbar-nav .nav-link");
    const collapsibleWrapper = document.getElementById("cosmosNav");
    
    if (collapsibleWrapper) {
        const structuralCollapseInstance = new bootstrap.Collapse(collapsibleWrapper, { toggle: false });
        responsiveMenuLinks.forEach(link => {
            link.addEventListener("click", () => {
                if (window.innerWidth < 992) {
                    structuralCollapseInstance.hide();
                }
            });
        });
    }
});

