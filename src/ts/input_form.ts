import { render, html } from "lit-html";

class InputForm extends HTMLElement {
  static get observedAttributes() {
    return ["type", "placeholder", "value"];
  }

  type: string;
  placeholder: string;

  get value() {
    const input = this.shadowRoot.getElementById("form") as HTMLInputElement;
    return input ? input.value : "";
  }

  set value(val: string) {
    (this.shadowRoot.getElementById("form") as HTMLInputElement).value = val;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.type = "text";
    this.placeholder = "";
  }

  connectedCallback() {
    this.render();

    const input = this.shadowRoot.getElementById("form") as HTMLInputElement;
    const label = this.shadowRoot.querySelector("label");
    input.addEventListener("blur", () => {
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
      case "value":
        this.value = newValue;
    }

    this.render();
  }

  get template() {
    return html`
      <input id="form" type="${this.type}" />
      <label for="form">${this.placeholder}</label>
    `;
  }

  get css() {
    return html`
      <style>
        :host {
          --font-size: 16px;
          --padding: 8px;
          --background: #4488ff;
          --animation-speed: 0.1s;
          --color: black;
        }

        :host {
          position: relative;
          display: inline-block;
        }

        input {
          background: transparent;
          border: transparent;
          border-bottom: 1px solid #c3c3c3;
          box-sizing: border-box;
          color: var(--color);
          font-size: var(--font-size);
          height: 100%;
          outline: none;
          padding: var(--padding) 0;
          width: 100%;
        }

        label {
          position: absolute;
          top: calc(50% - var(--padding));
          left: 0;
          right: 0;
          bottom: 0;
          transition: top var(--animation-speed) ease;
          color: #c3c3c3;
        }

        input:focus + label,
        label.isVal {
          font-size: 12px;
          top: calc(-1 * var(--padding));
          color: var(--background);
        }

        label::before {
          content: "";
          display: block;
          position: absolute;
          width: 100%;
          height: 2px;
          bottom: 0px;
          background: var(--background);
          transform: scale(0, 1);
          transition: transform var(--animation-speed) ease;
        }

        input:focus + label::before {
          transform: scale(1);
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

window.customElements.define("x-input", InputForm);
