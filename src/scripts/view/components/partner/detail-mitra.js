class DetailMitra extends HTMLElement {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
    this._partnerData = {
      id: null,
      username: null,
      name: null,
      description: null,
      phoneNumber: null,
      email: null,
      address: null,
      website: null,
      photo: null,
    };
  }

  connectedCallback() {
    this.render();
  }

  set partnerData(value) {
    this._partnerData = value;
    this.render();
  }

  get partnerData() {
    return this._partnerData;
  }

  _emptyContent() {
    this.innerHTML = '';
  }

  render() {
    this._emptyContent();
    this.innerHTML += `
    <div class="flex flex-row w-full gap-4">
    <div class="w-14 h-14 rounded-xl bg-gray-300 flex justify-center items-center">
        <img class="w-14 h-14 rounded-xl" src="${this.partnerData.photo ? this.partnerData.photo : './images/others/blank-profile.png'}" alt="Foto ${this.partnerData.name}">
    </div>
    <div class="flex flex-col flex-grow justify-between">
        <h1 class="text-xl font-semibold">${this.partnerData.name}</h1>
        <p class="text-gray-400">@${this.partnerData.username}</p>
    </div>
</div>
<div class="w-full">
    <p>${this.partnerData.description ? this.partnerData.description : ''}</p>
</div>
<div class="grid grid-cols-2 w-full gap-4">
    <div class="flex flex-row items-center gap-4">
        <div class="w-7 h-7 flex justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg></div>
        <p>${this.partnerData.address}</p>
    </div>
    <div class="flex flex-row items-center gap-4">
        <div class="w-7 h-7 flex justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div>
        <p>+62 ${this.partnerData.phoneNumber}</p>
    </div>
    <div class="flex flex-row items-center gap-4">
        <div class="w-7 h-7 flex justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg></div>
        <p>${this.partnerData.website ? this.partnerData.website : 'Tidak ada website'}</p>
    </div>
    <div class="flex flex-row items-center gap-4">
        <div class="w-7 h-7 flex justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></div>
        <p>${this.partnerData.email}</p>
    </div>
</div>
<div class="border border-gray-200"></div>
<div class="flex flex-row w-full gap-4">
    <div class="flex">
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="28" viewBox="0 0 11 28" fill="none">
            <path d="M0 0H7C9.20914 0 11 1.79086 11 4V24C11 26.2091 9.20914 28 7 28H0V0Z" fill="#84CC16"/>
        </svg>
    </div>
    <div class="flex flex-col flex-grow gap-4">
        <h1 class="text-xl font-semibold">Syarat dan Ketentuan</h1>
        <p>Perhatikan beberapa syarat dan ketentuan berikut sebelum mengirimkan sampahmu kepada Mitra!</p>
        <ul class="list-decimal list-outside pl-4">
            <li>Sampah yang dikirimkan sudah disortir berdasarkan kategori sampah.</li>
            <li>Sampah harus dalam kondisi bersih dan tidak terkontaminasi oleh bahan lain yang tidak dapat didaur ulang.
            </li>
            <li>Pengiriman sampah harus memenuhi jumlah minimum sampah yang telah tertera.</li>
            <li>Mitra berhak untuk menolak menerima sampah plastik PVC jika tidak memenuhi standar kualitas yang ditetapkan atau jika tidak sesuai dengan persyaratan lain yang telah ditetapkan.</li>
        </ul>
    </div>
</div>
<div class="border border-gray-200 890:hidden"></div>
      `;
  }
}
customElements.define('detail-mitra', DetailMitra);
