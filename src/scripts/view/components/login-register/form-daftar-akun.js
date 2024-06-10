/* eslint-disable class-methods-use-this */
class FormDaftarAkun extends HTMLElement {
  constructor() {
    super();
    this.render();
    this.eyeButton('passwordEyeButton', 'password');
    this.eyeButton('password2EyeButton', 'password2');
    this.formSubmitValidation();
  }

  _emptyContent() {
    this.innerHTML = '';
  }

  eyeButton(buttonId, inputId) {
    document.querySelector(`#${buttonId}`).addEventListener('click', () => {
      const inputElement = document.querySelector(`#${inputId}`);
      if (inputElement.getAttribute('type') === 'password') {
        document.querySelector(`#${buttonId}`).innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>';
        inputElement.setAttribute('type', 'text');
      } else {
        document.querySelector(`#${buttonId}`).innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>';
        inputElement.setAttribute('type', 'password');
      }
    });
  }

  formSubmitValidation() {
    const form = document.querySelector('#form-create-acc');
    const email = form.querySelector('#email');
    const username = form.querySelector('#username');
    const password = form.querySelector('#password');
    const password2 = form.querySelector('#password2');
    function customValidationEmptyHandler(event) {
      event.target.setCustomValidity('');
      if (event.target.validity.typeMismatch) {
        event.target.setCustomValidity('Masukan email yang valid');
      } else if (event.target.validity.valueMissing) {
        event.target.setCustomValidity('Bagian ini tidak boleh kosong.');
      } else if (event.target.validity.tooShort) {
        const minChar = event.target.getAttribute('minLength');
        event.target.setCustomValidity(`Telalu pendek, anda kurang ${minChar - event.target.value.length} karakter`);
      }
      if (event.target.name === 'password2') {
        if (event.target.value !== password.value) {
          event.target.setCustomValidity('Password tidak sama');
        }
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
    const inputForms = [email, username, password, password2];
    inputEvents.forEach((eventType) => {
      inputForms.forEach((input) => {
        input.addEventListener(eventType, customValidationEmptyHandler);
      });
      if (eventType !== 'click' && eventType !== 'change') {
        email.addEventListener(eventType, (event) => { customMessage(event, 'emailValidation'); });
        username.addEventListener(eventType, (event) => { customMessage(event, 'usernameValidation'); });
        password.addEventListener(eventType, (event) => { customMessage(event, 'passwordValidation'); });
        password2.addEventListener(eventType, (event) => { customMessage(event, 'password2Validation'); });
      }
    });
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
        <input aria-describedby="emailValidation" class="rounded-lg outline-lime-600 relative border-0 text-lg w-full h-16 shadow-md px-3" type="email" name="email" id="email" placeholder="example@example.com" required>
        <p id="emailValidation" class="text-red-500 text-sm" aria-live="polite"></p>
        </div>
        <div class="flex flex-col pb-4 w-full">
        <label for="username" class="font-medium py-2">Username</label>
        <input aria-describedby="usernameValidation" class="rounded-lg outline-lime-600 relative border-0 text-lg w-full h-16 shadow-md px-3" type="text" name="username" id="username" placeholder="myusername" required>
        <p id="usernameValidation" class="text-red-500 text-sm" aria-live="polite"></p>
        </div>
        <div class="flex flex-col pb-4 w-full relative">
        <label for="password" class="font-medium py-2">Password</label>
        <input aria-describedby="passwordValidation" class="rounded-lg outline-lime-600 relative border-0 text-lg w-full h-16 shadow-md pl-3 pr-10" type="password" minlength="8" name="password" id="password" placeholder="Masukan password" required><div id="passwordEyeButton" class="absolute top-[60px] right-3  text-zinc-300"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg></div>
        <p id="passwordValidation" class="text-red-500 text-sm" aria-live="polite"></p>
        </div>
        <div class="flex flex-col pb-4 w-full relative">
        <label for="password2" class="font-medium py-2">Konfirmasi</label>
        <input aria-describedby="password2Validation" class="rounded-lg outline-lime-600 relative border-0 text-lg w-full h-16 shadow-md pl-3 pr-10" type="password" minlength="8" name="password2" id="password2" placeholder="Konfirmasi password" required><div id="password2EyeButton" class="absolute top-[60px] right-3  text-zinc-300"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg></div>
        <p id="password2Validation" class="text-red-500 text-sm" aria-live="polite"></p>
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
