class Pet extends HTMLElement {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  _emptyContent() {
    this.innerHTML = '';
  }

  render() {
    this._emptyContent();
    this.innerHTML += `
    <div class="flex flex-col">
    <h3 class="font-medium text-lg pb-2">Tentang PET (Polyethylene Terephthalate)</h3>
    <p class="pb-3">PET adalah plastik yang memiliki simbol daur ulang dengan <span class="font-bold">kode angka 1</span> serta <span class="font-bold">kode PETE atau PET pada bagian bawah</span>.</p>
    <p>Biasanya simbol ini banyak ditemukan pada plastik untuk kemasan makanan dan minuman, seperti : </p>
    <ul class="list-disc pl-6">
        <li>Botol minuman</li>
        <li>Botol soda</li>
        <li>Botol minyak</li>
        <li>Botol saus</li>
        <li>Wadah selai</li>
        <li>Kotak obat</li>
        <li>dan lain lain</li>
    </ul>
</div>
      `;
  }
}
customElements.define('about-pet', Pet);
