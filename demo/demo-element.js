export default class DemoElement extends HTMLElement {
  connectedCallback() {
    const root = this.attachShadow({ mode: "open" });
    root.innerHTML = html;
    let code_el = root.querySelector("code");
    // let code = root.querySelector("slot").assignedNodes()[0];
    // console.log("code", code);
    let htmlstr = Array.prototype.reduce.call(
      root.querySelector("slot").assignedNodes(),
      function (html, node) {
        return html + (node.outerHTML || node.nodeValue);
      },
      ""
    );

    // console.log("html++", htmlstr);
    htmlstr = this.reindent(htmlstr);
    // console.log("html++", htmlstr);
    code_el.appendChild(document.createTextNode(htmlstr));
  }
  reindent(text) {
    let lines = text.split("\n");
    let start = lines.findIndex((l) => l.trim());
    let leading = lines[start].search(/\S|$/);
    // console.log("first line with content", start, leading);
    let re = new RegExp(String.raw`^\s{${leading}}`);
    lines = lines.map((l) => l.replace(re, ""));
    text = lines.join("\n").trim();
    return text;
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
