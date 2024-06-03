class monthDropdownMenuStatistic extends HTMLElement {
  constructor() {
    super();
    this._options = this.getAttribute('options') ? JSON.parse(this.getAttribute('options')) : ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember', 'Semua'];
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  setupEventListeners() {
    const filterButton = this.querySelector('#filterButton');
    const dropdownMenu = this.querySelector('#dropdownMenu');

    filterButton.addEventListener('click', () => {
      dropdownMenu.classList.toggle('hidden');
    });

    window.addEventListener('click', (event) => {
      if (!event.target.matches('#filterButton') && !event.target.closest('#dropdownMenu')) {
        dropdownMenu.classList.add('hidden');
      }
    });

    dropdownMenu.addEventListener('click', (event) => {
      if (event.target.tagName === 'DIV' && event.target.classList.contains('dropdown-option')) {
        const selectedOption = event.target.textContent;
        filterButton.querySelector('p').textContent = selectedOption;
        dropdownMenu.classList.add('hidden');
      }
    });
  }

  render() {
    this.innerHTML = `
      <div class="relative inline-block text-left m-4">
        <button id="filterButton" class="flex flex-row justify-center items-center w-full rounded-md shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-lime-600">
          <p>Pilih Bulan</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down pl-2"><path d="m6 9 6 6 6-6"/></svg>
        </button>
        <div id="dropdownMenu" class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none hidden">
          <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            ${this._options.map((option) => `
              <div class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dropdown-option">
                ${option}
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('month-dropdown-menu-statistic', monthDropdownMenuStatistic);
