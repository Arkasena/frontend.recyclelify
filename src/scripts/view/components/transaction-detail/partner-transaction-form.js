class PartnerTransactionForm extends HTMLElement {
  constructor() {
    super();
    this._transactionData = [];
  }

  connectedCallback() {
    this.render();
  }

  set transactionData(value) {
    this._transactionData = value;
    this.render();
  }

  get transactionData() {
    return this._transactionData;
  }

  _Content() {
    this.innerHTML = '';
  }

  render() {
    this._Content();
    this.innerHTML += `
      <div id="detail-transaction-form" class="grid grid-cols-12 gap-10 text-sm">
        <div id="transaction-form" class="col-start-1 col-end-9 flex flex-col gap-8">
          <p class="text-lg font-semibold">Formulir Penjualan Sampah</p>
          <div id="transaction-img" class="rounded-lg border-dashed border-2 border-gray-400 h-[256px] p-4"></div>
          <div id="partner-detail">
            <div id="dropdown-partner-detail" class="flex flex-row justify-between cursor-pointer">
              <div class="flex flex-row gap-3">
                <div class="bg-lime-500 w-3 h-7 rounded-tr-lg rounded-br-md"></div>
                <p class="text-xl font-semibold">Kolaborator</p>
              </div>
              <div class="dropdown-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
            <div id="content-partner-detail" class="hidden mt-8">
              <div id="data-partner" class="flex flex-col gap-2">
              </div>
            </div>
          </div>
          <div id="transaction-detail">
            <div id="dropdown-transaction-detail" class="flex flex-row justify-between cursor-pointer">
              <div class="flex flex-row gap-3">
                <div class="bg-lime-500 w-3 h-7 rounded-tr-lg rounded-br-md"></div>
                <p class="text-xl font-semibold">Detail Penjualan Sampah</p>
              </div>
              <div class="dropdown-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
            <div id="content-transaction-detail" class="hidden mt-8">
              <div id="data-transaction" class="flex flex-col gap-2">
              </div>
            </div>
          </div>
        </div>
        <div id="income-detail-section" class="col-start-9 col-end-13">
          <div>
            <div class="flex flex-col shadow-md rounded-2xl">
              <div class="flex flex-col px-6 py-4 shadow-sm">
                <p class="font-semibold text-xl">Detail Penjualan Sampah</p>
                <hr class="mt-2 mb-2">
                <div id="income-detail" class="flex flex-col gap-2">
                </div>
                <div id="purchase-confirmation" class="flex flex-row gap-4 justify-center mt-8 mb-4 hidden">
                  <solid-button name="Tolak" width="180px"></solid-button>
                  <solid-button name="Terima" width="180px"></solid-button>
                </div>
              </div>
            </div>
            <div id="enter-shipping-cost" class="hidden">
              <div class="flex flex-col pb-4 w-full mt-7" flex flex-row gap-4>
                <label for="shippping-cost" class="text-base font-medium py-2">Masukkan biaya penjemputan</label>
                <div class="flex flex-col gap-4">
                  <input aria-describedby="shippping-cost" class="rounded-lg outline-lime-600 border-0 text-base w-full h-16 shadow-md px-3" type="text" name="address" id="address" placeholder="Biaya penjemputan sampah" required>
                  <solid-button name="Kirim" width="425px"></solid-button>
                </div>
              </div>
            </div>
            <div id="success-message-pickup" class="bg-lime-50 rounded-lg p-4 mt-8 hidden">
              <div class="flex flex-row gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#65A30D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check mt-1"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                <div class="flex flex-col">
                  <p class="text-lime-600 text-base">Transaksi telah disetujui</p>
                  <p>Jemput sampah kolaborator sebelum 24 Mei 2024</p>
                </div>
              </div>
            </div>
            <div id="success-message-dropoff" class="bg-lime-50 rounded-lg p-4 mt-8 hidden">
              <div class="flex flex-row gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#65A30D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check mt-1"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                <div class="flex flex-col">
                  <p class="text-lime-600 text-base">Transaksi telah disetujui</p>
                  <p>Kolaborator akan mengantar sampah sebelum 24 Mei 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('partner-transaction-form', PartnerTransactionForm);
