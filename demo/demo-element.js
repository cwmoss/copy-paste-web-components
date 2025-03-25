export default class DemoElement extends HTMLElement {
  connectedCallback() {
    const root = this.attachShadow({ mode: "open" });
    root.innerHTML = html;
    let code_el = root.querySelector("pre");
    let code = root.querySelector("slot").assignedNodes()[0];
    console.log("code", code);
    let htmlstr = Array.prototype.reduce.call(
      root.querySelector("slot").assignedNodes(),
      function (html, node) {
        return html + (node.outerHTML || node.nodeValue);
      },
      ""
    );
    code_el.appendChild(document.createTextNode(htmlstr.trim()));
  }
}

let html = `
<style></style>
<details><summary>Show Source</summary>
<code><pre></pre></code>
</details>
<slot></slot>
`;

customElements.define("demo-element", DemoElement);
