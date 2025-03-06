import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["bmiChart", "weightChart", "bmiButton", "weightButton"]
  
  showBmi() {
    this.bmiChartTarget.classList.remove("hidden")
    this.weightChartTarget.classList.add("hidden")
    this.bmiButtonTarget.classList.add("bg-green-100", "text-green-800")
    this.bmiButtonTarget.classList.remove("bg-gray-100", "text-gray-800")
    this.weightButtonTarget.classList.add("bg-gray-100", "text-gray-800")
    this.weightButtonTarget.classList.remove("bg-green-100", "text-green-800")
  }
  
  showWeight() {
    this.bmiChartTarget.classList.add("hidden")
    this.weightChartTarget.classList.remove("hidden")
    this.bmiButtonTarget.classList.remove("bg-green-100", "text-green-800")
    this.bmiButtonTarget.classList.add("bg-gray-100", "text-gray-800")
    this.weightButtonTarget.classList.add("bg-green-100", "text-green-800")
    this.weightButtonTarget.classList.remove("bg-gray-100", "text-gray-800")
  }
} 