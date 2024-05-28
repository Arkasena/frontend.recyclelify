class KatalogItem extends HTMLElement {
  constructor() {
    super();
    this._katalogData = {
      id: null,
      photo: null,
      name: null,
      description: null,
      price: null,
    };
  }

  connectedCallback() {
    this.render();
  }

  set katalogData(value) {
    this._katalogData = value;
    this.render();
  }

  get katalogData() {
    return this._katalogData;
  }

  _emptyContent() {
    this.innerHTML = '';
  }

  render() {
    this._emptyContent();
    this.innerHTML += `
    <a href="#/catalog/${this.katalogData.id}">
    <div class="flex flex-col shadow-md rounded-2xl">
        <div class="w-full aspect-video rounded-2xl">
            <img class="w-full aspect-video rounded-2xl " src="${this.katalogData.photo}" alt="produk ${this.katalogData.name}">
        </div>
        <div class="flex flex-col px-6 py-4 shadow-sm">
            <h3 class="font-bold text-lg mb-2">${this.katalogData.name}</h3>
            <p class="line-clamp-4 text-ellipsis mb-5">${this.katalogData.description}</p>
            <div class="flex flex-row gap-4 items-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tag fill-black rotate-90"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/></svg><span class="font-semibold">Rp. ${this.katalogData.price}</span></div>
        </div>
        <div class="px-6 pt-4 pb-4 flex flex-row gap-2">
            <div class="bg-lime-100 py-2 px-4 rounded-xl">Fashion</div>
            <div class="bg-lime-100 py-2 px-4 rounded-xl">+ 2 lainnya</div>
        </div>
    </div>
</a>
      `;
  }
}
customElements.define('katalog-item', KatalogItem);
