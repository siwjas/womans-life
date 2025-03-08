import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["weightChart", "bmiChart", "weightButton", "bmiButton"]

  connect() {
    // Inicializar com o gráfico de peso visível
    this.showWeightChart()
  }

  showWeightChart() {
    this.weightChartTarget.classList.remove("hidden")
    this.bmiChartTarget.classList.add("hidden")
    
    // Atualizar classes dos botões
    this.weightButtonTarget.classList.remove("bg-gray-200", "text-gray-700")
    this.weightButtonTarget.classList.add("bg-blue-600", "text-white")
    
    this.bmiButtonTarget.classList.remove("bg-blue-600", "text-white")
    this.bmiButtonTarget.classList.add("bg-gray-200", "text-gray-700")
  }

  showBmiChart() {
    this.weightChartTarget.classList.add("hidden")
    this.bmiChartTarget.classList.remove("hidden")
    
    // Atualizar classes dos botões
    this.bmiButtonTarget.classList.remove("bg-gray-200", "text-gray-700")
    this.bmiButtonTarget.classList.add("bg-blue-600", "text-white")
    
    this.weightButtonTarget.classList.remove("bg-blue-600", "text-white")
    this.weightButtonTarget.classList.add("bg-gray-200", "text-gray-700")
  }
} 