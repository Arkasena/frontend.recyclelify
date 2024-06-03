class PartnerDashboardMenuTabSetting extends HTMLElement {
  constructor() {
    super();
    this._menuTabData = [
      { name: 'Profil', linkTo: '#', status: 'Profil' },
      { name: 'Akun', linkTo: '#', status: 'Akun' },
      { name: 'Formulir Keesediaan Menerima Sampah', linkTo: '#', status: 'Formulir Kesediaan Menerima Sampah' },
    ];
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
    this.injectStyles();
    this.activateDefaultTab();
  }

  // eslint-disable-next-line class-methods-use-this
  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .tab-active {
        border-bottom-width: 4px;
        border-bottom-color: #65A30D; 
        color: #65A30D; 
      }
    `;
    document.head.appendChild(style);
  }

  setupEventListeners() {
    const tabButtons = this.querySelectorAll('.tab-btn');

    tabButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        tabButtons.forEach((btn) => btn.classList.remove('tab-active'));
        button.classList.add('tab-active');

        const { status } = this._menuTabData[index];
        this.dispatchEvent(new CustomEvent('tab-changed', {
          detail: { status },
        }));
      });
    });
  }

  activateDefaultTab() {
    const tabButtons = this.querySelectorAll('.tab-btn');
    const defaultIndex = this._menuTabData.findIndex((tab) => tab.status === 'Profil');
    if (defaultIndex !== -1) {
      tabButtons[defaultIndex].classList.add('tab-active');
      this.dispatchEvent(new CustomEvent('tab-changed', {
        detail: { status: 'Profil' },
      }));
    }
  }

  render() {
    this.innerHTML = `
      <div class="w-full p-1">
        <div class="flex flex-row justify-items-start">
          ${this._menuTabData.map((tab) => `
            <button class="tab-btn px-8 py-3 text-lg font-medium text-gray-400 hover:bg-gray-100 focus:outline-none border-transparent border-b-4 hover:text-lime-600" data-link="${tab.linkTo}">
              ${tab.name}
            </button>
          `).join('')}
        </div>
          <div class="w-full h-px bg-gray-100"></div> 
      </div>
    `;
  }
}

customElements.define('partner-dashboard-menu-tab-setting', PartnerDashboardMenuTabSetting);
