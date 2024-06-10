/* eslint-disable class-methods-use-this */
class FormLoginContent extends HTMLElement {
  constructor() {
    super();
    this.render();
    this.eyeButton('passwordEyeButton', 'password');
    this.formSubmit();
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

  formSubmit() {
    const form = document.querySelector('#form-login');
    const email = form.querySelector('#email');
    const password = form.querySelector('#password');
    function customValidationEmptyHandler(event) {
      event.target.setCustomValidity('');
      if (event.target.validity.typeMismatch) {
        event.target.setCustomValidity('Masukan email yang valid');
      } else if (event.target.validity.valueMissing) {
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
    const inputForms = [email, password];
    inputEvents.forEach((eventType) => {
      inputForms.forEach((input) => {
        input.addEventListener(eventType, customValidationEmptyHandler);
      });
      if (eventType !== 'click' && eventType !== 'change') {
        email.addEventListener(eventType, (event) => { customMessage(event, 'emailValidation'); });
        password.addEventListener(eventType, (event) => { customMessage(event, 'passwordValidation'); });
      }
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = {
        email: form.elements.email.value,
        password: form.elements.password.value,
      };
      console.log(formData);
    });
  }

  render() {
    this._emptyContent();
    this.innerHTML += `
    <div class="max-w-screen-md">
            <div class="pb-12">
                <h1 class="text-4xl font-bold pb-6">Selamat datang kembali</h1>
                <p class="text-base">Masuk ke akun anda dan mulailah berkontribusi pada lingkungan yang lebih bersih dan sehat</p>
            </div>  
            <div>
                <form id='form-login'>
                    <div class="flex flex-col pb-4 w-full">
                        <label for="email" class="font-medium py-2">Email</label>
                        <input aria-describedby="emailValidation" class="rounded-lg outline-lime-600 relative border-0 text-lg w-full h-16 shadow-md px-3" type="email" name="email" id="email" placeholder="example@example.com" required>
                        <p id="emailValidation" class="text-red-500 text-sm" aria-live="polite"></p>
                    </div>
                    <div class="flex flex-col pb-4 w-full relative">
                        <label for="password" class="font-medium py-2">Password</label>
                        <input aria-describedby="passwordValidation" class="rounded-lg outline-lime-600 relative border-0 text-lg w-full h-16 shadow-md pl-3 pr-10" type="password" name="password" id="password" placeholder="Masukan password" required><div id="passwordEyeButton" class="absolute top-[60px] right-3  text-zinc-300"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg></div>
                        <p id="passwordValidation" class="text-red-500 text-sm" aria-live="polite"></p>
                    </div>
                    <div class="flex items-center flex-col">
                        <button type="submit" class="bg-lime-600 w-full h-12 rounded-lg text-white my-5">Masuk</button>
                        <p class="font-medium">Belum punya akun? <a href="#/register"><span class="text-lime-600 font-semibold">Daftar</span></a></p>
                    </div>
                </form>
            </div>
        </div>
`;
  }
}
customElements.define('form-login', FormLoginContent);
