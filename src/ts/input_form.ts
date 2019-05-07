import { render, html } from "lit-html";

class InputForm extends HTMLElement {
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
      <input id="form" type="${this.type}" />
      <label for="form">${this.placeholder}</label>
    `;
  }

  get css() {
    return html`
      <style>
        :host {
          position: relative;
          display: inline-block;
        }

        input {
          border: transparent;
          border-bottom: 1px solid #c3c3c3;
          box-sizing: border-box;
          font-size: 16px;
          height: 100%;
          outline: none;
          padding: 8px 0;
          width: 100%;
        }

        label {
          position: absolute;
          top: calc(50% - 8px);
          left: 0;
          right: 0;
          bottom: 0;
          transition: top 0.1s ease;
          color: #c3c3c3;
        }

        input:focus + label,
        label.isVal {
          font-size: 12px;
          top: -8px;
          color: ${this.color};
        }

        label::before {
          content: "";
          display: block;
          position: absolute;
          width: 100%;
          height: 2px;
          bottom: 0px;
          background: ${this.color};
          transform: scale(0, 1);
          transition: transform 0.1s ease;
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
