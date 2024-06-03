class BorderedButton extends HTMLElement {
  constructor() {
    super();
    this._buttonData = {
      name: this.getAttribute('name') || 'Button',
      linkTo: this.getAttribute('linkTo') || '#',
    };
  }

  static get observedAttributes() {
    return ['name', 'linkTo'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this._buttonData[name] = newValue;
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  set buttonData(value) {
    this._buttonData = value;
    this.render();
  }

  get buttonData() {
    return this._buttonData;
  }

  _Content() {
    this.innerHTML = '';
  }

  render() {
    this._Content();
    this.innerHTML += `
      <button class="solid-button rounded-xl px-4 py-3 text-lime-600 text-xs bg-transparent border border-lime-600 hover:bg-lime-600 hover:text-white">
        ${this.buttonData.name}
      </button>
    `;

    const button = this.querySelector('button');
    if (!this._buttonData.disabled) {
      button.addEventListener('click', () => {
        if (this.buttonData.linkTo) {
          window.location.href = this.buttonData.linkTo;
        }
      });
    }
  }
}

customElements.define('bordered-button', BorderedButton);
