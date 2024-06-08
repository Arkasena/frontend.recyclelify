class AboutSampah extends HTMLElement {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
    this._sampahType = null;
    this._sampahData = {
      type: {
        PETE: 'PET (Polyethylene Terephthalate)',
        LDPE: 'LDPE (Low Density Polyethylene)',
        PP: 'PP (Polypropylene)',
        PS: 'PS (Polystyrene)',
        HDPE: 'HDPE (High Density Polyethylene)',
        PVC: 'PVC (Polyvinyl Chloride)',
      },
      agka: {
        PETE: '1',
        LDPE: '4',
        PP: '5',
        PS: '6',
        HDPE: '2',
        PVC: '3',
      },
      code: {
        PETE: 'PETE atau PET',
        LDPE: 'LDPE atau PE-LD',
        PP: 'PP',
        PS: 'PS',
        HDPE: 'HDPE atau PEHD',
        PVC: 'PVC atau V',
      },
      desc: {
        PETE: 'Biasanya simbol ini banyak ditemukan pada plastik untuk kemasan makanan dan minuman, seperti :',
        LDPE: 'Biasanya simbol ini banyak ditemukan pada kantong plastik (kresek) hingga bungkus makanan. Contohnya :',
        PP: 'Biasanya simbol ini banyak ditemukan pada kemasan produk yang tahan panas seperti :',
        PS: 'Biasanya simbol ini banyak ditemukan pada box penyimpanan hingga wadah makanan seperti :',
        HDPE: 'Biasanya simbol ini banyak ditemukan kemasan produk dengan ciri plastik tebal seperti :',
        PVC: 'Biasanya simbol ini banyak ditemukan pada produk industri konstruksi material seperti :',
      },
      example: {
        PETE: ['Botol minuman', 'Botol soda', 'Botol minyak', 'Botol saus', 'Wadah selai', 'Kotak obat', 'dan lain lain'],
        LDPE: ['Plastik laundry', 'Bungkus makanan ringan', 'Tas belanja/kresek', 'Kemasan buah', 'Plastik pembungkus roti', 'dan lain lain'],
        PP: ['Botol sirup', 'Kotak yogurt', 'Sedotan plastik', 'Tali plastik', 'Kaleng cat', 'Ember', 'dan lain lain'],
        PS: ['Wadah makanan styrofoam', 'Wadah telur', 'Sedotan plastik', 'Box produk elektronik', 'Cooler box', 'Insulasi suara', 'dan lain lain'],
        HDPE: ['Galon air minum', 'Botol susu', 'Botol sabun', 'Botol deterjen', 'Botol shampo', 'dan lain lain'],
        PVC: ['Pipa air', 'Ubin', 'Kabel listrik', 'Wrapping', 'Mainan anak', 'Mainan hewan', 'dan lain lain'],
      },
    };
  }

  connectedCallback() {
    this.render();
  }

  set sampahType(value) {
    this._sampahType = value;
    this.render();
  }

  get sampahType() {
    return this._sampahType;
  }

  get sampahData() {
    return this._sampahData;
  }

  _emptyContent() {
    this.innerHTML = '';
  }

  render() {
    this._emptyContent();
    this.innerHTML += `
    <div class="flex flex-col">
    <h3 class="font-medium text-lg pb-2">Tentang ${this.sampahData.type[this.sampahType.toUpperCase()]}</h3>
    <p class="pb-3">${this.sampahType.toUpperCase()} adalah plastik yang memiliki simbol daur ulang dengan <span class="font-bold">kode angka ${this.sampahData.agka[this.sampahType.toUpperCase()]}</span> serta <span class="font-bold">kode ${this.sampahData.code[this.sampahType.toUpperCase()]} pada bagian bawah</span>.</p>
    <p>${this.sampahData.desc[this.sampahType.toUpperCase()]}</p>
    <ul class="list-disc pl-6">
        <li>${this.sampahData.example[[this.sampahType.toUpperCase()]][0]}</li>
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
customElements.define('about-sampah', AboutSampah);
