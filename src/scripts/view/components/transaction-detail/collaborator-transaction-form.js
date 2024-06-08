class CollaboratorTransactionForm extends HTMLElement {
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
                <p class="text-xl font-semibold">Mitra Tujuan</p>
              </div>
              <div class="dropdown-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
          <div id="content-partner-detail" class="hidden mt-8">
            <div id="data-partner" class="flex flex-col gap-2"></div>
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
              <div id="data-transaction" class="flex flex-col gap-2"></div>
            </div>
          </div>
        </div>
        <div id="income-detail-section" class="col-start-9 col-end-13">
          <div>
            <div class="flex flex-col shadow-md rounded-2xl">
              <div class="flex flex-col px-6 py-4 shadow-sm">
                <p class="font-semibold text-xl">Detail Pendapatan</p>
                <hr class="mt-2 mb-2">
                <div id="delivery-cost-message" class="">
                  <p>Transaksi ini telah disetujui oleh mitra!</p>
                  <p>Biaya pengiriman telah ditambahkan secara otomatis. </p>
                  <p class="mt-4 mb-4">Jika kamu setuju, segera konfirmasi transaksi ini dalam 3 hari untuk melanjutkan proses</p>
                </div>
                <div id="income-detail" class="flex flex-col gap-2"></div>
                <div id="delivery-cost-reminder" class="mt-4 mb-4">
                  <p class="text-gray-400">* Biaya pengiriman akan diperbarui setelah mitra menyetujui transaksi ini</p>
                </div>
                <div id="delivery-cost-confirmation" class="flex flex-row gap-4 justify-center mt-4 mb-4">
                  <solid-button name="Konfirmasi" width="180px"></solid-button>
                  <solid-button name="Batalkan" width="180px"></solid-button>
                </div>
              </div>
            </div>
            <div id="success-message" class="bg-lime-50 rounded-lg p-4 mt-8">
              <div class="flex flex-row gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#65A30D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check mt-1"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                <div class="flex flex-col">
                  <p class="text-lime-600 text-base">Transaksi telah disetujui</p>
                  <p>Mitra akan menjemput sampahmu sebelum 24 Mei 2024</p>
                </div>
               </div>
              </div>
            </div>
          </div>
        </div>
      `;
  }
}

customElements.define('collaborator-transaction-form', CollaboratorTransactionForm);
