import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="theme"
export default class extends Controller {
  static targets = ["lightIcon", "darkIcon"]
  
  connect() {
    console.log("Theme controller connected")
    // Aplicar tema com base no localStorage ou preferência do sistema
    document.documentElement.classList.toggle(
      "dark",
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
    this.updateIcons();
  }
  
  toggle() {
    const isDark = document.documentElement.classList.contains('dark')
    this.applyTheme(isDark ? 'light' : 'dark')
  }
  
  applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      console.log("Dark theme applied")
    } else {
      document.documentElement.classList.remove('dark')
      console.log("Light theme applied")
    }
    
    // Salvar preferência
    localStorage.setItem('theme', theme)
    
    // Atualizar aparência do botão
    this.updateIcons()
  }
  
  updateIcons() {
    const isDark = document.documentElement.classList.contains('dark')
    this.lightIconTarget.classList.toggle('hidden', isDark)
    this.darkIconTarget.classList.toggle('hidden', !isDark)
  }
}
