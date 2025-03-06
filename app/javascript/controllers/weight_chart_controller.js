import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    labels: Array,
    data: Array,
    height: Number
  }
  
  connect() {
    this.createChart()
  }
  
  createChart() {
    const ctx = document.getElementById('weightChart').getContext('2d')
    
    // Calcular peso ideal baseado na altura
    const heightInMeters = this.heightValue / 100
    const idealWeight = (22 * heightInMeters * heightInMeters).toFixed(1)
    
    // Criar o gráfico usando o Chart global
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.labelsValue,
        datasets: [{
          label: 'Peso (kg)',
          data: this.dataValue,
          backgroundColor: 'rgba(16, 185, 129, 0.2)',
          borderColor: 'rgba(16, 185, 129, 1)',
          borderWidth: 2,
          tension: 0.3,
          pointRadius: 6,
          pointHoverRadius: 8
        },
        {
          label: 'Peso Ideal',
          data: Array(this.labelsValue.length).fill(idealWeight),
          borderColor: 'rgba(107, 114, 128, 0.5)',
          borderWidth: 2,
          borderDash: [5, 5],
          pointRadius: 0,
          fill: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false,
            suggestedMin: Math.min(...this.dataValue) - 2,
            suggestedMax: Math.max(...this.dataValue) + 2,
            title: {
              display: true,
              text: 'Peso (kg)'
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              maxRotation: 45,
              minRotation: 45,
              font: {
                size: 10
              },
              callback: function(value, index, values) {
                const label = this.getLabelForValue(value);
                return label;
              }
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: 10,
            cornerRadius: 6,
            callbacks: {
              title: function(context) {
                return `Medição em: ${context[0].label}`;
              },
              label: function(context) {
                if (context.dataset.label === 'Peso Ideal') {
                  return `Peso Ideal: ${context.parsed.y} kg`;
                }
                return `Peso: ${context.parsed.y} kg`;
              },
              afterLabel: function(context) {
                return `Índice: ${context.dataIndex}`;
              }
            }
          }
        }
      }
    })

    console.log('Labels:', this.labelsValue);
    console.log('Data:', this.dataValue);
  }
} 