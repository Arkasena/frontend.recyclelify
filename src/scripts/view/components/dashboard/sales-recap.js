class SalesRecap extends HTMLElement {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
    this._salesRecapData = {
      totalWeight: null,
      totalPartner: null,
      totalIncome: null,
      totalTransaction: null,
    };
  }

  connectedCallback() {
    this.render();
  }

  set salesRecapData(value) {
    this._salesRecapData = value;
    this.render();
  }

  get salesRecapData() {
    return this._salesRecapData;
  }

  _Content() {
    this.innerHTML = '';
  }

  render() {
    this._Content();
    this.innerHTML += `
      <div id="sales-recap" class="flex flex-col gap-3 w-full h-full">
        <div id="recap-container" class="grid grid-cols-2 gap-4 h-full w-full content-between justify-between">
          <div id="trash-card" class="bg-yellow-100 p-5 rounded-2xl grid grid-cols-3 justify-between w-full h-full">
            <div class="flex flex-col gap-2 col-span-2">
              <p id="total_weight" class="text-xl font-semibold break-words">${this.salesRecapData.totalWeight} kg</p>
              <p class="text-base font-normal break-words">Sampah</p>
            </div>
            <div class="bg-yellow-500 w-[45px] h-[45px] rounded-full flex items-center justify-center justify-self-end">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fefce8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash">
                <path d="M3 6h18"/>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
              </svg>
            </div>
          </div>
          <div id="income-card" class="bg-lime-100 p-5 rounded-2xl grid grid-cols-3 justify-between w-full h-full">
            <div class="flex flex-col gap-2 col-span-2">
              <p id="total_weight" class="text-xl font-semibold break-words">${this.salesRecapData.totalIncome}</p>
              <p class="text-base font-normal break-words">Rupiah</p>
            </div>
            <div class="bg-lime-500 w-[45px] h-[45px] rounded-full flex items-center justify-center justify-self-end">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F7FEE7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-banknote">
                <rect width="20" height="12" x="2" y="6" rx="2"/>
                <circle cx="12" cy="12" r="2"/>
                <path d="M6 12h.01M18 12h.01"/>
              </svg>
            </div>
          </div>
          <div id="partner-card" class="bg-orange-100 p-5 rounded-2xl grid grid-cols-3 justify-between w-full h-full">
            <div class="flex flex-col gap-2 col-span-2">
              <p id="total_weight" class="text-xl font-semibold break-words">${this.salesRecapData.totalPartner}</p>
              <p class="text-base font-normal break-words">Mitra</p>
            </div>
            <div class="bg-orange-500 w-[45px] h-[45px] rounded-full flex items-center justify-center justify-self-end">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFF7ED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users-round">
                <path d="M18 21a8 8 0 0 0-16 0"/>
                <circle cx="10" cy="8" r="5"/>
                <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"/>
              </svg>
            </div>
          </div>
          <div id="transaction-card" class="bg-sky-100 p-5 rounded-2xl grid grid-cols-3 justify-between w-full h-full">
            <div class="flex flex-col gap-2 col-span-2">
              <p id="total_weight" class="text-xl font-semibold break-words">${this.salesRecapData.totalTransaction}</p>
              <p class="text-base font-normal break-words">Transaksi</p>
            </div>
            <div class="bg-sky-500 w-[45px] h-[45px] rounded-full flex items-center justify-center justify-self-end">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F0F9FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right-left">
                <path d="m16 3 4 4-4 4"/>
                <path d="M20 7H4"/>
                <path d="m8 21-4-4 4-4"/>
                <path d="M4 17h16"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('sales-recap', SalesRecap);
