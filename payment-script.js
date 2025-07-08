// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Find the hamburger button (you may need to adjust the selector)
    const hamburgerButton = document.querySelector('.hamburger-button') || 
                           document.querySelector('.menu-toggle') || 
                           document.querySelector('#hamburger-btn');
    
    // Find the menu (adjust selector if needed)
    const menu = document.querySelector('#headerMenu') || 
                 document.querySelector('#mobileMenu') || 
                 document.querySelector('.hamburger-menu');
    
    if (hamburgerButton && menu) {
        hamburgerButton.addEventListener('click', function() {
            // Toggle the menu visibility
            menu.classList.toggle('show');
            menu.classList.toggle('active');
            
            // Optional: Toggle hamburger button animation
            hamburgerButton.classList.toggle('active');
        });
    }
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
