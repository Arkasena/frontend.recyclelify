/* eslint-disable default-case */

import Cookies from '../../../utils/cookies.';

/* eslint-disable class-methods-use-this */
class AppHeader extends HTMLElement {
  constructor() {
    super();
    this._layout = null;
    this._active = null;
    this._userType = null;
  }

  static get observedAttributes() {
    return ['layout', 'active'];
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

  set userType(value) {
    this._userType = value;
  }

  get userType() {
    return this._userType;
  }

  set active(value) {
    this._active = value;
  }

  get active() {
    return this._active;
  }

  _emptyContent() {
    this.innerHTML = '';
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
      this.menuButtonOnclickFunction();
      this.logoutButtonOnclickFunction();
    } else if (this.layout === 'dashboard') {
      this.renderDashboardUI();
      this.menuButtonOnclickDashboardFunction();
      this.logoutButtonOnclickFunction();
    } else if (this.layout === 'nothing') {
      this.renderNothing();
    } else {
      this.renderDefaultUI();
      this.menuButtonOnclickFunction();
      this.logoutButtonOnclickFunction();
    }
    const activeLink = document.querySelector(`ul a[href="${this.active}"]`);
    if (activeLink) {
      const li = activeLink.querySelector('li');
      li.classList.add('text-lime-600', 'font-bold');
      li.classList.remove('font-medium');
      const svg = activeLink.querySelector('svg');
      if (svg) {
        svg.setAttribute('stroke', '#65A30D');
      }
      const h1Container = document.querySelector('#pageHeader');
      if (h1Container) {
        h1Container.innerHTML = activeLink.textContent;
      }
    }
    this.personButtonOnclickFunction();
  }

  logoutButtonOnclickFunction() {
    document.querySelector('#logout').addEventListener('click', () => {
      Cookies.deleteCookie('authToken');
      window.location.href = `${window.location.origin}/`;
    });
  }

  personButtonOnclickFunction() {
    document.querySelector('#personButton').addEventListener('mouseenter', () => {
      const dropdown = document.querySelector('#personButtonContent');
      if (dropdown.classList.contains('hidden')) {
        dropdown.classList.remove('hidden');
        dropdown.classList.add('flex');
      } else {
        dropdown.classList.remove('flex');
        dropdown.classList.add('hidden');
      }
    });
    document.querySelector('main').addEventListener('mouseenter', () => {
      const dropdown = document.querySelector('#personButtonContent');
      dropdown.classList.remove('flex');
      dropdown.classList.add('hidden');
    });
  }

  menuButtonOnclickFunction() {
    const button = document.querySelector('#menuButton');
    button.addEventListener('click', () => {
      const drawer = document.querySelector('#menuOption');
      if (drawer.classList.contains('left-0')) {
        drawer.classList.remove('left-0');
        drawer.classList.add('left-[-320px]');
      } else {
        drawer.classList.remove('left-[-320px]');
        drawer.classList.add('left-0');
      }
    });
    const main = document.querySelector('main');
    main.addEventListener('click', () => {
      const drawer = document.querySelector('#menuOption');
      drawer.classList.remove('left-0');
      drawer.classList.add('left-[-320px]');
    });
  }

  menuButtonOnclickDashboardFunction() {
    const button = document.querySelector('#menuButton');
    const main = document.querySelector('main');
    button.addEventListener('click', () => {
      const drawer = document.querySelector('#menuOption');
      if (drawer.classList.contains('left-0')) {
        drawer.classList.remove('left-0');
        drawer.classList.add('left-[-245px]');
      } else {
        drawer.classList.remove('left-[-245px]');
        drawer.classList.add('left-0');
      }
    });
    main.addEventListener('click', () => {
      const drawer = document.querySelector('#menuOption');
      if (drawer.classList.contains('left-0')) {
        drawer.classList.remove('left-0');
        drawer.classList.add('left-[-245px]');
      }
    });
  }

  renderNothing() {
    this.classList.add('hidden');
  }

