class MitraItem extends HTMLElement {
  constructor() {
    super();
    this._mitraData = {
      id: null,
      photo: null,
      name: null,
      description: null,
      price: null,
      address: null,
      material: null,
    };
  }

  connectedCallback() {
    this.render();
  }

  set mitraData(value) {
    this._mitraData = value;
    this.render();
  }

  get mitraData() {
    return this._mitraData;
  }

  _emptyContent() {
    this.innerHTML = '';
  }

  render() {
    this._emptyContent();
    this.innerHTML += `
    <a href="#/partner/${this.mitraData.id}">
    <div class="flex flex-col shadow-md rounded-2xl">
    <div class="w-full aspect-video rounded-2xl">
    <img class="w-full aspect-video rounded-2xl " src="${this.mitraData.photo}" alt="sampah">
    </div>
    <div class="flex flex-col px-6 py-4 shadow-sm">
    <h3 class="font-semibold text-lg mb-2">${this.mitraData.name}</h3>
    <p class="line-clamp-2 text-ellipsis mb-5">${this.mitraData.description}</p>
    <div class="flex flex-row gap-4 items-center"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-scale"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg><span class="font-medium">Mulai dari Rp.${this.mitraData.price}/kg</span></div>
    <div class="flex flex-row gap-4 items-center"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg><span class="font-medium">${this.mitraData.address}</span></div>
    </div>
    <div class="px-6 pt-4 pb-4 flex flex-row gap-2">
    <div class="bg-lime-100 py-2 px-4 rounded-xl">${this.mitraData.material}</div>
    <div class="bg-lime-100 py-2 px-4 rounded-xl">+ 2 lainnya</div>
    </div>
    </div>
    </a>
    `;
  }
}
customElements.define('mitra-item', MitraItem);
