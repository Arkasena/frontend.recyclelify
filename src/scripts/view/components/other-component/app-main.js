/* eslint-disable default-case */
class AppMain extends HTMLElement {
  static get observedAttributes() {
    return ['layout'];
  }

  constructor() {
    super();
    this._layout = 'default';
  }

  connectedCallback() {
    this.handleRender();
  }

  set layout(value) {
    this._layout = value;
  }

  get layout() {
    return this._layout;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  attributeChangedCallback(name, oldvalue, newValue) {
    switch (name) {
      case 'layout':
        this.layout = newValue;
        break;
    }
    this.handleRender();
  }

  handleRender() {
    if (this.layout === 'default') {
      this.renderDefaultUI();
    } else if (this.layout === 'dashboard') {
      this.renderDashboardUI();
    } else {
      this.renderDefaultUI();
    }
  }

  renderNothing() {
    this.classList.add('hidden');
  }

  renderDefaultUI() {
    this.classList.add('flex', 'flex-col', 'flex-grow', 'mt-20');
  }

  renderDashboardUI() {
    this.classList.add('flex', 'flex-col', 'flex-grow', 'mt-20', 'ml-[244px]', 'bg-gray-50');
  }
}
customElements.define('app-main', AppMain, { extends: 'main' });