/* eslint-disable default-case */
class AppHeader extends HTMLElement {
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
    this.classList.add('w-full', 'bg-white', 'h-[78px]', 'flex', 'justify-center', 'shadow-sm', 'py-4');
    this.innerHTML = `
    <div class=" w-full max-w-[1500px] flex flex-row justify-between items-center px-6">
    <div class="w-40 h-9 bg-slate-100">
    </div>
    <nav class="flex flex-row items-center" id="nav-bar">
        <ul class="flex flex-row gap-4" id="navigation">
            <a href="#/partner"><li class="px-4 py-3">Mitra</li></a>
            <a href="#/catalog"><li class="px-4 py-3">Katalog</li></a>
            <a href=""><li class="px-4 py-3">Blog</li></a>
            <a href=""><li class="px-4 py-3" >Tentang Kami</li></a>
            <a href=""><li class="px-4 py-3">Bantuan</li></a>
        </ul>
        <div class="mr-2 w-11 h-11 bg-lime-600 flex justify-center items-center rounded-xl"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg></div>
        <div class="w-11 h-11 bg-lime-600 flex justify-center items-center rounded-xl"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg></div>
    </nav>
</div>
    `;
  }

  renderDashboardUI() {
    this.innerHTML = 'knskdfk';
  }
}
customElements.define('app-header', AppHeader, { extends: 'header' });
