class FormDaftarAkun extends HTMLElement {
  constructor() {
    super();
    this.render();
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
        <form id='form-create-acc'>
        <div class="flex flex-col pb-4 w-full">
        <label for="email" class="font-medium py-2">Email</label>
        <input class="rounded-lg outline-lime-600 relative border-0 text-lg w-full h-16 shadow-md px-3" type="text" name="email" id="email" placeholder="example@example.com" required>
        </div>
        <div class="flex flex-col pb-4 w-full relative">
        <label for="password" class="font-medium py-2">Password</label>
        <input class="rounded-lg outline-lime-600 relative border-0 text-lg w-full h-16 shadow-md pl-3 pr-10" type="password" name="password" id="password" placeholder="Masukan password" required><svg class="absolute bottom-9 right-3  text-zinc-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
        </div>
        <div class="flex flex-col pb-4 w-full relative">
        <label for="password2" class="font-medium py-2">Konfirmasi</label>
        <input class="rounded-lg outline-lime-600 relative border-0 text-lg w-full h-16 shadow-md pl-3 pr-10" type="password" name="password2" id="password2" placeholder="Konfirmasi password" required><svg class="absolute bottom-9 right-3  text-zinc-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
        </div>
        <div class="flex items-center flex-col">
        <button type="submit" class="bg-lime-600 w-full h-12 rounded-lg text-white my-5">Lanjutkan</button>
        <p class="font-medium">Sudah punya akun? <a href="#/login"><span class="text-lime-600 font-semibold">Login</span></a></p>
        </div>
        </form>
        </div>
        </div>
        `;
  }
}
customElements.define('form-daftar-akun', FormDaftarAkun);
