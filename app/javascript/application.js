// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "@hotwired/stimulus"
import "@hotwired/stimulus-loading"
import "controllers"
import "chartkick"
import "highcharts"

import Highcharts from "highcharts"

window.Highcharts = Highcharts


// Navbar toggle
document.addEventListener('turbo:load', function() {
  // Mobile menu
  const burger = document.querySelector('.navbar-burger');
  const menu = document.querySelector('.navbar-menu');
  
  if (burger) {
    burger.addEventListener('click', function() {
      burger.classList.toggle('is-active');
      menu.classList.toggle('is-active');
    });
  }
});

// Error reporting
window.addEventListener("error", function(event) {
  if (event.error) {
    console.error({
      message: event.error.message,
      stack: event.error.stack
    });
  }
});

// Registrar o plugin
document.addEventListener('DOMContentLoaded', function() {
  if (window.Chart && window.ChartAnnotation) {
    Chart.register(ChartAnnotation);
  }
});
