class FormDaftarRadio extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  _emptyContent() {
    this.innerHTML = '';
  }

  // eslint-disable-next-line class-methods-use-this
  _submitForm() {
    const form = document.querySelector('#form-select-role');
    const role = form.elements.role.value;
    let url = window.location.origin;
    url = `${url}/#/register?role=${encodeURIComponent(role)}`;
    window.location.href = url;
  }

  render() {
    this._emptyContent();
    this.innerHTML += `
        <div class="max-w-screen-md">
        <div class="pb-12">
        <h1 class="text-4xl font-bold pb-6">Mari Bergabung</h1>
        <p class="text-lg"> Pilihlah peran yang paling cocok dengan aktivitas Anda!</p>
        </div>  
        <div>
        <div class="text-lg pb-3">Daftar Sebagai</div>
        <form id='form-select-role'>
        <div class="flex flex-row items-center w-full gap-4 p-4 pb-8">
        <div class="w-5 h-5">
        <input class="w-5 h-5 p-3 cursor-pointer accent-lime-600" type="radio" id="mitra" name="role" value="mitra" required>
        </div>
        <div class="flex flex-col">
        <label for="mitra" class="text-lime-600 text-lg font-semibold cursor-pointer">mitra</label>
        <label for="mitra" class="cursor-pointer text-lg">Saya ingin menjual sampah saya untuk diolah kembali</label>
        </div>
        </div>
        <div class="flex flex-row items-center w-full gap-4 p-4 pb-16">
        <div class="w-5 h-5">
        <input class="w-5 h-5 p-3 cursor-pointer accent-lime-600" type="radio" id="kolaborator" name="role" value="kolaborator" required>
        </div>
        <div class="flex flex-col">
        <label for="kolaborator" class="text-lime-600 text-lg font-semibold cursor-pointer">Kolaborator</label>
        <label for="kolaborator" class="cursor-pointer text-lg">Saya ingin menjadi bagian dari solusi dengan mengumpulkan dan mengolah sampah dari Suplier</label>
        </div>
        </div>
        <div class="flex items-center flex-col">
        <button type="submit" class="bg-lime-600 w-full h-12 rounded-lg text-white my-5">Lanjutkan</button>
        <p class="font-medium">Sudah punya akun? <a href="#/login"><span class="text-lime-600 font-semibold">Login</span></a></p>
        </div>
        </form>
        </div>
        </div>
        `;
    const form = document.querySelector('#form-select-role');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitForm();
    });
  }
}
customElements.define('form-daftar-radio', FormDaftarRadio);
