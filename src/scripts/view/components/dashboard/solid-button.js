class SolidButton extends HTMLElement {
  constructor() {
    super();
    this._buttonData = {
      name: this.getAttribute('name') || 'Button',
      linkTo: this.getAttribute('linkTo') || '#',
      disabled: this.hasAttribute('disabled'),
    };
  }

  static get observedAttributes() {
    return ['name', 'linkTo', 'disabled'];
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
    const disabled = this._buttonData.disabled ? 'disabled' : '';
    this.innerHTML += `
      <button class="solid-button rounded-xl px-4 py-3 text-white text-sm ${disabled ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-lime-600 hover:bg-lime-700'}" ${disabled}>
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

customElements.define('solid-button', SolidButton);
