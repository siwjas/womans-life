import { Controller } from "@hotwired/stimulus"

// Não importamos o Chart.js, pois ele está disponível globalmente

export default class extends Controller {
  static values = {
    labels: Array,
    data: Array,
    height: Number
  }
  
  connect() {
    console.log("Weight chart controller connected")
    if (this.dataValue.length > 1) {
      this.initializeChart()
    }
  }
  
  initializeChart() {
    const ctx = this.element.querySelector('canvas').getContext('2d')
    
    // Calcular IMC ideal mínimo e máximo (18.5 e 24.9)
    const heightInMeters = this.heightValue / 100
    const minIdealWeight = (18.5 * heightInMeters * heightInMeters).toFixed(1)
    const maxIdealWeight = (24.9 * heightInMeters * heightInMeters).toFixed(1)
    
    // Criar o gráfico usando o Chart global
    new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: this.labelsValue,
        datasets: [
          {
            label: 'Peso (kg)',
            data: this.dataValue,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            tension: 0.1,
            fill: false
          },
          {
            label: 'Peso Mínimo Ideal',
            data: Array(this.labelsValue.length).fill(minIdealWeight),
            borderColor: 'rgba(16, 185, 129, 0.5)',
            borderDash: [5, 5],
            borderWidth: 2,
            pointRadius: 0,
            fill: false
          },
          {
            label: 'Peso Máximo Ideal',
            data: Array(this.labelsValue.length).fill(maxIdealWeight),
            borderColor: 'rgba(16, 185, 129, 0.5)',
            borderDash: [5, 5],
            borderWidth: 2,
            pointRadius: 0,
            fill: '+1'
          }
        ]
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
                const datasetLabel = context.dataset.label || ''
                const value = context.parsed.y
                return `${datasetLabel}: ${value} kg`
              }
            }
          }
        }
      }
    })
  }

  get data() {
    // Supondo que você tenha um array de objetos com data e peso/IMC
    return [
      { name: "Peso", data: this.weightData },
      { name: "IMC", data: this.bmiData }
    ]
  }

  get weightData() {
    // Exemplo de dados: [{x: Date.parse("2023-10-01"), y: 70}, ...]
    return JSON.parse(this.element.dataset.weightData).map(entry => ({
      x: Date.parse(entry.date),
      y: entry.weight
    }))
  }

  get bmiData() {
    // Exemplo de dados: [{x: Date.parse("2023-10-01"), y: 22}, ...]
    return JSON.parse(this.element.dataset.bmiData).map(entry => ({
      x: Date.parse(entry.date),
      y: entry.bmi
    }))
  }
} 