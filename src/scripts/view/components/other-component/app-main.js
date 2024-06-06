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
    this.innerHTML = '';
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
    this.classList.remove(...this.classList);
    this.classList.add('hidden');
  }

  renderDefaultUI() {
    this.classList.remove(...this.classList);
    this.classList.add('flex', 'flex-col', 'flex-grow', 'mt-20');
  }

  renderDashboardUI() {
    this.classList.remove(...this.classList);
    this.classList.add('flex', 'flex-col', 'flex-grow', 'mt-[78px]', 'ml-0', 'lg:ml-[244px]', 'bg-gray-50');
  }
}
customElements.define('app-main', AppMain, { extends: 'main' });
