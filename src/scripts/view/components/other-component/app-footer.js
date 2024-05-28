/* eslint-disable default-case */
class AppFooter extends HTMLElement {
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

  attributeChangedCallback(name, newValue) {
    switch (name) {
      case 'layout':
        this.layout = newValue;
        console.log(newValue);
        break;
    }
    this.handleRender();
  }

  handleRender() {
    console.log(this.layout);
    switch (this.layout) {
      case 'dashboard':
        this.renderDashboardUI();
        break;
      default:
        this.renderDefaultUI();
        break;
    }
  }

  renderDefaultUI() {
    this.classList.add('w-full', 'flex', 'justify-center', 'items-center', 'border-t', 'border-gray-300');
    this.innerHTML = `
    <div class="py-6 w-full max-w-[1500px] flex flex-row items-center justify-between px-6">
    <div class="w-40 h-9 bg-slate-100">
    </div>
    <p class="text-gray-300 text-lg">Copyright © 2024 Recyclelify | All Rights Reserved</p>
    <div class="flex flex-row gap-4">
        <a class="w-8 h-8 bg-gray-300 flex items-center justify-center rounded-md"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
        <a class="w-8 h-8 bg-gray-300 flex items-center justify-center rounded-md"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg></a>
        <a class="w-8 h-8 bg-gray-300 flex items-center justify-center rounded-md"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg></a>
        <a class="w-8 h-8 bg-gray-300 flex items-center justify-center rounded-md"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg></a>
        <a class="w-8 h-8 bg-gray-300 flex items-center justify-center rounded-md"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-youtube"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg></a>
    </div>
</div>
      `;
  }

  renderDashboardUI() {
    this.innerHTML = 'knskdfk';
  }
}
customElements.define('app-footer', AppFooter, { extends: 'footer' });
