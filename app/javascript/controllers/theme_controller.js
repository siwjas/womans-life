import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="theme"
export default class extends Controller {
  static targets = ["toggle", "lightIcon", "darkIcon"]
  
  connect() {
    this.updateTheme()
    
    // Verificar se há uma preferência de tema salva
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      this.applyTheme(savedTheme)
    } else {
      // Verificar preferência do sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      this.applyTheme(prefersDark ? 'dark' : 'light')
    }
  }
  
  toggle() {
    const isDark = document.documentElement.classList.contains('dark')
    this.applyTheme(isDark ? 'light' : 'dark')
  }
  
  applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
    // Salvar preferência
    localStorage.setItem('theme', theme)
    
    // Atualizar aparência do botão
    this.updateTheme()
  }
  
  updateTheme() {
    const isDark = document.documentElement.classList.contains('dark')
    
    if (this.hasLightIconTarget && this.hasDarkIconTarget) {
      this.lightIconTarget.classList.toggle('hidden', isDark)
      this.darkIconTarget.classList.toggle('hidden', !isDark)
    }
  }
}
