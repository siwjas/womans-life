import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["Mbmenu"]

  connect() {
    // Fechar o dropdown quando clicar fora dele
    document.addEventListener("click", this.closeIfClickedOutside.bind(this))
    console.log("Dropdown controller connected")
  }

  disconnect() {
    document.removeEventListener("click", this.closeIfClickedOutside.bind(this))
  }

  toggle() {
    this.MbmenuTarget.classList.toggle("hidden")
  }

  closeIfClickedOutside(event) {
    if (!this.element.contains(event.target) && !this.MbmenuTarget.classList.contains("hidden")) {
      this.MbmenuTarget.classList.add("hidden")
    }
  }

  close() {
    this.MbmenuTarget.classList.add("hidden")
  }
} 