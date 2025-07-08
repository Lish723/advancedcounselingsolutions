// 🍔 Hamburger Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mobileMenu = document.querySelector('#headerMenu');

    if (hamburgerBtn && mobileMenu) {
        // Toggle menu on hamburger button click
        hamburgerBtn.addEventListener('click', function () {
            hamburgerBtn.classList.toggle('active');
            mobileMenu.classList.toggle('show');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const hamburgerWrapper = document.querySelector('.hamburger-wrapper');
            
            if (!hamburgerWrapper.contains(event.target)) {
                mobileMenu.classList.remove('show');
                hamburgerBtn.classList.remove('active');
            }
        });
    }
});

// 📝 Enhanced Contact Form with Animation
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".contact-form");
    const successMsg = document.getElementById("form-success");
    const errorMsg = document.getElementById("form-error");

    const nameField = document.getElementById("full-name");
    const emailField = document.getElementById("email");
    const messageField = document.getElementById("message");

    const successQuotes = [
        "Your message has been sent with care 🌿",
        "We've received your note—thank you for reaching out 💌",
        "Your words matter. We'll be in touch soon 🤍",
        "Message received. You're not alone here 🌸",
        "Thank you for connecting with us 🌟",
        "Your message is important to us—we'll respond soon 💚",
        "We're here for you. Message received safely 🕊️"
    ];

    // Add typing animation to form fields
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Enhanced form submission with loading state
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Reset state
        [nameField, emailField, messageField].forEach(field => {
            field.classList.remove("error");
            field.style.transform = 'scale(1)';
        });
        successMsg.style.display = "none";
        errorMsg.style.display = "none";

        const name = nameField.value.trim();
        const email = emailField.value.trim();
        const message = messageField.value.trim();

        let hasError = false;

        // Enhanced validation with visual feedback
        if (!name) {
            nameField.classList.add("error");
            nameField.style.animation = 'shake 0.5s ease-in-out';
            hasError = true;
        }
        if (!email) {
            emailField.classList.add("error");
            emailField.style.animation = 'shake 0.5s ease-in-out';
            hasError = true;
        }
        if (!message) {
            messageField.classList.add("error");
            messageField.style.animation = 'shake 0.5s ease-in-out';
            hasError = true;
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            emailField.classList.add("error");
            emailField.style.animation = 'shake 0.5s ease-in-out';
            hasError = true;
        }

        if (hasError) {
            errorMsg.textContent = "Please fill out all required fields correctly.";
            errorMsg.style.display = "block";
            errorMsg.style.animation = 'fadeIn 0.5s ease';
            
            // Clear shake animation after it completes
            setTimeout(() => {
                [nameField, emailField, messageField].forEach(field => {
                    field.style.animation = '';
                });
            }, 500);
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        // Simulate successful "sending"
        setTimeout(() => {
            const randomQuote = successQuotes[Math.floor(Math.random() * successQuotes.length)];
            successMsg.textContent = randomQuote;
            successMsg.style.display = "block";
            successMsg.style.animation = 'slideIn 0.6s ease';
            
            // Reset form with animation
            form.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                form.reset();
                form.style.animation = 'fadeIn 0.5s ease';
                
                // Reset submit button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            }, 300);
        }, 1200);
    });
});

