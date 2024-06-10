/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-constructor */
class FormDaftarUserProfile extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.formSubmitValidation();
  }

  formSubmitValidation() {
    const form = document.querySelector('#form-user-profile');
    const name = form.querySelector('#name');
    const telepon = form.querySelector('#telepon');
    const alamat = form.querySelector('#alamat');
    const kota = form.querySelector('#kota');
    const provinsi = form.querySelector('#provinsi');
    function customValidationEmptyHandler(event) {
      event.target.setCustomValidity('');
      if (event.target.validity.valueMissing) {
        event.target.setCustomValidity('Bagian ini tidak boleh kosong.');
      }
    }
    function customMessage(event, element) {
      const isValid = event.target.validity.valid;
      const errorMessage = event.target.validationMessage;
      const connectedValidationEl = form.querySelector(`#${element}`);
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
    const inputForms = [alamat, telepon, name, kota, provinsi];
    inputEvents.forEach((eventType) => {
      inputForms.forEach((input) => {
        input.addEventListener(eventType, customValidationEmptyHandler);
      });
      if (eventType !== 'click' && eventType !== 'change') {
        name.addEventListener(eventType, (event) => { customMessage(event, 'nameValidation'); });
        telepon.addEventListener(eventType, (event) => { customMessage(event, 'teleponValidation'); });
        alamat.addEventListener(eventType, (event) => { customMessage(event, 'alamatValidation'); });
        kota.addEventListener(eventType, (event) => { customMessage(event, 'kotaValidation'); });
        provinsi.addEventListener(eventType, (event) => { customMessage(event, 'provinsiValidation'); });
      }
    });
  }

  _emptyContent() {
    this.innerHTML = '';
  }

  render() {
    this._emptyContent();
    this.classList.add('flex-1', 'p-24', 'h-full', 'bg-white', 'flex', 'flex-col', 'justify-center', 'items-center', 'rounded-r-[52px]');
    this.innerHTML += `
        <div class="max-w-screen-md">
        <div class="pb-14">
        <h1 class="text-4xl font-bold pb-6">Mari Bergabung</h1>
        <p class="text-lg"> Segera buat akun Anda dan mulailah menjual sampah dengan mudah</p>
        </div>  
        <div>
        <form id='form-user-profile'>
        <div class="flex flex-col pb-4 w-full">
        <label for="name" class="font-medium py-2">Nama</label>
        <input aria-describedby="nameValidation" class="rounded-lg outline-lime-600 border-0 text-lg w-full h-16 shadow-md px-3" type="text" name="name" id="name" placeholder="Nama lengkap/Nama Perusahaan" required>
        <p id="nameValidation" class="text-red-500 text-sm" aria-live="polite"></p>
        </div>
        <div class="flex flex-col pb-4 w-full relative">
        <label for="telepon" class="font-medium py-2">Nomor Telepon</label>
        <div class="p-2 flex flex-row border-0 text-lg w-full h-16 shadow-md px-3 items-center outline-lime-600 rounded-lg"><span class="font-medium pr-2">+62</span><input aria-describedby="teleponValidation" class="placeholder:text-left w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-none" type="number" id="telepon" name="telepon" placeholder="812345678901" required></div>
        <p id="teleponValidation" class="text-red-500 text-sm" aria-live="polite"></p>
        </div>
        <div class="flex flex-col pb-4 w-full relative">
        <label for="alamat" class="font-medium py-2">Alamat</label>
        <input aria-describedby="alamatValidation" class="rounded-lg outline-lime-600 border-0 text-lg w-full h-16 shadow-md px-3" type="text" name="alamat" id="alamat" placeholder="Jl. Soekarno Hatta No.4A" required>
        <p id="alamatValidation" class="text-red-500 text-sm" aria-live="polite"></p>
        </div>
        <div class="flex flex-col pb-4 w-full relative">
            <label for="kota" class="font-medium py-2">Kota</label>
            <input aria-describedby="kotaValidation" class="rounded-lg outline-lime-600 border-0 text-lg w-full h-16 shadow-md px-3" type="text" name="kota" id="kota" placeholder="Cikarang" required>
            <p id="kotaValidation" class="text-red-500 text-sm" aria-live="polite"></p>
        </div>
        <div class="flex flex-col pb-4 w-full relative">
            <label for="provinsi" class="font-medium py-2">Provinsi</label>
            <input aria-describedby="provinsiValidation" class="rounded-lg outline-lime-600 border-0 text-lg w-full h-16 shadow-md px-3" type="text" name="provinsi" id="provinsi" placeholder="Jawa Barat" required>
            <p id="provinsiValidation" class="text-red-500 text-sm" aria-live="polite"></p>
        </div>
        <div class="flex items-center flex-col">
        <button type="submit" class="bg-lime-600 w-full h-12 rounded-lg text-white my-5">Buat akun</button>
        <p class="font-medium">Sudah punya akun? <a href="#/login"><span class="text-lime-600 font-semibold">Login</span></a></p>
        </div>
        </form>
        </div>
        </div>
        `;
  }
}
customElements.define('form-daftar-user-profile', FormDaftarUserProfile);
