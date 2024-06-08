class SolidButton extends HTMLElement {
  constructor() {
    super();
    this._buttonData = {
      name: this.getAttribute('name') || 'Button',
      linkTo: this.getAttribute('linkTo') || '#',
      disabled: this.hasAttribute('disabled'),
      width: this.getAttribute('width') || 'auto',
    };
  }

  static get observedAttributes() {
    return ['name', 'linkTo', 'disabled', 'width'];
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
    const {
      disabled,
      width,
      name,
      linkTo,
    } = this._buttonData;

    const disabledClass = disabled ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-lime-600 hover:bg-lime-700';

    this.innerHTML += `
      <button class="solid-button rounded-xl px-4 py-3 text-white text-sm ${disabledClass}" ${disabled ? 'disabled' : ''} style="width: ${width};">
        ${name}
      </button>
    `;

    const button = this.querySelector('button');
    if (!disabled) {
      button.addEventListener('click', () => {
        if (linkTo) {
          window.location.href = linkTo;
        }
      });
    }
  }
}

customElements.define('solid-button', SolidButton);
