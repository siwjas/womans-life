import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    // Fecha a mensagem automaticamente após 5 segundos
    setTimeout(() => {
      this.close();
    }, 5000);
  }

  close() {
    this.element.classList.add("opacity-0", "transition-opacity", "duration-300");
    setTimeout(() => {
      this.element.remove();
    }, 300); // Tempo para a animação de fade-out
  }
} 