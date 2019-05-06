import { render, html } from "lit-html";

class Ripple extends HTMLElement {
  static get observedAttributes() {
    return ["size", "color"];
  }

  private size: number;
  private color: string;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.size = 150;
    this.color = "gray";
  }
  connectedCallback() {
    this.render();
    this.parentElement.style.position = "relative";
    this.addEventListener("mousedown", e => {
      const x = e.offsetX;
      const y = e.offsetY;

      const effect = this.shadowRoot.getElementById("effect");
      effect.style.left = `${x - this.size / 2}px`;
      effect.style.top = `${y - this.size / 2}px`;
      effect.addEventListener("animationend", () => {
        effect.classList.remove("is-show");
      });

      if (!effect.classList.contains("is-show")) {
        effect.classList.add("is-show");
      }
    });
  }
  attributeChangedCallback(name: string, oldVal: string, newVal: string) {
    switch (name) {
      case "color":
        this.color = newVal;
        break;
      case "size":
        this.size = Number(newVal);
        break;
    }
    this.render();
  }

  get template() {
    return html`
      ${this.css}
      <slot></slot>
      <span id="effect"></span>
    `;
  }

  get css() {
    return html`
      <style>
        :host {
          display: block;
          overflow: hidden;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        span {
          width: ${this.size}px;
          height: ${this.size}px;
          position: absolute;
          background: ${this.color};
          border-radius: 50%;
          opacity: 0;
        }

        span.is-show {
          animation: ripple 0.75s ease-out;
        }

        @keyframes ripple {
          from {
            opacity: 0.5;
          }

          to {
            opacity: 0;
            transform: scale(2);
          }
        }
      </style>
    `;
  }

  render() {
    render(this.template, this.shadowRoot);
  }
}

window.customElements.define("ripple-effect", Ripple);
