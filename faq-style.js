document.addEventListener('DOMContentLoaded', function() {
    // Find hamburger button - you need to tell me what your button looks like
    const hamburgerBtn = document.querySelector('#hamburger-btn') || 
                        document.querySelector('.hamburger-btn') || 
                        document.querySelector('.menu-toggle');
    
    const menu = document.querySelector('.hamburger-menu');
    
    if (hamburgerBtn && menu) {
        hamburgerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            menu.classList.toggle('show');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburgerBtn.contains(e.target) && !menu.contains(e.target)) {
                menu.classList.remove('show');
            }
        });
    }
});
// Toggle FAQ sections
function toggleSection(sectionId) {
    const content = document.getElementById(sectionId);
    const button = content.previousElementSibling;
    
    if (content.style.display === 'block') {
        content.style.display = 'none';
        button.classList.remove('active');
    } else {
        content.style.display = 'block';
        button.classList.add('active');
    }
}

// Search functionality for FAQs
function filterFAQs() {
    const searchTerm = document.getElementById('faqFilter').value.toLowerCase();
    const togglePairs = document.querySelectorAll('.toggle-pair');
    
    togglePairs.forEach(pair => {
        const button = pair.querySelector('.toggle-btn');
        const content = pair.querySelector('.toggle-content');
        const buttonText = button.textContent.toLowerCase();
        const contentText = content.textContent.toLowerCase();
        
        if (buttonText.includes(searchTerm) || contentText.includes(searchTerm)) {
            pair.style.display = 'block';
        } else {
            pair.style.display = 'none';
        }
    });
}
