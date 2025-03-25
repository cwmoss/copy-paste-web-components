export default class HelloWorld extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" }).innerHTML =
      "hello <em><slot>friends</slot></em>";
  }
}

customElements.define("hello-world", HelloWorld);
