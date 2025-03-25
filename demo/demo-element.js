export default class DemoElement extends HTMLElement {
  connectedCallback() {
    const root = this.attachShadow({ mode: "open" });
    root.innerHTML = html;
    let code_el = root.querySelector("code");
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
<style>
:host{
display:block;
}
pre {
  background: #f5f2f0;
  padding: 1rem;
}
  details{
  margin-bottom:1rem;
  }
</style>
<details><summary>Show Source</summary>
<pre><code></code></pre>
</details>
<slot></slot>
`;

customElements.define("demo-element", DemoElement);
