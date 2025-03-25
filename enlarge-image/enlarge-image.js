let images = [];
let dialog = null;
let image = null;
let current = null;
let close_btn = null;

const show = (img) => {
  current = img;
  image.src = img;
  const hash = window.location.hash;
  if (hash == "") window.location = "#" + img;
  dialog.showModal();
  window.addEventListener("keydown", keydown);
  document.body.style.overflow = "hidden";
  close_btn.focus();
};
const close = (ev) => {
  window.removeEventListener("keydown", keydown);
  history.replaceState(null, null, " ");
  // window.location.href.split("#")[0];
  // window.location.hash = "";
  dialog.close();
  document.body.style.overflow = "";
};
const prev = (ev) => {
  console.log("prev", ev);
  let idx = images.findIndex((v) => v == current);
  console.log("found", idx);
  idx--;
  if (idx < 0) idx += images.length;
  show(images[idx]);
};

const next = (ev) => {
  console.log("next", current);
  let idx = images.findIndex((v) => v == current);
  console.log("found", idx);
  idx++;
  if (idx >= images.length) idx = 0;
  show(images[idx]);
};

const keydown = (ev) => {
  const key = ev.keyCode;
  if (key == 39) {
    next();
  }
  if (key == 37) {
    prev();
  }
  if (key == 27) {
    close();
  }
};

export default class EnlargeImage extends HTMLElement {
  static tagname = "enlarge-image";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    if (!dialog) {
      dialog = true;
      this.init_dialog();
    } else {
      this.shadowRoot.innerHTML = `<style>${styles}</style><slot></slot>`;
    }
    this.big = this.getAttribute("big");
    images.push(this.big);
  }
  connectedCallback() {
    this.image = this.querySelector("img");
    console.log("connected", this.image);
    this.image.addEventListener("click", this);
  }

  disconnectedCallback() {
    this.image.removeEventListener("click", this);
  }

  init_dialog() {
    this.shadowRoot.innerHTML = dialog_html;
    dialog = this.shadowRoot.querySelector("dialog");
    dialog.querySelector(".prev").addEventListener("click", prev);
    dialog.querySelector(".next").addEventListener("click", next);
    close_btn = dialog.querySelector(".close");
    close_btn.addEventListener("click", close);
    image = dialog.querySelector("img");
    window.addEventListener("hashchange", this);
  }

  handleEvent(ev) {
    if (ev.type == "click") {
      console.log("clicked");
      show(this.big);
    }
    if (ev.type == "hashchange") this.hashchange();
  }

  hashchange() {
    const hash = window.location.hash;
    console.log("hash change", hash);
    if (hash == "") close();
  }
}

const styles = `
  slot{
    cursor: zoom-in;
  }
  dialog{
    border:0;
    width:90vh;
    height:90vh;
  }
  main{
    display: flex;
    position: relative;
    flex-direction:column;
    width:100%;
    height:100%;
  }
  button{
    border:none;
    padding: 6px;
    border-radius: 3px;
    background:transparent;
  }
  button:hover{
    background-color: #eee;
  }
  section{
    width:100%;
    height:100%;
  }
  img{
    max-width:100%;
    max-height:100%;
    object-fit: cover;
  }
    nav{
      display:flex;
      position:absolute;
      right:0;
      gap:2rem;
    }
  ::backdrop {
    background-image: linear-gradient(
      45deg,
      magenta,
      rebeccapurple,
      dodgerblue,
      green
    );
    opacity: 0.75;
  }
 
`;
const dialog_html = `
<style>${styles}</style>
<dialog>
<main>
  <nav><button class="prev">P</button>
  <button class="next">N</button>
  <button class="close" tabindex="0">X</button></nav>
	<section><img></section>
</main>
</dialog>
<slot></slot>
`;
customElements.define(EnlargeImage.tagname, EnlargeImage);
