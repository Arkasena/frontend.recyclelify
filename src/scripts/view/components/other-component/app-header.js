/* eslint-disable default-case */
class AppHeader extends HTMLElement {
  constructor() {
    super();
    this._layout = null;
    this._active = null;
  }

  static get observedAttributes() {
    return ['layout', 'active'];
  }

  connectedCallback() {
    this.attributeChangedCallback();
    this.handleRender();
  }

  set layout(value) {
    this._layout = value;
  }

  get layout() {
    return this._layout;
  }

  set active(value) {
    this._active = value;
  }

  get active() {
    return this._active;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  attributeChangedCallback(name, oldvalue, newValue) {
    switch (name) {
      case 'layout':
        this.layout = newValue;
        break;
      case 'active':
        this.active = newValue;
        break;
    }
    this.handleRender();
  }

  handleRender() {
    if (this.layout === 'default') {
      this.renderDefaultUI();
    } else if (this.layout === 'dashboard') {
      this.renderDashboardUI();
    } else if (this.layout === 'nothing') {
      this.renderNothing();
    } else {
      this.renderDefaultUI();
    }
    const activeLink = document.querySelector(`ul a[href="${this.active}"]`);
    if (activeLink) {
      console.log('jalan');
      const li = activeLink.querySelector('li');
      li.classList.add('text-lime-600', 'font-bold');
      li.classList.remove('font-medium');
      const svg = activeLink.querySelector('svg');
      if (svg) {
        svg.setAttribute('stroke', '#65A30D');
      }
    }
  }

  renderNothing() {
    this.classList.add('hidden');
  }

  renderDefaultUI() {
    if (this.classList.contains('hidden')) { this.classList.remove('hidden'); }
    this.classList.add('w-full', 'bg-white', 'h-[78px]', 'flex', 'justify-center', 'shadow-sm', 'py-4', 'bg-white', 'z-50');
    this.innerHTML = `
    <div class=" w-full max-w-[1500px] flex flex-row justify-between items-center px-6">
    <a href="/"><div class="w-40 h-9 bg-slate-100"></div></a>
    <nav class="flex flex-row items-center" id="nav-bar">
    <ul class="flex flex-row gap-4" id="navigation">
    <a href="/"><li class="px-4 py-3">Home</li></a>
    <a href="#/partner"><li class="px-4 py-3">Mitra</li></a>
    <a href="#/catalog"><li class="px-4 py-3">Katalog</li></a>
    <a href=""><li class="px-4 py-3">Blog</li></a>
    <a href="#/about-us"><li class="px-4 py-3" >Tentang Kami</li></a>
    <a href="#/help"><li class="px-4 py-3">Bantuan</li></a>
    </ul>
    <div class="mr-2 w-11 h-11 bg-lime-600 flex justify-center items-center rounded-xl"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg></div>
    <div onclick="location.href='#/dashboard'" class="w-11 h-11 bg-lime-600 flex justify-center items-center rounded-xl"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg></div>
    </nav>
    </div>
    `;
  }

  renderDashboardUI() {
    if (this.classList.contains('hidden')) { this.classList.remove('hidden'); }
    this.classList.add('w-full', 'bg-white', 'h-[78px]', 'flex', 'justify-center', 'border', 'bg-white', 'border-gray-200');
    this.innerHTML = `
    <div class=" w-full flex flex-row justify-between items-center px-6">
            <div class="flex flex-row gap-16 justify-center items-center px-4">
                <a href="/"><div class="w-40 h-9 bg-slate-100"></div></a>
                <h1 class="text-2xl font-medium">Statistik</h1>
            </div>
            <nav class="flex flex-row items-center" id="nav-bar">
                <div class="flex flex-col border border-gray-200 h-full fixed bg-white top-[78px] left-0">
                    <ul class="flex flex-col gap-4 px-4" id="navigation">
                        <a class="flex flex-row pl-6 items-center gap-6 py-4" href="#/dashboard"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-home"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg><li class="px-4 py-3 font-medium text-gray-400">Dashboard</li></a>
                        <a class="flex flex-row pl-6 items-center gap-6 py-4" href="/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bar-chart-3"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg><li class="px-4 py-3 font-medium text-gray-400">Statistik</li></a>
                        <a class="flex flex-row pl-6 items-center gap-6 py-4" href="/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left-right"><path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/></svg><li class="px-4 py-3 font-medium text-gray-400">Transaksi</li></a>
                        <a class="flex flex-row pl-6 items-center gap-6 py-4" href="/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg><li class="px-4 py-3 font-medium text-gray-400">Notifikasi</li></a>
                        <a class="flex flex-row pl-6 items-center gap-6 py-4" href="/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg><li class="px-4 py-3 font-medium text-gray-400">Pengatuaran</li></a>
                        <a class="flex flex-row pl-6 items-center gap-6 py-4" href="/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg><li class="px-4 py-3 font-medium text-gray-400">Keluar</li></a>
                    </ul>
                </div>
                <div class="mr-2 w-11 h-11 bg-lime-600 flex justify-center items-center rounded-xl"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg></div>
                <div class="w-11 h-11 bg-lime-600 flex justify-center items-center rounded-xl"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg></div>
            </nav>
        </div>
    `;
  }
}
customElements.define('app-header', AppHeader, { extends: 'header' });
