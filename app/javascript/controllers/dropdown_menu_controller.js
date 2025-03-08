import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="dropdown-menu"
export default class extends Controller {
  static targets = [ "button", "profileMenu" ]

  connect() {
    this.close()
    console.log("Dropdown menu connected")
  }

  toggle(){
    this.profileMenuTarget.classList.contains("hidden") ? this.open() : this.close()
  }

  hide(e) {
    const buttonClicked = this.buttonTarget.contains(e.target)
    if(!buttonClicked) {
      this.close()
    }
  }

  open() {
    this.profileMenuTarget.classList.remove("hidden")
  }

  close() {
    this.profileMenuTarget.classList.add("hidden")
  }
}
