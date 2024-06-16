class MyProfile extends HTMLElement {
  constructor() {
    super();
    this._userData = {
      id: null,
      name: null,
      username: null,
      description: null,
      address: null,
      phone_number: null,
      website: null,
      email: null,
      price: null,
      plasticType: null,
      photo: null,
    };
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

  set userData(value) {
    this._userData = value;
    this.render();
  }

  get userData() {
    return this._userData;
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
    <div class="w-full max-w-[1500px] min-w-[1500px] flex flex-col gap-[40px] justify-center relative px-6 pt-10 pb-14">
                <div class="w-full flex flex-col">
                    <div class="w-full bg-lime-50 relative rounded-2xl h-72">
                        <div class="absolute p-5 right-0">
                            <img src="./images/others/full-square-dot.svg" alt="">
                        </div>
                    </div>
                    <div class="flex flex-col w-full gap-8 px-9 pb-8 z-10 mt-[-72px]">
                        <div class="flex flex-row gap-4">
                            <div class="w-14 h-14 rounded-xl bg-gray-300 flex justify-center items-center">
                                <img class="w-14 h-14 rounded-xl" src="${this.userData.photo}" alt="Foto ${this.userData.name}">
                            </div>
                            <div class="flex flex-col flex-grow justify-between">
                                <h1 class="text-xl font-semibold">${this.userData.name}</h1>
                                <p class="text-gray-400">@${this.userData.username}</p>
                            </div>
                        </div>
                        <div class="w-full">
                            <p>${this.userData.description}</p>
                        </div>
                        <div class="grid grid-cols-2 w-full gap-4">
                            <div class="flex flex-row items-center gap-4">
                                <div class="w-7 h-7 flex justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg></div>
                                <p>${this.userData.address}</p>
                            </div>
                            <div class="flex flex-row items-center gap-4">
                                <div class="w-7 h-7 flex justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div>
                                <p>+62 ${this.userData.phone_number}</p>
                            </div>
                            <div class="flex flex-row items-center gap-4">
                                <div class="w-7 h-7 flex justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg></div>
                                <p>${this.userData.website}</p>
                            </div>
                            <div class="flex flex-row items-center gap-4">
                                <div class="w-7 h-7 flex justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></div>
                                <p>${this.userData.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="border border-gray-200 w-full"></div>
                <h2 class="text-xl font-semibold">Terbuka Membeli Sampah</h2>
                <a href="">
            <div class="flex flex-col w-80 shadow-md rounded-2xl">
                <div class="w-full bg-lime-50 relative rounded-2xl h-36">
                    <div class="absolute p-5 right-0">
                        <img class="w-[53px] aspect-square" src="./images/others/full-square-dot.svg" alt="">
                    </div>
                </div>
                <div class="flex flex-col w-full gap-6 px-6 pb-8 z-10 mt-[-30px]">
                    <div class="flex flex-row gap-4">
                        <div class="w-14 h-14 rounded-xl bg-gray-300 flex justify-center items-center">
                            <img class="w-14 h-14 rounded-xl" src="${this.userData.photo}" alt="Foto ${this.userData.name}">
                        </div>
                        <div class="flex flex-col flex-grow justify-between">
                            <h3 class="text-xl font-semibold">${this.userData.name}</h3>
                            <p class="text-gray-400">@${this.userData.username}</p>
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <p class="line-clamp-2 text-ellipsis mb-5">${this.userData.description}</p>
                        <div class="flex flex-row gap-4 items-center"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-scale"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg><span class="font-medium">Mulai dari Rp.${this.userData.price}/kg</span></div>
                        <div class="flex flex-row gap-4 items-center"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg><span class="font-medium">${(this.userData.address).split(',')[1]}</span></div>
                    </div>
                </div>
                <div class="border border-gray-200 w-full"></div>
                <div class="px-6 py-4 flex flex-row gap-2">
                        ${this.userData.plasticType ? `
                            ${this.userData.plasticType.total > 1 ? `
                                <div class="bg-lime-100 py-2 px-4 rounded-xl">${this.userData.plasticType.name}</div>
                                <div class="bg-lime-100 py-2 px-4 rounded-xl">+${Number(this.userData.plasticType.total) - 1} lainnya</div>
                                ` : `
                                <div class="bg-lime-100 py-2 px-4 rounded-xl">${this.userData.plasticType.name}</div>
                                `}
                                ` : `
                                <div class="bg-lime-100 py-2 px-4 rounded-xl">Tidak menerima</div>
                                `}
                </div>
            </div>
        </a>
                <div class="border border-gray-200 w-full"></div>
                <div class="flex flex-row w-full justify-between items-center">
                    <h2 class="text-xl font-semibold">Katalog</h2>
                    <a href="#/my-profile/add-product" class="h-8 bg-lime-600 text-gray-50 px-3 flex items-center text-center rounded-lg">Tambah Item Katalog</a>
                </div>
                <div class="grid grid-cols-2 890:grid-cols-4 gap-8" id="katalogContainer">
                </div>
            </div>
        </div>
    `;
  }
}
customElements.define('my-profile', MyProfile);
