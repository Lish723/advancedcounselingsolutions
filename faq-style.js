// Toggle hamburger menu function
function toggleMenu() {
    const menu = document.getElementById('headerMenu');
    menu.classList.toggle('show');
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const menu = document.getElementById('headerMenu');
    const hamburger = document.querySelector('.hamburger-btn');
    
    if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
        menu.classList.remove('show');
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