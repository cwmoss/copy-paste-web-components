export default class Hello extends HTMLElement {
  connectedCallback() {
    this.innerHTML = "hi friends";
  }
}

customElements.define("hello-world", Hello);
