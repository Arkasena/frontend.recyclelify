class SettingAccount extends HTMLElement {
  constructor() {
    super();
    this._settingAcountData = {
      fullname: null,
      address: null,
      city: null,
      province: null,
    };
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  set settingAcountData(value) {
    this._settingAcountData = value;
    this.render();
  }

  get settingProfileData() {
    return this._settingProfileData;
  }

  setupEventListeners() {
    const changePasswordMenu = this.querySelector('#change-password-menu');
    const deleteAccountMenu = this.querySelector('#delete-account-menu');
    const changePasswordSection = this.querySelector('#change-password-section');
    const deleteAccountSection = this.querySelector('#delete-account-section');
    const backToAccountSettingButtons = this.querySelectorAll('#back-to-account-setting');

    changePasswordMenu.addEventListener('click', () => {
      this.hideMenus();
      changePasswordSection.classList.remove('hidden');
    });

    deleteAccountMenu.addEventListener('click', () => {
      this.hideMenus();
      deleteAccountSection.classList.remove('hidden');
    });

    backToAccountSettingButtons.forEach((button) => {
      button.addEventListener('click', () => {
        this.showMenus();
        changePasswordSection.classList.add('hidden');
        deleteAccountSection.classList.add('hidden');
      });
    });
  }

  hideMenus() {
    const menus = this.querySelectorAll('.menu-item');
    menus.forEach((menu) => menu.classList.add('hidden'));
  }

  showMenus() {
    const menus = this.querySelectorAll('.menu-item');
    menus.forEach((menu) => menu.classList.remove('hidden'));
  }

  render() {
    this.innerHTML = `
      <div id="account-setting" class="flex flex-col gap-4">
        <div id="setting-profile-menu" class="flex flex-col">
          <div class="p-4 flex flex-row justify-between hover:bg-gray-100 rounded-lg menu-item">
            <button id="change-password-menu"  class="text-lg font-medium hover:bg-gray-100">Ubah Password</button>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
          </div>
          <div class="p-4 flex flex-row justify-between hover:bg-gray-100 rounded-lg menu-item">
            <button id="delete-account-menu" class="text-lg font-medium ">Hapus Akun</button>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
          </div>

          <div id="change-password-section" class="hidden">
            <div class="p-4 flex flex-row gap-2 items-center">
              <button class="p-2 hover:bg-gray-100 rounded-lg" id="back-to-account-setting">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left hover:bg-gray-100 rounded-lg"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              <p class="text-lg font-medium ">Ubah Password</p>
            </div>
            <div id="form-change-password" class="ml-[4rem] mr-[4rem] flex flex-col gap-2">
              <div class="flex flex-col pb-4 w-full">
                <label for="current-password" class="font-medium text-base py-2">Password saat ini</label>
                <input class="rounded-lg outline-lime-600 relative border-0 text-base w-full h-16 shadow-md px-3" type="text" name="current-password" id="current-password" placeholder="Masukkan password" required>
              </div>
              <div class="flex flex-col pb-4 w-full">
                <label for="new-password" class="font-medium text-base py-2">Password baru</label>
                <input class="rounded-lg outline-lime-600 relative border-0 text-base w-full h-16 shadow-md px-3" type="text" name="new-password" id="new-password" placeholder="Masukkan password" required>
              </div>
              <div class="flex flex-col pb-4 w-full">
                <label for="confirm-new-password" class="font-medium text-base py-2">Konfirmasi password baru </label>
                <input class="rounded-lg outline-lime-600 relative border-0 text-base w-full h-16 shadow-md px-3" type="text" name="confirm-new-password" id="confirm-new-password" placeholder="Masukkan password" required>
              </div>
              <div class="place-self-end">
                <solid-button name="Simpan Perubahan"></solid-button>
              </div>
            </div>
          </div>

          <div id="delete-account-section" class="hidden">
            <div class="p-4 flex flex-row gap-2 items-center">
              <button class="p-2 hover:bg-gray-100 rounded-lg" id="back-to-account-setting">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left hover:bg-gray-100 rounded-lg"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              <p class="text-lg font-medium ">Hapus Akun</p>
            </div>
            <div id="form-delete-account" class="ml-[4rem] mr-[4rem] flex flex-col gap-3">
              <p class="break-words">Dengan menghapus akun Anda, Anda tidak akan lagi dapat mengakses layanan kami atau data yang terkait dengan akun Anda. Pastikan untuk menyimpan atau mentransfer data penting sebelum melanjutkan</p>
              <p class="break-words">Anda dapat membatalkan penghapusan akun dalam waktu 30 hari setelah tindakan ini. Setelah itu, akun dan data yang terkait akan dihapus secara permanen.</p>
              <p class="break-words">Untuk mengonfirmasi tindakan ini, masukkan password akun Anda:</p>
              <div class="flex flex-col pb-4 w-full">
                <input class="rounded-lg outline-lime-600 relative border-0 text-base w-full h-16 shadow-md px-3" type="text" name="confirm-new-password" id="confirm-password-to-delete-account" placeholder="Masukkan password" required>
              </div>
              <div class="place-self-end">
                <solid-button name="Hapus akun"></solid-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('setting-account', SettingAccount);
