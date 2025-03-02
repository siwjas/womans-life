// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

// Navbar toggle
document.addEventListener('DOMContentLoaded', function() {
  const navbarToggle = document.querySelector('[data-collapse-toggle="navbar-default"]');
  const navbarMenu = document.getElementById('navbar-default');

  if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', function() {
      navbarMenu.classList.toggle('hidden');
    });
  }
});
