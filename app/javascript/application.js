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

// Manipulador de erros global para depuração
window.addEventListener('error', function(event) {
  console.error('JavaScript error:', event.error);
  
  // Adicionar mais detalhes para erros de módulo
  if (event.error && event.error.message && event.error.message.includes('Failed to resolve module')) {
    console.error('Module resolution error details:', {
      message: event.error.message,
      stack: event.error.stack
    });
  }
});
