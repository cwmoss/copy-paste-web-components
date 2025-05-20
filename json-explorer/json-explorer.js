let jtmpl = document.createElement("template");
jtmpl.innerHTML = /* html */ `
<style>
*,*:before, *:after{
    box-sizing:border-box;
}
:host{
    --col-bg: white;
    --j-font-size: 1rem;
    --space: 16px;
	font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 
        Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: var(--j-font-size);
    /* position:fixed;z-index:122;*/
    max-height:90vh;max-width:100vw;
    overflow-y:scroll;top:32px;left:16px;
    background-color:var(--col-bg);
    color:black;line-height:1.5;
    /* border-radius:3px; */

    --col-key: rgb( 0, 136, 204 );
    --col-val: rgb( 50, 150, 80 );
}

ul, li{
    list-style-type:none;
    margin:0;
    padding:0;
    }
details>ul{
    padding-left: var(--space);
    border-left: 1px solid transparent;
}
details>ul:hover{
    border-left:1px solid silver;
}
summary{
    cursor: pointer;
}
summary  {
 position: relative;
 /*padding-left: 2.2rem;*/
 padding-left: var(--space);
 display: block;
  list-style: none;
}

/* sigh, Safari again */

summary::-webkit-details-marker {
  display: none;
}

summary:before {
  content: '';
  border-width: 6px;
  border-style: solid;
  border-color: transparent transparent transparent #000;
  position: absolute;
  top: 4px;
  left: -2px;
  transform: rotate(0);
  transform-origin: 2px 50%;
  transition: .25s transform ease;
}
/* THE MAGIC 🧙‍♀️ */
details[open] > summary:before {
  transform: rotate(90deg);
}

details summary::marker {
  display:none;
}

details{
    color: var(--col-val)
}
details strong{
    color: var(--col-key)
}
</style>
<main>
</main>
`;

class JsonExplorer extends HTMLElement {
  _data = {};
  reflinks = false;

  static observedAttributes = ["data"];

  constructor() {
    super()
      .attachShadow({ mode: "open" })
      .appendChild(jtmpl.content.cloneNode(true));
    this.main = this.shadowRoot.querySelector("main");
    // console.log("connected late", this.innerText, this.textContent);
    if (this.textContent.trim()) {
      this.json = this.textContent;
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log("attribute changed", name, oldValue, newValue, this);
    if (name == "data") {
      this.json = newValue;
    }
  }

  set json(d) {
    this.data = JSON.parse(d);
  }

  set data(d) {
    // this.reflinks = this.getAttribute("reflinks");
    this._data = d;
    console.log("$$$ set data", this.reflinks, d);
    this.render();
  }

  get data() {
    return this._data;
  }

  path(t) {
    return t;
  }

  html_encode(input) {
    const textArea = document.createElement("textarea");
    textArea.innerText = input;
    return textArea.innerHTML.split("<br>").join("\n");
  }
  render_value(node, key, val) {
    if (this.reflinks && key == "_ref") {
      val = `<a href="/__ui/id/${encodeURIComponent(val)}">${val}</a>`;
    } else {
      if (val === null) val = "null";
      val = this.html_encode(val);
    }
    node.insertAdjacentHTML(
      "beforeend",
      `<li><strong class="k">${key}:</strong> ${val}</li>`
    );
  }
  render_array(node, key, value) {
    let li = document.createElement("li");
    let tag = document.createElement("details");
    tag.classList.add("a");
    tag.insertAdjacentHTML(
      "beforeend",
      `<summary><strong>${key}:</strong> [${value.length} items]</summary>`
    );
    let list = document.createElement("ul");
    value.forEach((val, index) => {
      if (Array.isArray(val)) {
        return this.render_array(list, index, val);
      }
      if (val == null) return this.render_value(list, index, val);
      if (typeof val === "object") {
        return this.render_object(list, index, val);
      }
      this.render_value(list, index, val);
    });
    tag.appendChild(list);
    li.appendChild(tag);
    node.appendChild(li);
  }

  render_object(node, key, o, open = false, is_root = false) {
    console.log("$$$ #obj", key, o);

    let list = document.createElement("ul");
    Object.keys(o).forEach((key) => {
      let val = o[key];
      if (val == null) return this.render_value(list, key, val);
      if (Array.isArray(val)) {
        return this.render_array(list, key, val);
      }
      if (typeof val === "object") {
        return this.render_object(list, key, val);
      }
      this.render_value(list, key, val);
    });

    if (!is_root) {
      let li = document.createElement("li");
      let tag = document.createElement("details");
      tag.classList.add("o");
      if (open) tag.setAttribute("open", "");
      tag.insertAdjacentHTML(
        "beforeend",
        `<summary><strong>${key}:</strong> {${
          Object.keys(o).length
        } keys}</summary>`
      );
      tag.appendChild(list);
      li.appendChild(tag);
      node.appendChild(li);
    } else {
      node.appendChild(list);
    }
  }

  // TODO: root is array
  render() {
    console.log("$$$ rendering", this.main.tagName, this._data);
    this.main.innerHTML = "";
    if (Array.isArray(this._data)) {
      return this.render_object(
        this.main,
        "root",
        { root: this._data },
        true,
        true
      );
    }
    this.render_object(this.main, "root", this._data, true, true);
  }
}

customElements.define("json-explorer", JsonExplorer);
