import { Controller } from "@hotwired/stimulus"
// Não importamos o Chart.js, pois ele está disponível globalmente

export default class extends Controller {
  static values = {
    labels: Array,
    data: Array,
    categories: Boolean
  }
  
  connect() {
    console.log("Chart controller connected")
    this.initializeChart()
  }
  
  initializeChart() {
    const ctx = this.element.querySelector('canvas').getContext('2d')
    
    // Definir as categorias de IMC
    const categories = [
      { min: 0, max: 18.5, color: 'rgba(59, 130, 246, 0.5)', label: 'Abaixo do peso' },
      { min: 18.5, max: 25, color: 'rgba(16, 185, 129, 0.5)', label: 'Peso normal' },
      { min: 25, max: 30, color: 'rgba(245, 158, 11, 0.5)', label: 'Sobrepeso' },
      { min: 30, max: 100, color: 'rgba(239, 68, 68, 0.5)', label: 'Obesidade' }
    ]
    
    // Criar o gráfico usando o Chart global
    new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: this.labelsValue,
        datasets: [{
          label: 'IMC',
          data: this.dataValue,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
          fill: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false,
            grid: {
              color: 'rgba(200, 200, 200, 0.2)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                const value = context.parsed.y
                let label = `IMC: ${value}`
                
                // Adicionar categoria ao tooltip
                for (const category of categories) {
                  if (value >= category.min && value < category.max) {
                    label += ` (${category.label})`
                    break
                  }
                }
                
                return label
              }
            }
          }
        }
      }
    })
  }
} 