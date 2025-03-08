import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["menu"]

  connect() {
    // Fechar o dropdown quando clicar fora dele
    document.addEventListener("click", this.closeIfClickedOutside.bind(this))
  }

  disconnect() {
    document.removeEventListener("click", this.closeIfClickedOutside.bind(this))
  }

  toggle() {
    this.menuTarget.classList.toggle("hidden")
  }

  closeIfClickedOutside(event) {
    if (!this.element.contains(event.target) && !this.menuTarget.classList.contains("hidden")) {
      this.menuTarget.classList.add("hidden")
    }
  }

  close() {
    this.menuTarget.classList.add("hidden")
  }
} 