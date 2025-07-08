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

// Toggle sections (accordion style) - simplified version
function toggleSection(id) {
    console.log('Toggle called for:', id); // Debug line
    
    const section = document.getElementById(id);
    if (!section) {
        console.log('Section not found:', id);
        return;
    }
    
    const isVisible = section.style.display === 'block' || section.classList.contains('show');
    
    // Close all sections first
    document.querySelectorAll('.toggle-content').forEach(el => {
        el.style.display = 'none';
        el.classList.remove('show');
    });
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Open clicked section if it wasn't already open
    if (!isVisible) {
        section.style.display = 'block';
        section.classList.add('show');
        
        // Find and activate the button
        const button = document.querySelector(`[onclick*="${id}"]`);
        if (button) {
            button.classList.add('active');
        }
    }
}