  renderDefaultUI() {
    this._emptyContent();
    this.classList.remove(...this.classList);
    if (this.classList.contains('hidden')) { this.classList.remove('hidden'); }
    this.classList.add('w-full', 'bg-white', 'h-[78px]', 'flex', 'justify-center', 'border-gray-200', 'border', 'py-4', 'bg-white', 'z-40', 'fixed');
    this.innerHTML = `
    <div class=" w-full max-w-[1500px] flex flex-row justify-between items-center px-6 relative">
            <div class="flex flex-row gap-3 justify-center items-center">
                <button id="menuButton" class="justify-center items-center flex lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#52525b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                </button>
                <a href="/" class="flex justify-center items-center"><div class="w-40 h-9 bg-slate-100"></div></a>
            </div>
            <nav class="flex flex-row items-center" id="nav-bar">
            <div id="menuOption" class="h-full ease-0 duration-300 top-[77px] left-[-320px] fixed border bg-white border-gray-200 lg:h-auto lg:border-none lg:top-auto lg:left-auto lg:relative lg:bg-transparent lg:flex">
                    <ul class="flex h-screen flex-col lg:flex-row gap-4 lg:h-auto" id="navigation">
                        <a class="pr-20 lg:pr-0 py-3 lg:py-0" href="/"><li class="px-8 lg:px-4 py-3">Beranda</li></a>
                        <a class="pr-20 lg:pr-0 py-3 lg:py-0" href="#/find-partner"><li class="px-8 lg:px-4 py-3">Mitra</li></a>
                        <a  class="pr-20 lg:pr-0 py-3 lg:py-0" href="#/catalog"><li class="px-8 lg:px-4 py-3">Katalog</li></a>
                        <a class="pr-20 lg:pr-0 py-3 lg:py-0" href=""><li class="px-8 lg:px-4 py-3">Blog</li></a>
                        <a class="pr-20 lg:pr-0 py-3 lg:py-0" href="#/about-us"><li class="px-8 lg:px-4 py-3" >Tentang Kami</li></a>
                        <a class="pr-20 lg:pr-0 py-3 lg:py-0"href="#/help"><li class="px-8 lg:px-4 py-3">Bantuan</li></a>
                    </ul>
                </div>  
                <div class="mr-2 w-11 h-11 bg-lime-600 flex justify-center items-center rounded-xl"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg></div>
                <button id="personButton" class="w-11 h-11 bg-lime-600 flex justify-center items-center rounded-xl"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg></button>
                <div id="personButtonContent" class="flex-col border shadow-md bg-white border-gray-200 rounded-lg py-2 w-[168px] absolute right-4 top-14 hidden">
                    <a href="#/collaborator/dashboard" class="p-3">DashBoard</a>
                    <a href="#/my-profile" class="p-3">Profil Saya</a>
                    <button id="logout" class="p-3 text-left">Keluar</button>
                </div>
            </nav>
        </div>
    `;
  }

  renderDashboardUI() {
    if (this.userType === 'collaborator') {
      this.renderDashboardUICollaborator();
    } else if (this.userType === 'partner') {
      this.renderDashboardUIPartner();
    }
  }

  renderDashboardUIPartner() {
    this._emptyContent();
    this.classList.remove(...this.classList);
    if (this.classList.contains('hidden')) { this.classList.remove('hidden'); }
    this.classList.add('flex-col', 'bg-white', 'h-[78px]', 'flex', 'justify-center', 'border', 'bg-white', 'border-gray-200', 'fixed', 'w-screen');
    this.innerHTML = `
    <div class="w-full flex flex-row justify-between items-center px-6">
            <div class="flex flex-row gap-16 justify-center items-center px-4">
            <div class="flex flex-row gap-3 justify-center items-center">
            <button id="menuButton" class="justify-center items-center flex lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#52525b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </button>
            <a href="/" class="flex justify-center items-center"><div class="w-40 h-9 bg-slate-100"></div></a>
        </div>
                <h1 class="text-2xl font-medium hidden sm:block" id="pageHeader"></h1>
            </div>
            <nav class="flex flex-row items-center" id="nav-bar">
                <div id="menuOption" class="flex ease-0 duration-300 flex-col border border-gray-200 h-full fixed bg-white top-[78px] w-[244px] left-[-245px] lg:left-0">
                    <ul class="flex flex-col gap-4 px-4" id="navigation">
                        <a class="flex flex-row pl-6 items-center gap-6 py-4" href="#/${this.userType}/dashboard"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-home"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg><li class="px-4 py-3 font-medium text-gray-400">Dashboard</li></a>
                        <a class="flex flex-row pl-6 items-center gap-6 py-4" href="#/${this.userType}/dashboard/statistic"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bar-chart-3"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg><li class="px-4 py-3 font-medium text-gray-400">Statistik</li></a>
                        <a class="flex flex-row pl-6 items-center gap-6 py-4" href="#/${this.userType}/dashboard/selling-transaction"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-right"><path d="M18 8L22 12L18 16"/><path d="M2 12H22"/></svg><li class="px-4 py-3 font-medium text-gray-400">Penjualan</li></a>
                        <a class="flex flex-row pl-6 items-center gap-6 py-4" href="#/${this.userType}/dashboard/buying-transaction"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-left"><path d="M6 8L2 12L6 16"/><path d="M2 12H22"/></svg><li class="px-4 py-3 font-medium text-gray-400">Pembelian</li></a>
                        <a class="flex flex-row pl-6 items-center gap-6 py-4" href="#/${this.userType}/dashboard/notification"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg><li class="px-4 py-3 font-medium text-gray-400">Notifikasi</li></a>
                        <a class="flex flex-row pl-6 items-center gap-6 py-4" href="#/${this.userType}/dashboard/settings"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg><li class="px-4 py-3 font-medium text-gray-400">Pengaturan</li></a>
                        <a class="flex flex-row pl-6 items-center gap-6 py-4" href="/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg><li class="px-4 py-3 font-medium text-gray-400">Keluar</li></a>
                    </ul>
                </div>
                <div class="mr-2 w-11 h-11 bg-lime-600 flex justify-center items-center rounded-xl"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg></div>
                <button id="personButton" class="w-11 h-11 bg-lime-600 flex justify-center items-center rounded-xl"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg></button>
                <div id="personButtonContent" class="flex-col border shadow-md bg-white border-gray-200 rounded-lg py-2 w-[168px] absolute right-4 top-16 hidden">
                    <a href="#/partner/dashboard" class="p-3">DashBoard</a>
                    <a href="#/my-profile" class="p-3">Profil Saya</a>
                    <a href="" class="p-3">Keluar</a>
                </div>
            </nav>
        </div>
    `;
  }

