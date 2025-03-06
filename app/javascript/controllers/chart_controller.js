import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    labels: Array,
    data: Array,
    categories: Boolean
  }
  
  connect() {
    this.createChart()
  }
  
  createChart() {
    const ctx = document.getElementById('bmiChart').getContext('2d')
    
    // Definir as linhas de referência para categorias de IMC
    const bmiReferenceLines = [
      { y: 18.5, text: 'Abaixo do peso' },
      { y: 25, text: 'Sobrepeso' },
      { y: 30, text: 'Obesidade' }
    ]
    
    // Criar o gráfico usando o Chart global
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.labelsValue,
        datasets: [{
          label: 'IMC',
          data: this.dataValue,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
          tension: 0.3,
          pointBackgroundColor: function(context) {
            const value = context.dataset.data[context.dataIndex];
            if (value < 18.5) return 'rgba(54, 162, 235, 1)';      // Azul - Abaixo do peso
            else if (value < 25) return 'rgba(75, 192, 192, 1)';   // Verde - Normal
            else if (value < 30) return 'rgba(255, 206, 86, 1)';   // Amarelo - Sobrepeso
            else return 'rgba(255, 99, 132, 1)';                   // Vermelho - Obesidade
          },
          pointRadius: 6,
          pointHoverRadius: 8
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
            grid: {
              color: function(context) {
                if (context.tick.value === 18.5 || 
                    context.tick.value === 25 || 
                    context.tick.value === 30) {
                  return 'rgba(200, 200, 200, 0.8)';
                }
                return 'rgba(200, 200, 200, 0.2)';
              }
            },
            ticks: {
              callback: function(value) {
                return value;
              }
            },
            afterDraw: (axis) => {
              if (this.categoriesValue) {
                const ctx = axis.chart.ctx;
                const yAxis = axis.chart.scales.y;
                
                ctx.save();
                ctx.textAlign = 'right';
                ctx.textBaseline = 'middle';
                ctx.font = '12px Arial';
                
                // Desenhar textos para as categorias
                ctx.fillStyle = 'rgba(54, 162, 235, 0.8)';
                ctx.fillText('Abaixo do peso', yAxis.right - 10, yAxis.getPixelForValue(16));
                
                ctx.fillStyle = 'rgba(75, 192, 192, 0.8)';
                ctx.fillText('Peso normal', yAxis.right - 10, yAxis.getPixelForValue(21.5));
                
                ctx.fillStyle = 'rgba(255, 206, 86, 0.8)';
                ctx.fillText('Sobrepeso', yAxis.right - 10, yAxis.getPixelForValue(27.5));
                
                ctx.fillStyle = 'rgba(255, 99, 132, 0.8)';
                ctx.fillText('Obesidade', yAxis.right - 10, yAxis.getPixelForValue(33));
                
                ctx.restore();
              }
            }
          },
          x: {
            grid: {
              display: false
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
              label: function(context) {
                const value = context.parsed.y;
                let category = '';
                
                if (value < 18.5) category = 'Abaixo do peso';
                else if (value < 25) category = 'Peso normal';
                else if (value < 30) category = 'Sobrepeso';
                else category = 'Obesidade';
                
                return [`IMC: ${value}`, `Categoria: ${category}`];
              }
            }
          },
          annotation: {
            annotations: {
              line1: {
                type: 'line',
                yMin: 18.5,
                yMax: 18.5,
                borderColor: 'rgba(54, 162, 235, 0.5)',
                borderWidth: 2,
                borderDash: [6, 6]
              },
              line2: {
                type: 'line',
                yMin: 25,
                yMax: 25,
                borderColor: 'rgba(255, 206, 86, 0.5)',
                borderWidth: 2,
                borderDash: [6, 6]
              },
              line3: {
                type: 'line',
                yMin: 30,
                yMax: 30,
                borderColor: 'rgba(255, 99, 132, 0.5)',
                borderWidth: 2,
                borderDash: [6, 6]
              }
            }
          }
        }
      }
    })
  }
} 