import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["bmiButton", "weightButton", "bmiChart", "weightChart"]
  
  connect() {
    console.log("Chart toggle controller connected")
    // Inicialmente mostrar o gráfico de IMC
    this.showBmi()
  }
  
  showBmi() {
    console.log("Showing BMI chart")
    // Atualizar estilos dos botões
    this.bmiButtonTarget.classList.add("bg-green-100", "text-green-800")
    this.bmiButtonTarget.classList.remove("bg-gray-100", "text-gray-800")
    
    this.weightButtonTarget.classList.add("bg-gray-100", "text-gray-800")
    this.weightButtonTarget.classList.remove("bg-green-100", "text-green-800")
    
    // Mostrar/ocultar gráficos
    this.bmiChartTarget.classList.remove("hidden")
    this.weightChartTarget.classList.add("hidden")
  }
  
  showWeight() {
    console.log("Showing Weight chart")
    // Atualizar estilos dos botões
    this.weightButtonTarget.classList.add("bg-green-100", "text-green-800")
    this.weightButtonTarget.classList.remove("bg-gray-100", "text-gray-800")
    
    this.bmiButtonTarget.classList.add("bg-gray-100", "text-gray-800")
    this.bmiButtonTarget.classList.remove("bg-green-100", "text-green-800")
    
    // Mostrar/ocultar gráficos
    this.weightChartTarget.classList.remove("hidden")
    this.bmiChartTarget.classList.add("hidden")
  }
} 