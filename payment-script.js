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
const form = document.querySelector("form");

if (form) {
    form.addEventListener("submit", function (e) {
    e.preventDefault(); // This stops the page jump

    const amount = document.getElementById("amount").value.trim();
    const account = document.getElementById("account").value.trim();

    if (amount === "" || account === "") {
        alert("Please fill in both fields.");
        return;
    }
   // Simulate success message
   form.innerHTML = `
       <div style="text-align: center; padding: 2rem;">
                    <h2 style="color: green;">✅ Payment Successful!</h2>
                    <p>Thank you! Your payment has been processed.</p>
                    <p style="font-size: 0.9rem; color: #666;">(This is a simulation)</p>
                </div>
    `;
    });
}
});