// 💬 Enhanced Feedback Form
document.addEventListener("DOMContentLoaded", function () {
    const feedbackForm = document.querySelector('form[name="feedback-form"]');
    const feedbackResponse = document.getElementById("feedback-response");

    if (feedbackForm) {
        const feedbackQuotes = [
            "We appreciate you taking the time 🌼",
            "Your voice helps us grow 💬",
            "Thanks for sharing your thoughts with us 🫶",
            "Your feedback matters—truly 🌟",
            "Every word helps us improve 🌱",
            "Thank you for helping us serve you better 💝",
            "Your insights are invaluable to us 🎯"
        ];

        // Add interactive feedback to rating selection
        const ratingSelect = document.getElementById('feedback-rating');
        if (ratingSelect) {
            ratingSelect.addEventListener('change', function() {
                this.style.background = getColorForRating(this.value);
                this.style.transition = 'background 0.3s ease';
            });
        }

        feedbackForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const rating = document.getElementById("feedback-rating")?.value;
            const topic = document.getElementById("feedback-topic")?.value;
            const message = document.getElementById("feedback-message")?.value.trim();

            // Basic validation
            if (!rating || !topic || !message) {
                showFeedbackError("Please complete all fields to submit feedback.");
                return;
            }

            // Show loading state
            const submitBtn = feedbackForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;

            // Simulate success with enhanced animation
            setTimeout(() => {
                const randomQuote = feedbackQuotes[Math.floor(Math.random() * feedbackQuotes.length)];
                feedbackResponse.textContent = randomQuote;
                feedbackResponse.style.display = "block";
                feedbackResponse.style.animation = 'bounceIn 0.8s ease';
                
                // Reset form
                feedbackForm.reset();
                if (ratingSelect) {
                    ratingSelect.style.background = '';
                }
                
                // Reset submit button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Hide response after 5 seconds
                setTimeout(() => {
                    feedbackResponse.style.animation = 'fadeOut 0.5s ease';
                    setTimeout(() => {
                        feedbackResponse.style.display = 'none';
                        feedbackResponse.style.animation = '';
                    }, 500);
                }, 5000);
            }, 800);
        });
    }

    function getColorForRating(rating) {
        const colors = {
            'Excellent': 'rgba(76, 175, 80, 0.1)',
            'Good': 'rgba(139, 195, 74, 0.1)',
            'Neutral': 'rgba(255, 193, 7, 0.1)',
            'Fair': 'rgba(255, 152, 0, 0.1)',
            'Poor': 'rgba(244, 67, 54, 0.1)'
        };
        return colors[rating] || '';
    }

    function showFeedbackError(message) {
        // Create temporary error message
        let errorDiv = document.getElementById('feedback-error');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.id = 'feedback-error';
            errorDiv.className = 'form-error-message';
            feedbackForm.appendChild(errorDiv);
        }
        
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        errorDiv.style.animation = 'shake 0.5s ease';
        
        // Hide error after 3 seconds
        setTimeout(() => {
            errorDiv.style.animation = 'fadeOut 0.5s ease';
            setTimeout(() => {
                errorDiv.style.display = 'none';
            }, 500);
        }, 3000);
    }
});

// 🎨 Enhanced Location Card Animations
document.addEventListener("DOMContentLoaded", function () {
    const locationCards = document.querySelectorAll('.location-card');
    
    locationCards.forEach((card, index) => {
        // Stagger animation on page load
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 * (index + 1));
        
        // Add click functionality for mobile users
        card.addEventListener('click', function() {
            // Extract phone number for quick calling
            const phoneText = this.querySelector('p').textContent;
            const phoneMatch = phoneText.match(/P: ([\d-]+)/);
            if (phoneMatch && window.innerWidth <= 768) {
                const confirmCall = confirm(`Call ${phoneMatch[1]}?`);
                if (confirmCall) {
                    window.location.href = `tel:${phoneMatch[1]}`;
                }
            }
        });
        
        // Add hover sound effect simulation
        card.addEventListener('mouseenter', function() {
            // Simulate subtle interaction feedback
            this.style.boxShadow = '0 25px 70px rgba(66, 90, 59, 0.5), 0 10px 30px rgba(0, 0, 0, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 12px 40px rgba(66, 90, 59, 0.3), 0 4px 15px rgba(0, 0, 0, 0.2)';
        });
    });
});

// 📱 Enhanced Mobile Experience
document.addEventListener("DOMContentLoaded", function () {
    // Add mobile-specific enhancements
    if (window.innerWidth <= 768) {
        // Add touch feedback for form elements
        const touchElements = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select, .submit-btn');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 100);
            });
        });
    }
});

// 🌟 Scroll Animations for Better UX
document.addEventListener("DOMContentLoaded", function () {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);
    
    // Observe form sections for scroll animations
    const animatedSections = document.querySelectorAll('.form-feedback-section, .location-strip');
    animatedSections.forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(30px)";
        section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        sectionObserver.observe(section);
    });
});

// 🎯 Add CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-10px); }
    }
    
    @keyframes slideIn {
        from { opacity: 0; transform: translateX(-20px); }
        to { opacity: 1; transform: translateX(0); }
    }
    
    @keyframes bounceIn {
        0% { opacity: 0; transform: scale(0.3); }
        50% { opacity: 1; transform: scale(1.05); }
        70% { transform: scale(0.9); }
        100% { opacity: 1; transform: scale(1); }
    }
`;
document.head.appendChild(style);
