import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["calendar"]
  static values = {
    date: String,
    type: String
  }

  connect() {
    console.log("Simple calendar controller connected")
    this.highlightToday()
  }

  highlightToday() {
    // Encontrar o dia atual no calendário e destacá-lo
    const today = new Date()
    const todayString = this.formatDate(today) // Formato YYYY-MM-DD
    console.log("Today is:", todayString)
    
    const dayElements = this.element.querySelectorAll('.calendar-day')
    
    dayElements.forEach(dayEl => {
      const dateAttr = dayEl.getAttribute('data-date')
      
      if (dateAttr) {
        // Comparar as strings de data diretamente para evitar problemas de fuso horário
        if (dateAttr === todayString) {
          console.log("Highlighting day:", dateAttr)
          dayEl.classList.add('ring-2', 'ring-blue-500', 'dark:bg-blue-500', 'dark:text-white', 'dark:ring-lime-400')
        } else {
          dayEl.classList.remove('ring-2', 'ring-blue-500')
        }
      }
    })
  }
  
  // Formatar data como YYYY-MM-DD para comparação consistente
  formatDate(date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
} 