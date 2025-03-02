import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="mobile-menu"
export default class extends Controller {
  static targets = [ "mobileMenu" ]

  connect() {
    this.close()
  }

  toggle(){
    this.mobileMenuTarget.classList.contains("opacity-0") ? this.open() : this.close()
  }

  open() {

    this.mobileMenuTarget.classList.remove("opacity-0")
    this.mobileMenuTarget.classList.remove("hidden")
  }

  close() {
    this.mobileMenuTarget.classList.add("opacity-0")
    setTimeout(() => {
      this.mobileMenuTarget.classList.add("hidden")
    },
    300)
  }
}