  renderDashboardUICollaborator() {
    this._emptyContent();
    this.classList.remove(...this.classList);
    if (this.classList.contains('hidden')) { this.classList.remove('hidden'); }
    this.classList.add('flex-col', 'bg-white', 'h-[78px]', 'flex', 'justify-center', 'border', 'bg-white', 'border-gray-200', 'fixed', 'w-screen');
    this.innerHTML = `
    <div class="w-full flex flex-row justify-between items-center px-6">
            <div class="flex flex-row gap-16 justify-center items-center px-4">
            <div class="flex flex-row gap-3 justify-center items-center">
            <button id="menuButton" class="justify-center items-center flex lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#52525b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </button>
            <a href="/" class="flex justify-center items-center"><div class="w-40 h-9 bg-slate-100"></div></a>
        </div>
                <h1 class="text-2xl font-medium hidden sm:block"  id="pageHeader"></h1>
            </div>
            <nav class="flex flex-row items-center" id="nav-bar">
            <div id="menuOption" class="flex ease-0 duration-300 flex-col border border-gray-200 h-full fixed bg-white top-[78px] w-[244px] left-[-245px] lg:left-0">
                    <ul class="flex flex-col gap-4 px-4" id="navigation">
                        <a class="flex flex-row pl-6 items-center gap-6 py-4" href="#/${this.userType}/dashboard"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-home"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg><li class="px-4 py-3 font-medium text-gray-400">Dashboard</li></a>
                        <a class="flex flex-row pl-6 items-center gap-6 py-4" href="#/${this.userType}/dashboard/statistic"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bar-chart-3"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg><li class="px-4 py-3 font-medium text-gray-400">Statistik</li></a>
                        <a class="flex flex-row pl-6 items-center gap-6 py-4" href="#/${this.userType}/dashboard/transaction"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left-right"><path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/></svg><li class="px-4 py-3 font-medium text-gray-400">Transaksi</li></a>
                        <a class="flex flex-row pl-6 items-center gap-6 py-4" href="#/${this.userType}/dashboard/notification"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg><li class="px-4 py-3 font-medium text-gray-400">Notifikasi</li></a>
                        <a class="flex flex-row pl-6 items-center gap-6 py-4" href="#/${this.userType}/dashboard/settings"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg><li class="px-4 py-3 font-medium text-gray-400">Pengaturan</li></a>
                        <a class="flex flex-row pl-6 items-center gap-6 py-4" href="/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg><li class="px-4 py-3 font-medium text-gray-400">Keluar</li></a>
                    </ul>
                </div>
                <div class="mr-2 w-11 h-11 bg-lime-600 flex justify-center items-center rounded-xl"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg></div>
                <button id="personButton" class="w-11 h-11 bg-lime-600 flex justify-center items-center rounded-xl"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg></button>
                <div id="personButtonContent" class="flex-col border shadow-md bg-white border-gray-200 rounded-lg py-2 w-[168px] absolute right-4 top-16 hidden">
                    <a href="#/partner/dashboard" class="p-3">DashBoard</a>
                    <a href="#/my-profile" class="p-3">Profil Saya</a>
                    <a href="" class="p-3">Keluar</a>
                </div>
            </nav>
        </div>
    `;
  }
}
customElements.define('app-header', AppHeader, { extends: 'header' });
