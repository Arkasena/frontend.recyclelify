/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
class FormBantuan extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this._submitForm();
  }

  _submitForm() {
    const form = document.querySelector('#form-bantuan');
    const { name } = form.elements;
    const { email } = form.elements;
    const { message } = form.elements;
    function customValidationHandler(event) {
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
    const inputForms = [name, email, message];
    inputEvents.forEach((eventType) => {
      inputForms.forEach((input) => {
        input.addEventListener(eventType, customValidationHandler);
      });
      if (eventType !== 'click' && eventType !== 'change') {
        name.addEventListener(eventType, (event) => { customMessage(event, 'nameValidation'); });
        email.addEventListener(eventType, (event) => { customMessage(event, 'emailValidation'); });
        message.addEventListener(eventType, (event) => { customMessage(event, 'messageValidation'); });
      }
    });
  }

  _emptyContent() {
    this.innerHTML = '';
  }

  render() {
    this._emptyContent();
    this.classList.add('w-full', 'max-w-[1500px]', 'flex', 'flex-col', 'gap-16', 'justify-center', 'px-6', 'my-20', 'sm:flex-row');
    this.innerHTML += `
    <div class="w-full max-w-[640px]">
    <form id='form-bantuan'>
        <div class="flex flex-col pb-4 w-full">
            <label for="name" class="font-medium py-2">Nama</label>
            <input aria-describedby="nameValidation" class="rounded-lg outline-lime-600 relative border-0 text-lg w-full h-16 shadow-md px-3" type="text" name="name" id="name" placeholder="Masukan nama anda" required>
            <p id="nameValidation" class="text-red-500 text-sm" aria-live="polite"></p>
            </div>
        <div class="flex flex-col pb-4 w-full">
            <label for="email" class="font-medium py-2">Email</label>
            <input aria-describedby="emailValidation" class="rounded-lg outline-lime-600 relative border-0 text-lg w-full h-16 shadow-md px-3" type="email" name="email" id="email" placeholder="example@example.com" required>
            <p id="emailValidation" class="text-red-500 text-sm" aria-live="polite"></p>
            </div>
        <div class="flex flex-col pb-4 w-full">
            <label for="message" class="font-medium py-2">Pesan</label>
            <input aria-describedby="messageValidation" class="rounded-lg outline-lime-600 relative border-0 text-lg w-full h-16 shadow-md px-3" type="text" name="message" id="message" placeholder="Masukan pesan anda" required>
            <p id="messageValidation" class="text-red-500 text-sm" aria-live="polite"></p>
            </div>
        <div class="flex items-center">
            <button type="submit" class="bg-lime-600 px-4 h-10 rounded-xl text-white my-5">Kirim Pesan</button>
        </div>
    </form>
</div>
<div class="flex flex-col gap-4 self-center -order-1 sm:self-start sm:order-1">
    <h2 class="text-lg font-medium mb-4">Hubungi kami melalui:</h2>
    <div class="flex flex-row items-center gap-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
        <span class="font-medium">suport@recyclelify.com</span>
    </div>
    <div class="flex flex-row items-center gap-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        <span class="font-medium">+62 88222999109</span>
    </div>
</div>
        `;
  }
}
customElements.define('form-bantuan', FormBantuan);
