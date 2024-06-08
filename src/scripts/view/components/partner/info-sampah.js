/* eslint-disable class-methods-use-this */
class InfoSampah extends HTMLElement {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
    this._materialType = null;
  }

  connectedCallback() {
    this.render();
    this._createMaterialTypeButton(this.materialType, document.querySelector('#materialType'));
    document.querySelector('button-sampah').dispatchEvent(new Event('click'));
  }

  set materialType(value) {
    this._materialType = value;
    this.render();
  }

  get materialType() {
    return this._materialType;
  }

  _emptyContent() {
    this.innerHTML = '';
  }

  _createMaterialTypeButton(allMaterial, materialTypeContainer) {
    allMaterial.forEach((material) => {
      const materialButton = document.createElement('button-sampah');
      materialButton.jenisSampah = material.name;
      materialButton.addEventListener('click', () => {
        const aboutSampah = document.createElement('about-sampah');
        aboutSampah.sampahType = material.name;
        document.querySelector('#price').innerHTML = material.pricePerKilogram;
        document.querySelector('#minWeight').innerHTML = material.minimumTransactionWeight;
        const aboutContainer = document.querySelector('#about');
        aboutContainer.innerHTML = '';
        aboutContainer.append(aboutSampah);
      });
      materialTypeContainer.append(materialButton);
    });
  }

  render() {
    this._emptyContent();
    this.innerHTML += `
    <div class="flex flex-col w-full p-6 rounded-xl shadow-lg mb-8">
    <div class="flex flex-col gap-8 w-full">
    <h2 class="text-center font-semibold text-lime-700">Informasi Jenis Sampah yang Diterima</h2>
    <div class="flex flex-row gap-2 justify-center" id="materialType">
    </div>
    <div class="flex flex-row justify-between">
    <div class="flex flex-row gap-2">
    <div class="w-6 h-6"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tag rotate-90 fill-black"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/></svg></div>
    <p class="font-medium">Rp. <span id="price"></span>/kg</p>
    </div>
    <div class="flex flex-row gap-2">
    <div class="w-6 h-6"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-scale"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg></div>
    <p class="font-medium">Min <span id="minWeight"></span>kg</p>
    </div>
    </div>
    <div class="border border-gray-200"></div>
    <div id="about">
    
    </div>
    </div>
    </div>
    <div class="w-full">
    <a id="linkJual" href="${window.location.hash}/form"><button class="bg-lime-600 w-full h-10 text-lg text-white rounded-lg px-2">Ajukan Penjualan Sampah</button></a>
    </div>
    `;
  }
}
customElements.define('info-sampah', InfoSampah);
