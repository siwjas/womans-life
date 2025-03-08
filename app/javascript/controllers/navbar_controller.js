import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["mobileMenu", "dropdown"]

  toggleMobileMenu() {
    this.mobileMenuTarget.classList.toggle("hidden")
  }

  toggleDropdown(event) {
    const dropdownId = event.currentTarget.getAttribute("data-dropdown-id")
    const dropdown = this.dropdownTargets.find(el => el.id === dropdownId)
    
    // Fechar outros dropdowns
    this.dropdownTargets.forEach(el => {
      if (el.id !== dropdownId) {
        el.classList.add("hidden")
      }
    })
    
    // Alternar o dropdown atual
    dropdown.classList.toggle("hidden")
  }

  closeDropdowns(event) {
    if (!this.element.contains(event.target)) {
      this.dropdownTargets.forEach(el => {
        el.classList.add("hidden")
      })
    }
  }

  connect() {
    document.addEventListener("click", this.closeDropdowns.bind(this))
  }

  disconnect() {
    document.removeEventListener("click", this.closeDropdowns.bind(this))
  }
} 