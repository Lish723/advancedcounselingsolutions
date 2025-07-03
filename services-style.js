// 🌿 Toggle Section Visibility (accordion style)
function toggleSection(id) {
const section = document.getElementById(id);
const isVisible = section.style.display === 'block';

  // Hide all toggle-content areas
document.querySelectorAll('.toggle-content').forEach(el => {
    el.style.display = 'none';
});

  // Show the clicked section if it wasn’t already open
if (!isVisible) {
    section.style.display = 'block';
}
}

// 🍃 Toggle Hamburger Menu Visibility
function toggleMenu() {
const menu = document.getElementById("headerMenu");
menu.style.display = menu.style.display === "block" ? "none" : "block";
}
