/*
https://web.dev/patterns/theming/theme-switch?hl=de#js
https://github.com/imfing/hextra/blob/main/layouts/partials/head.html#L43
https://dev.to/whitep4nth3r/the-best-lightdark-mode-theme-toggle-in-javascript-368f
*/
// document.documentElement.classList.add("dark");
const defaultTheme = "system";

const setDarkTheme = () => {
  document.documentElement.classList.add("dark");
  document.documentElement.style.colorScheme = "dark";
};
const setLightTheme = () => {
  document.documentElement.classList.remove("dark");
  document.documentElement.style.colorScheme = "light";
};

if ("color-theme" in localStorage) {
  localStorage.getItem("color-theme") === "dark"
    ? setDarkTheme()
    : setLightTheme();
} else {
  defaultTheme === "dark" ? setDarkTheme() : setLightTheme();
  if (defaultTheme === "system") {
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? setDarkTheme()
      : setLightTheme();
  }
}

let tmpl = document.createElement("template");
// https://stackoverflow.com/questions/56992820/any-way-to-keep-a-custom-elemnts-template-markup-and-style-outside-of-a-javascr
tmpl.innerHTML = /* html */ `
<style>
:where(button){--ease-1:cubic-bezier(.25,0,.5,1);--ease-2:cubic-bezier(.25,0,.4,1);--ease-3:cubic-bezier(.25,0,.3,1);--ease-4:cubic-bezier(.25,0,.2,1);--ease-5:cubic-bezier(.25,0,.1,1);--ease-in-1:cubic-bezier(.25,0,1,1);--ease-in-2:cubic-bezier(.50,0,1,1);--ease-in-3:cubic-bezier(.70,0,1,1);--ease-in-4:cubic-bezier(.90,0,1,1);--ease-in-5:cubic-bezier(1,0,1,1);--ease-out-1:cubic-bezier(0,0,.75,1);--ease-out-2:cubic-bezier(0,0,.50,1);--ease-out-3:cubic-bezier(0,0,.3,1);--ease-out-4:cubic-bezier(0,0,.1,1);--ease-out-5:cubic-bezier(0,0,0,1);--ease-in-out-1:cubic-bezier(.1,0,.9,1);--ease-in-out-2:cubic-bezier(.3,0,.7,1);--ease-in-out-3:cubic-bezier(.5,0,.5,1);--ease-in-out-4:cubic-bezier(.7,0,.3,1);--ease-in-out-5:cubic-bezier(.9,0,.1,1);--ease-elastic-out-1:cubic-bezier(.5,.75,.75,1.25);--ease-elastic-out-2:cubic-bezier(.5,1,.75,1.25);--ease-elastic-out-3:cubic-bezier(.5,1.25,.75,1.25);--ease-elastic-out-4:cubic-bezier(.5,1.5,.75,1.25);--ease-elastic-out-5:cubic-bezier(.5,1.75,.75,1.25);--ease-elastic-in-1:cubic-bezier(.5,-0.25,.75,1);--ease-elastic-in-2:cubic-bezier(.5,-0.50,.75,1);--ease-elastic-in-3:cubic-bezier(.5,-0.75,.75,1);--ease-elastic-in-4:cubic-bezier(.5,-1.00,.75,1);--ease-elastic-in-5:cubic-bezier(.5,-1.25,.75,1);--ease-elastic-in-out-1:cubic-bezier(.5,-.1,.1,1.5);--ease-elastic-in-out-2:cubic-bezier(.5,-.3,.1,1.5);--ease-elastic-in-out-3:cubic-bezier(.5,-.5,.1,1.5);--ease-elastic-in-out-4:cubic-bezier(.5,-.7,.1,1.5);--ease-elastic-in-out-5:cubic-bezier(.5,-.9,.1,1.5);--ease-step-1:steps(2);--ease-step-2:steps(3);--ease-step-3:steps(4);--ease-step-4:steps(7);--ease-step-5:steps(10);--ease-elastic-1:var(--ease-elastic-out-1);--ease-elastic-2:var(--ease-elastic-out-2);--ease-elastic-3:var(--ease-elastic-out-3);--ease-elastic-4:var(--ease-elastic-out-4);--ease-elastic-5:var(--ease-elastic-out-5);--ease-squish-1:var(--ease-elastic-in-out-1);--ease-squish-2:var(--ease-elastic-in-out-2);--ease-squish-3:var(--ease-elastic-in-out-3);--ease-squish-4:var(--ease-elastic-in-out-4);--ease-squish-5:var(--ease-elastic-in-out-5);--ease-spring-1:linear(0,0.006,0.025 2.8%,0.101 6.1%,0.539 18.9%,0.721 25.3%,0.849 31.5%,0.937 38.1%,0.968 41.8%,0.991 45.7%,1.006 50.1%,1.015 55%,1.017 63.9%,1.001);--ease-spring-2:linear(0,0.007,0.029 2.2%,0.118 4.7%,0.625 14.4%,0.826 19%,0.902,0.962,1.008 26.1%,1.041 28.7%,1.064 32.1%,1.07 36%,1.061 40.5%,1.015 53.4%,0.999 61.6%,0.995 71.2%,1);--ease-spring-3:linear(0,0.009,0.035 2.1%,0.141 4.4%,0.723 12.9%,0.938 16.7%,1.017,1.077,1.121,1.149 24.3%,1.159,1.163,1.161,1.154 29.9%,1.129 32.8%,1.051 39.6%,1.017 43.1%,0.991,0.977 51%,0.974 53.8%,0.975 57.1%,0.997 69.8%,1.003 76.9%,1);--ease-spring-4:linear(0,0.009,0.037 1.7%,0.153 3.6%,0.776 10.3%,1.001,1.142 16%,1.185,1.209 19%,1.215 19.9% 20.8%,1.199,1.165 25%,1.056 30.3%,1.008 33%,0.973,0.955 39.2%,0.953 41.1%,0.957 43.3%,0.998 53.3%,1.009 59.1% 63.7%,0.998 78.9%,1);--ease-spring-5:linear(0,0.01,0.04 1.6%,0.161 3.3%,0.816 9.4%,1.046,1.189 14.4%,1.231,1.254 17%,1.259,1.257 18.6%,1.236,1.194 22.3%,1.057 27%,0.999 29.4%,0.955 32.1%,0.942,0.935 34.9%,0.933,0.939 38.4%,1 47.3%,1.011,1.017 52.6%,1.016 56.4%,1 65.2%,0.996 70.2%,1.001 87.2%,1);--ease-bounce-1:linear(0,0.004,0.016,0.035,0.063,0.098,0.141,0.191,0.25,0.316,0.391 36.8%,0.563,0.766,1 58.8%,0.946,0.908 69.1%,0.895,0.885,0.879,0.878,0.879,0.885,0.895,0.908 89.7%,0.946,1);--ease-bounce-2:linear(0,0.004,0.016,0.035,0.063,0.098,0.141 15.1%,0.25,0.391,0.562,0.765,1,0.892 45.2%,0.849,0.815,0.788,0.769,0.757,0.753,0.757,0.769,0.788,0.815,0.85,0.892 75.2%,1 80.2%,0.973,0.954,0.943,0.939,0.943,0.954,0.973,1);--ease-bounce-3:linear(0,0.004,0.016,0.035,0.062,0.098,0.141 11.4%,0.25,0.39,0.562,0.764,1 30.3%,0.847 34.8%,0.787,0.737,0.699,0.672,0.655,0.65,0.656,0.672,0.699,0.738,0.787,0.847 61.7%,1 66.2%,0.946,0.908,0.885 74.2%,0.879,0.878,0.879,0.885 79.5%,0.908,0.946,1 87.4%,0.981,0.968,0.96,0.957,0.96,0.968,0.981,1);--ease-bounce-4:linear(0,0.004,0.016 3%,0.062,0.141,0.25,0.391,0.562 18.2%,1 24.3%,0.81,0.676 32.3%,0.629,0.595,0.575,0.568,0.575,0.595,0.629,0.676 48.2%,0.811,1 56.2%,0.918,0.86,0.825,0.814,0.825,0.86,0.918,1 77.2%,0.94 80.6%,0.925,0.92,0.925,0.94 87.5%,1 90.9%,0.974,0.965,0.974,1);--ease-bounce-5:linear(0,0.004,0.016 2.5%,0.063,0.141,0.25 10.1%,0.562,1 20.2%,0.783,0.627,0.534 30.9%,0.511,0.503,0.511,0.534 38%,0.627,0.782,1 48.7%,0.892,0.815,0.769 56.3%,0.757,0.753,0.757,0.769 61.3%,0.815,0.892,1 68.8%,0.908 72.4%,0.885,0.878,0.885,0.908 79.4%,1 83%,0.954 85.5%,0.943,0.939,0.943,0.954 90.5%,1 93%,0.977,0.97,0.977,1)}

:host{
  --icon-fill: light-dark(var(--text, black), var(--text, white));
  --icon-fill-hover: light-dark(var(--text-10, #868e96), var(--text-10, #dee2e6));
}

button{
    border:0;
    background-color:transparent;
}

.sun-and-moon > :is(.moon, .sun, .sun-beams) {
  transform-origin: center;
}

.sun-and-moon > :is(.moon, .sun) {
  fill: var(--icon-fill);
}

.theme-toggle:is(:hover, :focus-visible) > .sun-and-moon > :is(.moon, .sun) {
  fill: var(--icon-fill-hover);
}

.sun-and-moon > .sun-beams {
  stroke: var(--icon-fill);
  stroke-width: 2px;
}

.theme-toggle:is(:hover, :focus-visible) .sun-and-moon > .sun-beams {
  stroke: var(--icon-fill-hover);
}

[data-theme="dark"] .sun-and-moon > .sun {
  transform: scale(1.75);
}

[data-theme="dark"] .sun-and-moon > .sun-beams {
  opacity: 0;
}

[data-theme="dark"] .sun-and-moon > .moon > circle {
  transform: translateX(-7px);
}

@supports (cx: 1) {
  [data-theme="dark"] .sun-and-moon > .moon > circle {
    cx: 17;
    transform: translateX(0);
  }
}

@media (prefers-reduced-motion: no-preference) {
  .sun-and-moon > .sun {
    transition: transform .5s var(--ease-elastic-3);
  }

  .sun-and-moon > .sun-beams {
    transition: transform .5s var(--ease-elastic-4), opacity .5s var(--ease-3);
  }

  .sun-and-moon .moon > circle {
    transition: transform .25s var(--ease-out-5);
  }

  @supports (cx: 1) {
    .sun-and-moon .moon > circle {
      transition: cx .25s var(--ease-out-5);
    }
  }

  [data-theme="dark"] .sun-and-moon > .sun {
    transition-timing-function: var(--ease-3);
    transition-duration: .25s;
    transform: scale(1.75);
  }

  [data-theme="dark"] .sun-and-moon > .sun-beams {
    transition-duration: .15s;
    transform: rotateZ(-25deg);
  }

  [data-theme="dark"] .sun-and-moon > .moon > circle {
    transition-duration: .5s;
    transition-delay: .25s;
  }
}
</style>
<button class="theme-toggle" id="theme-toggle" title="Toggles light & dark" aria-label="auto" aria-live="polite">
  <svg class="sun-and-moon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
    <mask class="moon" id="moon-mask">
      <rect x="0" y="0" width="100%" height="100%" fill="white" />
      <circle cx="24" cy="10" r="6" fill="black" />
    </mask>
    <circle class="sun" cx="12" cy="12" r="6" mask="url(#moon-mask)" fill="currentColor" />
    <g class="sun-beams" stroke="currentColor">
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
     </g>
  </svg>
</button>
`;
export default class ToggleTheme extends HTMLElement {
  constructor() {
    super()
      .attachShadow({ mode: "open" })
      .appendChild(tmpl.content.cloneNode(true));
    this.shadowRoot.querySelector("button").dataset.theme =
      document.documentElement.style.colorScheme;
    this.switch = this.shadowRoot.querySelectorAll("button").forEach((el) => {
      el.addEventListener("click", this);
    });
  }

  handleEvent(e) {
    if (document.documentElement.classList.contains("dark")) {
      setLightTheme();
      localStorage.setItem("color-theme", "light");
    } else {
      setDarkTheme();
      localStorage.setItem("color-theme", "dark");
    }
    this.shadowRoot.querySelector("button").dataset.theme =
      document.documentElement.style.colorScheme;
  }
}

customElements.define("toggle-theme", ToggleTheme);

/*

// Listen for system theme changes
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (defaultTheme === "system" && !("color-theme" in localStorage)) {
      e.matches ? setDarkTheme() : setLightTheme();
      themeToggleButtons.forEach((el) =>
        el.dataset.theme = document.documentElement.classList.contains("dark") ? "dark" : "light"
      );
    }
  });
  
*/
