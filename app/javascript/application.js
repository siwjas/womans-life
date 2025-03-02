// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

// Navbar toggle
document.addEventListener('DOMContentLoaded', function() {
  const navbarToggle = document.querySelector('[data-collapse-toggle="menu-mobile"]');
  const navbarMenu = document.getElementById('menu-mobile');

  if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', () => {
      navbarMenu.classList.toggle('hidden');
    });
  }
});
