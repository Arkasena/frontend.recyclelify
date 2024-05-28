class FormDaftarUserProfile extends HTMLElement {
  constructor() {
    super();
    this._formData = {
      role: null,
      email: null,
      password: null,
      placeholder: null,
    };
  }

  connectedCallback() {
    this.render();
  }

  set formData(value) {
    this._formData = value;
    this.render();
  }

  get formData() {
    return this._formData;
  }

  _emptyContent() {
    this.innerHTML = '';
  }

  render() {
    this._emptyContent();
    this.innerHTML += `
        <div class="max-w-screen-md">
        <div class="pb-14">
        <h1 class="text-4xl font-bold pb-6">Mari Bergabung</h1>
        <p class="text-lg"> Segera buat akun Anda dan mulailah menjual sampah dengan mudah</p>
        </div>  
        <div>
        <form id='form-user-profile'>
        <input type="hidden" id="mitra" name="role" value="${this.formData.role}" >
        <input type="hidden" name="email" id="email" value="${this.formData.email}">
        <input type="hidden" name="password" id="password" value="${this.formData.password}">
        <div class="flex flex-col pb-4 w-full">
        <label for="name" class="font-medium py-2">Nama</label>
        <input class="rounded-lg outline-lime-600 relative border-0 text-lg w-full h-16 shadow-md px-3" type="text" name="name" id="name" placeholder="${this.formData.placeholder}" required>
        </div>
        <div class="flex flex-col pb-4 w-full relative">
        <label for="telepon" class="font-medium py-2">Nomor Telepon</label>
        <input class="rounded-lg outline-lime-600 relative border-0 text-lg w-full h-16 shadow-md px-3" type="text" name="telepon" id="telepon" placeholder="081234567890" required>
        </div>
        <div class="flex flex-col pb-4 w-full relative">
        <label for="alamat" class="font-medium py-2">Alamat</label>
        <input class="rounded-lg outline-lime-600 relative border-0 text-lg w-full h-16 shadow-md px-3" type="text" name="alamat" id="alamat" placeholder="Jl. Soekarno Hatta No.4A" required>
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
