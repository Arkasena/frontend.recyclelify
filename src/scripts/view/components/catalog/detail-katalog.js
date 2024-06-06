class DetailKatalog extends HTMLElement {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
    this._catalogData = {
      photo: null,
      name: null,
      description: null,
      price: null,
      partnerName: null,
      partnerUsername: null,
      partnerDescription: null,
      partnerEmail: null,
      partnerPhoto: null,
      partnerAddress: null,
      partnerPhoneNumber: null,
      partnerWebsite: null,
    };
  }

  connectedCallback() {
    this.render();
  }

  _emptyContent() {
    this.innerHTML = '';
  }

  set catalogData(value) {
    this._catalogData = value;
    this.render();
  }

  get catalogData() {
    return this._catalogData;
  }

  render() {
    this._emptyContent();
    this.innerHTML += `
    <div class="flex flex-col w-full gap-8">
    <div class="flex flex-col 670:flex-row w-full gap-8">
        <div class="flex justify-center">
            <div class="w-80 h-80">
                <img class="w-full aspect-square rounded-2xl" src="${this.catalogData.photo}" alt="Gambar ${this.catalogData.name}">
            </div>
        </div>
        <div class="flex flex-col gap-6 relative" id="productInfoContainer">
            <div class="flex flex-col gap-2">
                <h1 class="text-2xl font-semibold">${this.catalogData.name}</h1>
                <p class="text-base font-semibold">Rp. ${this.catalogData.price}</p>
            </div>
            <div class="flex flex-col gap-2">
                <div class="whitespace-pre-line">${this.catalogData.description}
                </div>
                
            </div>
            <a href="https://www.tokopedia.com/" target="_blank" class="cursor-pointer rounded-lg text-sm text-white bg-lime-600 h-8 w-fit px-4 flex flex-row justify-center items-center">Kunjungi halaman pembelian<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg></a>
        </div>
    </div>
    <div class="border border-gray-200"></div>
    <div class="w-full">
        <div class="flex flex-row w-full gap-4">
            <div class="w-14 h-14 rounded-xl bg-gray-300 flex justify-center items-center">
                <img class="w-14 h-14 rounded-xl" src="${this.catalogData.partnerPhoto}" alt="Foto ${this.catalogData.partnerName}">
            </div>
            <div class="flex flex-col flex-grow justify-between">
                <h1 class="text-xl font-semibold">${this.catalogData.partnerName}</h1>
                <p class="text-gray-400">@${this.catalogData.partnerUsername}</p>
            </div>
        </div>
    </div>
    <div class="w-full">
        <p>${this.catalogData.partnerDescription}</p>
    </div>
    <div class="grid grid-cols-2 w-full gap-4">
        <div class="flex flex-row items-center gap-4">
            <div class="w-7 h-7 flex justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg></div>
            <p>${this.catalogData.partnerAddress}</p>
        </div>
        <div class="flex flex-row items-center gap-4">
            <div class="w-7 h-7 flex justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div>
            <p>+62 ${this.catalogData.partnerPhoneNumber}</p>
        </div>
        <div class="flex flex-row items-center gap-4">
            <div class="w-7 h-7 flex justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg></div>
            <p>${this.catalogData.partnerWebsite}</p>
        </div>
        <div class="flex flex-row items-center gap-4">
            <div class="w-7 h-7 flex justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></div>
            <p>${this.catalogData.partnerEmail}</p>
        </div>
    </div>
    <div class="border border-gray-200 w-full"></div>
    <div class="flex flex-col w-full gap-4">
        <h2 class="text-xl font-semibold">Lainnya dari ${this.catalogData.partnerName}</h2>
        <div class="w-full grid grid-cols-2 md:grid-cols-4 gap-3" id="otherProduct">
            
        </div>
    </div>
</div>
        `;
  }
}
customElements.define('detail-katalog', DetailKatalog);
