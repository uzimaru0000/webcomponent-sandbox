import { html, render } from "lit-html";

class Toggle extends HTMLElement {
  static get observedAttributes() {
    return ["type", "placeholder", "color"];
  }

  type: string;
  placeholder: string;
  color: string;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.type = "text";
    this.placeholder = "";
    this.color = "#4488ff";
  }

  connectedCallback() {
    this.render();

    const input = this.shadowRoot.getElementById("form") as HTMLInputElement;
    const label = this.shadowRoot.querySelector("label");
    input.addEventListener("blur", e => {
      if (input.value.length !== 0) {
        label.classList.add("isVal");
      } else {
        label.classList.remove("isVal");
      }
    });
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case "type":
        this.type = newValue;
        break;
      case "placeholder":
        this.placeholder = newValue;
        break;
      case "color":
        this.color = newValue;
    }

    this.render();
  }

  get template() {
    return html`
      <input id="form" type="checkbox" />
      <label for="form"></label>
    `;
  }

  get css() {
    return html`
      <style>
        :host {
          --anim-speed: 0.2s;
          --width: 48px;
          --height: 24px;
          --color: #4488ff;
          --back-color: #ccc;
        }

        :host {
          display: block;
          width: var(--width);
          height: var(--height);
          position: relative;
        }

        input {
          visibility: hidden;
        }

        label {
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          background: var(--back-color);
          border-radius: 10000px;
          transition: var(--anim-speed) ease;
        }

        label::before {
          content: "";
          display: block;
          position: absolute;
          width: var(--height);
          height: var(--height);
          background: #eee;
          border-radius: 50%;
          transition: var(--anim-speed) ease;
          left: 0;
          box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.1);
        }

        input:checked + label {
          background: var(--color);
        }

        input:checked + label::before {
          left: calc(100% - var(--height));
        }
      </style>
    `;
  }

  render() {
    render(
      html`
        ${this.css} ${this.template}
      `,
      this.shadowRoot
    );
  }
}

window.customElements.define("x-toggle", Toggle);
