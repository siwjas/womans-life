import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="mobile-menu"
export default class extends Controller {
  static targets = [ "mobileMenu", "btnOpen", "btnClose" ]

  connect() {
    this.close()
  }

  toggle(){
    this.mobileMenuTarget.classList.contains("opacity-0") ? this.open() : this.close()
  }

  open() {
    this.btnOpenTarget.classList.remove("block")
    this.btnOpenTarget.classList.add("hidden")

    this.btnCloseTarget.classList.remove("hidden")
    this.btnCloseTarget.classList.add("block")

    this.mobileMenuTarget.classList.remove("opacity-0")
    this.mobileMenuTarget.classList.remove("hidden")
  }

  close() {
    this.btnCloseTarget.classList.remove("block")
    this.btnCloseTarget.classList.add("hidden")

    this.btnOpenTarget.classList.remove("hidden")
    this.btnOpenTarget.classList.add("block")

    this.mobileMenuTarget.classList.add("opacity-0")
    setTimeout(() => {
      this.mobileMenuTarget.classList.add("hidden")
    },
    300)
  }
}
