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

// Configuração do Chartkick
// document.addEventListener("turbo:load", function() {
//   if (typeof Chartkick !== 'undefined') {
//     Chartkick.options = {
//       colors: ["#2ecc71", "#3498db", "#e74c3c", "#f1c40f", "#9b59b6"],
//       library: {
//         chart: {
//           backgroundColor: '#2c3e50',
//           style: {
//             fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
//             color: '#ecf0f1'
//           }
//         },
//         title: {
//           style: {
//             color: '#ecf0f1'
//           }
//         },
//         legend: {
//           itemStyle: {
//             color: '#ecf0f1'
//           },
//           itemHoverStyle: {
//             color: '#bdc3c7'
//           }
//         },
//         xAxis: {
//           labels: {
//             style: {
//               color: '#ecf0f1'
//             }
//           },
//           lineColor: '#7f8c8d',
//           gridLineColor: '#34495e'
//         },
//         yAxis: {
//           labels: {
//             style: {
//               color: '#ecf0f1'
//             }
//           },
//           lineColor: '#7f8c8d',
//           gridLineColor: '#34495e',
//           title: {
//             style: {
//               color: '#ecf0f1'
//             }
//           }
//         },
//         plotOptions: {
//           series: {
//             shadow: false
//           }
//         },
//         tooltip: {
//           backgroundColor: 'rgba(44, 62, 80, 0.9)',
//           style: {
//             color: '#ecf0f1'
//           }
//         }
//       }
//     };
//   }
// }); 