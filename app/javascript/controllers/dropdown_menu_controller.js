import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="dropdown-menu"
export default class extends Controller {
  static targets = [ "button", "profileMenu" ]

  connect() {
    this.close()
  }

  toggle(){
    this.profileMenuTarget.classList.contains("invisible") ? this.open() : this.close()
  }

  hide(e) {
    const buttonClicked = this.buttonTarget.contains(e.target)
    if(!buttonClicked) {
      this.close()
    }
  }

  open() {
    this.profileMenuTarget.classList.remove("invisible")
    this.profileMenuTarget.classList.remove("opacity-0")
  }

  close() {
    this.profileMenuTarget.classList.add("opacity-0")
    setTimeout(() => {
      this.profileMenuTarget.classList.add("invisible")
    }, 300); // Tempo para a animação de fade-out
  }
}
