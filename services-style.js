// Toggle hamburger menu
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

// Toggle FAQ sections (accordion style)
function toggleSection(id) {
    const section = document.getElementById(id);
    const button = section.previousElementSibling;
    const isVisible = section.style.display === 'block';

    // Close all sections first
    document.querySelectorAll('.toggle-content').forEach(el => {
        el.style.display = 'none';
    });
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Open clicked section if it wasn't already open
    if (!isVisible) {
        section.style.display = 'block';
        button.classList.add('active');
    }
}
