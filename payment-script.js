
// Hamburger Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
    const hamburgerBtn = document.querySelector(".hamburger-btn");
    const mobileMenu = document.getElementById("mobileMenu");

    // Toggle menu on hamburger button click
    hamburgerBtn.addEventListener("click", function () {
        hamburgerBtn.classList.toggle("active");
        mobileMenu.classList.toggle("visible");
    });

    // Close menu when clicking outside
    document.addEventListener("click", function(event) {
        const hamburgerWrapper = document.querySelector(".hamburger-wrapper");
        
        if (!hamburgerWrapper.contains(event.target)) {
            mobileMenu.classList.remove("visible");
            hamburgerBtn.classList.remove("active");
        }
    });
});

// Payment Form Simulation
document.addEventListener("DOMContentLoaded", function () {
const paymentForm = document.querySelector(".payment-form");

if (paymentForm) {
    paymentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const amount = document.getElementById("amount").value.trim();
    const account = document.getElementById("account").value.trim();

    if (amount === "" || account === "") {
        alert("Please fill in both fields.");
        return;
    }

      // Simulate success message
    paymentForm.innerHTML = `
        <p style="font-size: 1.2rem; text-align: center; color: #444; margin-top: 2rem;">
        ✅ Thank you! Your payment has been submitted.
        </p>
    `;
    });
}
});
