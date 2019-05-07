import { html, render } from "lit-html";

class Toggle extends HTMLElement {
  static get observedAttributes() {
    return ["checked"];
  }

  private _value: boolean;

  get value() {
    return this._value;
  }

  set value(val: boolean) {
    this._value = val;
    this.render();
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.value = false;
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "checked") {
      this._value = oldValue === null;
    }

    this.render();
  }

  get template() {
    return html`
      <input
        id="form"
        type="checkbox"
        ?checked=${this._value}
        @change="${() => this.dispatchEvent(new CustomEvent("change"))}"
      />
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
