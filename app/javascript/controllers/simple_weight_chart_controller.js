import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    data: Array
  }

  connect() {
    console.log("Simple weight chart controller connected")
    
    // Verificar se o elemento está visível antes de renderizar
    if (this.isVisible() && this.dataValue && this.dataValue.length > 1) {
      this.renderSimpleChart()
    }
    
    // Adicionar listener para o evento de inicialização
    this.element.addEventListener('weight-chart:initialize', this.handleInitialize.bind(this))
  }
  
  // Verificar se o elemento está visível
  isVisible() {
    return !this.element.classList.contains('hidden')
  }
  
  // Manipulador para o evento de inicialização
  handleInitialize() {
    console.log("Weight chart initialize event received")
    if (this.dataValue && this.dataValue.length > 1) {
      // Limpar o gráfico existente antes de renderizar novamente
      this.element.innerHTML = ''
      this.renderSimpleChart()
    }
  }
  
  renderSimpleChart() {
    // Limpar o conteúdo atual
    this.element.innerHTML = ''
    
    // Extrair dados
    const data = this.dataValue
    console.log("Chart data:", data) // Log para depuração
    
    // Encontrar valores mínimos e máximos para escala
    const weights = data.map(item => parseFloat(item.weight))
    const minWeight = Math.max(0, Math.floor(Math.min(...weights) * 0.95)) // 5% abaixo do mínimo
    const maxWeight = Math.ceil(Math.max(...weights) * 1.05) // 5% acima do máximo
    
    console.log("Weight range:", { minWeight, maxWeight, weights }) // Log para depuração
    
    // Criar contêiner para o gráfico
    const chartContainer = document.createElement('div')
    chartContainer.className = 'flex flex-col h-full'
    
    // Criar legenda e escala
    const header = document.createElement('div')
    header.className = 'flex justify-between text-xs text-gray-500 mb-2'
    header.innerHTML = `
      <div>
        <span class="font-medium">Peso (kg)</span>
        <span class="ml-2 text-gray-400">Min: ${minWeight} kg | Max: ${maxWeight} kg</span>
      </div>
      <span>Data</span>
    `
    
    // Criar área do gráfico com escala vertical
    const chartWrapper = document.createElement('div')
    chartWrapper.className = 'flex-1 flex'
    
    // Adicionar escala vertical (eixo Y)
    const yAxis = document.createElement('div')
    yAxis.className = 'flex flex-col justify-between mr-2 text-xs text-gray-500'
    
    // Criar marcações no eixo Y
    const steps = 5
    const stepSize = (maxWeight - minWeight) / steps
    for (let i = steps; i >= 0; i--) {
      const value = Math.round((minWeight + stepSize * i) * 10) / 10
      const yMark = document.createElement('div')
      yMark.textContent = value
      yAxis.appendChild(yMark)
    }
    
    // Criar área do gráfico - Importante: não usar items-end aqui
    const chartArea = document.createElement('div')
    chartArea.className = 'flex-1 flex relative h-full'
    chartArea.style.position = 'relative'
    
    // Adicionar linhas de grade horizontais
    for (let i = 0; i <= steps; i++) {
      const gridLine = document.createElement('div')
      gridLine.className = 'absolute w-full border-t border-gray-200 dark:border-gray-700'
      // Posicionar as linhas de grade de cima para baixo
      gridLine.style.top = `${(i / steps) * 100}%`
      chartArea.appendChild(gridLine)
    }
    
    // Determinar se estamos em tendência de aumento ou diminuição
    const firstWeight = parseFloat(data[0].weight)
    const lastWeight = parseFloat(data[data.length - 1].weight)
    const trend = lastWeight > firstWeight ? 'up' : lastWeight < firstWeight ? 'down' : 'stable'
    
    // Criar barras para cada ponto de dados
    data.forEach((item, index) => {
      // Garantir que o peso seja um número
      const weight = parseFloat(item.weight)
      
      // Calcular a posição vertical da barra (de cima para baixo)
      // Quanto maior o peso, mais próximo do topo (menor valor de top)
      const topPercentage = 100 - ((weight - minWeight) / (maxWeight - minWeight)) * 100
      
      console.log(`Bar ${index}: weight=${weight}, top=${topPercentage}%`) // Log para depuração
      
      // Determinar cor com base na tendência
      let barColor = 'bg-blue-200'
      if (index > 0) {
        const prevWeight = parseFloat(data[index - 1].weight)
        
        if (weight > prevWeight) {
          barColor = 'bg-red-200'
        } else if (weight < prevWeight) {
          barColor = 'bg-green-200'
        }
      }
      
      // Criar o contêiner da barra
      const bar = document.createElement('div')
      bar.className = 'flex-1 mx-1 flex flex-col items-center group'
      bar.style.position = 'relative'
      bar.style.height = '100%'
      
      // Criar tooltip
      const tooltip = document.createElement('div')
      tooltip.className = 'absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10'
      tooltip.style.top = `${topPercentage}%` // Posicionar o tooltip no topo da barra
      tooltip.innerHTML = `
        <div class="font-medium">${item.date}</div>
        <div>${weight} kg</div>
      `
      
      // Criar a barra
      const barElement = document.createElement('div')
      barElement.className = `absolute w-full ${barColor} hover:opacity-80 rounded-t cursor-pointer transition-all duration-200 flex flex-col items-center weight-chart-bar`
      // Posicionar a barra corretamente
      barElement.style.top = `${topPercentage}%`
      barElement.style.bottom = '0'
      
      // Adicionar indicador de tendência no topo da barra
      if (index > 0) {
        const prevWeight = parseFloat(data[index - 1].weight)
        
        if (weight > prevWeight) {
          // Adicionar seta vermelha para cima no topo da barra
          const arrow = document.createElement('div')
          arrow.className = 'absolute -top-4 w-full text-center'
          arrow.innerHTML = '<span class="text-red-500 text-xs">↑</span>'
          barElement.appendChild(arrow)
        } else if (weight < prevWeight) {
          // Adicionar seta verde para baixo no topo da barra
          const arrow = document.createElement('div')
          arrow.className = 'absolute -top-4 w-full text-center'
          arrow.innerHTML = '<span class="text-green-500 text-xs">↓</span>'
          barElement.appendChild(arrow)
        }
      }
      
      // Adicionar label de data na parte inferior
      const label = document.createElement('div')
      label.className = 'absolute bottom-0 left-0 right-0 text-center text-xs text-gray-600 mt-1 truncate'
      label.style.transform = 'translateY(100%)'
      label.style.paddingTop = '4px'
      label.textContent = item.date
      
      // Montar a barra completa
      bar.appendChild(tooltip)
      bar.appendChild(barElement)
      bar.appendChild(label)
      
      chartArea.appendChild(bar)
    })
    
    // Adicionar resumo da tendência
    const trendSummary = document.createElement('div')
    trendSummary.className = 'mt-8 text-xs text-center' // Aumentar margem superior para acomodar os rótulos de data
    
    if (trend === 'up') {
      const diff = (lastWeight - firstWeight).toFixed(1)
      const percentage = ((lastWeight - firstWeight) / firstWeight * 100).toFixed(1)
      trendSummary.innerHTML = `
        <span class="text-red-500 font-medium">Tendência: Aumento de ${diff} kg (${percentage}%)</span>
      `
    } else if (trend === 'down') {
      const diff = (firstWeight - lastWeight).toFixed(1)
      const percentage = ((firstWeight - lastWeight) / firstWeight * 100).toFixed(1)
      trendSummary.innerHTML = `
        <span class="text-green-500 font-medium">Tendência: Redução de ${diff} kg (${percentage}%)</span>
      `
    } else {
      trendSummary.innerHTML = `
        <span class="text-blue-500 font-medium">Tendência: Estável</span>
      `
    }
    
    // Montar o gráfico completo
    chartWrapper.appendChild(yAxis)
    chartWrapper.appendChild(chartArea)
    chartContainer.appendChild(header)
    chartContainer.appendChild(chartWrapper)
    chartContainer.appendChild(trendSummary)
    
    this.element.appendChild(chartContainer)
  }
  
  disconnect() {
    // Remover o listener de evento quando o controlador for desconectado
    this.element.removeEventListener('weight-chart:initialize', this.handleInitialize.bind(this))
  }
} 