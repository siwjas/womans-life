import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="chart-theme"
export default class extends Controller {
  static targets = ["chart"]
  
  connect() {
    console.log("Chart theme controller connected")
    this.updateChartTheme()
    
    // Observar mudanças no tema
    this.observer = new MutationObserver(this.handleThemeChange.bind(this))
    this.observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
  }
  
  disconnect() {
    if (this.observer) {
      this.observer.disconnect()
    }
  }
  
  handleThemeChange(mutations) {
    mutations.forEach(mutation => {
      if (mutation.attributeName === 'class') {
        this.updateChartTheme()
      }
    })
  }
  
  updateChartTheme() {
    const isDarkMode = document.documentElement.classList.contains('dark')
    
    // Configurações de cores para tema claro e escuro
    const theme = {
      light: {
        backgroundColor: '#ffffff',
        gridColor: 'rgba(200, 200, 200, 0.2)',
        textColor: '#374151',
        plotBandColor: 'rgba(16, 185, 129, 0.1)',
        chartBackground: '#ffffff'
      },
      dark: {
        backgroundColor: '#1f2937',
        gridColor: 'rgba(100, 100, 100, 0.2)',
        textColor: '#e5e7eb',
        plotBandColor: 'rgba(16, 185, 129, 0.2)',
        chartBackground: '#1f2937'
      }
    }
    
    // Selecionar o tema atual
    const currentTheme = isDarkMode ? theme.dark : theme.light
    
    // Atualizar todos os gráficos Highcharts na página
    document.querySelectorAll('[data-chartkick-chart-id]').forEach(chartElement => {
      const chartId = chartElement.getAttribute('data-chartkick-chart-id')
      const chart = Chartkick.charts[chartId]
      
      if (chart && chart.getChartObject) {
        const highchart = chart.getChartObject()
        
        if (highchart) {
          // Atualizar o fundo do gráfico
          highchart.update({
            chart: {
              backgroundColor: currentTheme.backgroundColor
            },
            title: {
              style: {
                color: currentTheme.textColor
              }
            },
            xAxis: {
              labels: {
                style: {
                  color: currentTheme.textColor
                }
              },
              gridLineColor: currentTheme.gridColor,
              title: {
                style: {
                  color: currentTheme.textColor
                }
              }
            },
            yAxis: {
              labels: {
                style: {
                  color: currentTheme.textColor
                }
              },
              gridLineColor: currentTheme.gridColor,
              title: {
                style: {
                  color: currentTheme.textColor
                }
              }
            },
            tooltip: {
              backgroundColor: currentTheme.backgroundColor,
              style: {
                color: currentTheme.textColor
              }
            },
            legend: {
              itemStyle: {
                color: currentTheme.textColor
              }
            }
          }, true)
        }
      }
    })
  }
} 