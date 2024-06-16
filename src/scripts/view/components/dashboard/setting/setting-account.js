/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-constructor */
class SettingAccount extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
    this.formSubmitFucntions();
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
      const form = document.querySelector('#change-password-section');
      const allInput = form.querySelectorAll('input');
      allInput.forEach((input) => {
        if (!(input.hasAttribute('required'))) {
          input.setAttribute('required', '');
        }
      });
    });

    deleteAccountMenu.addEventListener('click', () => {
      this.hideMenus();
      deleteAccountSection.classList.remove('hidden');
      const form = document.querySelector('#delete-account-section');
      const allInput = form.querySelectorAll('input');
      allInput.forEach((input) => {
        if (!(input.hasAttribute('required'))) {
          input.setAttribute('required', '');
        }
      });
    });

    backToAccountSettingButtons.forEach((button) => {
      button.addEventListener('click', () => {
        this.showMenus();
        const allInput = document.querySelectorAll('input');
        allInput.forEach((input) => {
          if (input.hasAttribute('required')) {
            input.removeAttribute('required');
          }
        });
        changePasswordSection.classList.add('hidden');
        deleteAccountSection.classList.add('hidden');
      });
    });
  }

  hideMenus() {
    const menus = this.querySelectorAll('.menu-item');
    menus.forEach((menu) => menu.classList.add('hidden'));
  }

  formSubmitFucntions() {
    const formPassword = document.querySelector('#change-password-section');
    const formDelete = document.querySelector('#delete-account-section');
    const password = formPassword.querySelector('#current-password');
    const newPassword = formPassword.querySelector('#new-password');
    const confirm = formPassword.querySelector('#confirm-new-password');
    const inputDelete = formDelete.querySelector('#confirm-password-to-delete-account');
    function customValidationEmptyHandler(event) {
      event.target.setCustomValidity('');
      if (event.target.validity.valueMissing) {
        event.target.setCustomValidity('Bagian ini tidak boleh kosong.');
      } else if (event.target.validity.tooShort) {
        const minChar = event.target.getAttribute('minLength');
        event.target.setCustomValidity(`Telalu pendek, anda kurang ${minChar - event.target.value.length} karakter`);
      }
      if (event.target.name === 'confirm-new-password') {
        if (event.target.value !== newPassword.value) {
          event.target.setCustomValidity('Password tidak sama');
        }
      }
    }
    function customMessage(event, element) {
      const isValid = event.target.validity.valid;
      const errorMessage = event.target.validationMessage;
      let connectedValidationEl = formPassword.querySelector(`#${element}`);
      if (!connectedValidationEl) {
        connectedValidationEl = formDelete.querySelector(`#${element}`);
      }
      if (!event.target.value) {
        connectedValidationEl.innerText = errorMessage;
      }
      if (errorMessage && !isValid) {
        connectedValidationEl.innerText = errorMessage;
      } else {
        connectedValidationEl.innerText = '';
      }
    }
    const inputEvents = ['click', 'input', 'change', 'invalid', 'blur'];
    const inputForms = [password, newPassword, confirm, inputDelete];
    inputEvents.forEach((eventType) => {
      inputForms.forEach((input) => {
        input.addEventListener(eventType, customValidationEmptyHandler);
      });
      if (eventType !== 'click' && eventType !== 'change') {
        password.addEventListener(eventType, (event) => { customMessage(event, 'current-passwordValidation'); });
        newPassword.addEventListener(eventType, (event) => { customMessage(event, 'new-passwordValidation'); });
        confirm.addEventListener(eventType, (event) => { customMessage(event, 'confirm-new-passwordValidation'); });
        inputDelete.addEventListener(eventType, (event) => { customMessage(event, 'confirm-password-to-delete-accountValidation'); });
      }
    });
    formPassword.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('tolol');
    });
  }

  showMenus() {
    const menus = this.querySelectorAll('.menu-item');
    menus.forEach((menu) => menu.classList.remove('hidden'));
  }

  render() {
    this.innerHTML = `
      <div id="account-setting" class="flex flex-col gap-4">
            <div id="setting-profile-menu" class="flex flex-col">
                <button id="change-password-menu" class="p-4 flex flex-row justify-between hover:bg-gray-100 rounded-lg menu-item">
                    <div   class="text-lg font-medium hover:bg-gray-100">Ubah Password</div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
                </button>
                <button id="delete-account-menu" class="p-4 flex flex-row justify-between hover:bg-gray-100 rounded-lg menu-item">
                    <div  class="text-lg font-medium ">Hapus Akun</div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
                </button>
                
                <form id="change-password-section" class="hidden">
                    <div class="p-4 flex flex-row gap-2 items-center">
                        <button type="button" class="p-2 hover:bg-gray-100 rounded-lg" id="back-to-account-setting">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left hover:bg-gray-100 rounded-lg"><path d="m15 18-6-6 6-6"/></svg>
                        </button>
                        <p class="text-lg font-medium ">Ubah Password</p>
                    </div>
                    <div id="form-change-password" class="ml-[4rem] mr-[4rem] flex flex-col gap-2">
                        <div class="flex flex-col pb-4 w-full">
                            <label for="current-password" class="font-medium text-base py-2">Password saat ini</label>
                            <input aria-describedby="current-passwordValidation"  class="rounded-lg outline-lime-600 relative border-0 text-base w-full h-16 shadow-md px-3" type="text" name="current-password" id="current-password" placeholder="Masukkan password">
                            <p id="current-passwordValidation" class="text-red-500 text-sm" aria-live="polite"></p>
                        </div>
                        <div class="flex flex-col pb-4 w-full">
                            <label for="new-password" class="font-medium text-base py-2">Password baru</label>
                            <input aria-describedby="new-passwordValidation" class="rounded-lg outline-lime-600 relative border-0 text-base w-full h-16 shadow-md px-3" minlength="8" type="text" name="new-password" id="new-password" placeholder="Masukkan password">
                            <p id="new-passwordValidation" class="text-red-500 text-sm" aria-live="polite"></p>
                        </div>
                        <div class="flex flex-col pb-4 w-full">
                            <label for="confirm-new-password" class="font-medium text-base py-2">Konfirmasi password baru </label>
                            <input aria-describedby="confirm-new-passwordValidation" class="rounded-lg outline-lime-600 relative border-0 text-base w-full h-16 shadow-md px-3" minlength="8" type="text" name="confirm-new-password" id="confirm-new-password" placeholder="Masukkan password">
                            <p id="confirm-new-passwordValidation" class="text-red-500 text-sm" aria-live="polite"></p>
                        </div>
                        <div class="place-self-end">
                            <button type="submit" class="bg-lime-600 text-gray-50 rounded-xl px-4 py-3">Simpan Perubahan</button>
                        </div>
                    </div>
                </form>
                <form id="delete-account-section" class="hidden">
                    <div class="p-4 flex flex-row gap-2 items-center">
                        <button type="button" class="p-2 hover:bg-gray-100 rounded-lg" id="back-to-account-setting">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left hover:bg-gray-100 rounded-lg"><path d="m15 18-6-6 6-6"/></svg>
                        </button>
                        <p class="text-lg font-medium ">Hapus Akun</p>
                    </div>
                    <div id="form-delete-account" class="ml-[4rem] mr-[4rem] flex flex-col gap-3">
                        <p class="break-words">Dengan menghapus akun Anda, Anda tidak akan lagi dapat mengakses layanan kami atau data yang terkait dengan akun Anda. Pastikan untuk menyimpan atau mentransfer data penting sebelum melanjutkan</p>
                        <p class="break-words">Anda dapat membatalkan penghapusan akun dalam waktu 30 hari setelah tindakan ini. Setelah itu, akun dan data yang terkait akan dihapus secara permanen.</p>
                        <p class="break-words">Untuk mengonfirmasi tindakan ini, masukkan password akun Anda:</p>
                        <div class="flex flex-col pb-4 w-full">
                            <input aria-describedby="confirm-password-to-delete-accountValidation" class="rounded-lg outline-lime-600 relative border-0 text-base w-full h-16 shadow-md px-3" type="text" name="confirm-password-to-delete-account" id="confirm-password-to-delete-account" placeholder="Masukkan password">
                            <p id="confirm-password-to-delete-accountValidation" class="text-red-500 text-sm" aria-live="polite"></p>
                            </div>
                        <div class="place-self-end">
                            <button type="submit" class="bg-lime-600 text-gray-50 rounded-xl px-4 py-3">Hapus Akun</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `;
  }
}

customElements.define('setting-account', SettingAccount);
