import API_ENDPOINT from "../../../../global/api-endpoint";
import Cookies from "../../../../utils/cookies.";

/* eslint-disable class-methods-use-this */
class CollaboratorSettingProfile extends HTMLElement {
  constructor() {
    super();
    this._settingProfileData = {
      fullname: null,
      address: null,
      city: null,
      province: null,
      phone: null,
    };
  }

  connectedCallback() {
    this.render();
    this.formSubmit();
  }

  set settingProfileData(value) {
    this._settingProfileData = value;
    this.render();
    this.formSubmit();
  }

  get settingProfileData() {
    return this._settingProfileData;
  }

  formSubmit() {
    const form = document.querySelector('#profileSettingForm');
    const name = form.querySelector('#name');
    const address = form.querySelector('#address');
    const city = form.querySelector('#city');
    const province = form.querySelector('#province');
    const phone = form.querySelector('#phone');
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
    const inputForms = [name, address, city, province, phone];
    inputEvents.forEach((eventType) => {
      inputForms.forEach((input) => {
        input.addEventListener(eventType, customValidationEmptyHandler);
      });
      if (eventType !== 'click' && eventType !== 'change') {
        name.addEventListener(eventType, (event) => { customMessage(event, 'nameValidation'); });
        address.addEventListener(eventType, (event) => { customMessage(event, 'addressValidation'); });
        city.addEventListener(eventType, (event) => { customMessage(event, 'cityValidation'); });
        province.addEventListener(eventType, (event) => { customMessage(event, 'provinceValidation'); });
        phone.addEventListener(eventType, (event) => { customMessage(event, 'phoneValidation'); });
      }
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = {
        id: Cookies.getUserId(),
        username: this.settingProfileData.username,
        name: form.elements.name.value,
        address: `${form.elements.address.value}+${form.elements.city.value}+${form.elements.province.value}`,
        phoneNumber: `+62${form.elements.phone.value.slice(1)}`,
        email: this.settingProfileData.email,
        password: '12345678',
        website: 'edit',
        description: 'edit',
        role: Cookies.getRole(),
      };
      console.log(formData);
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.getToken()}`,
        },
        body: JSON.stringify(formData),
      };
      console.log(options);
      document.querySelector('main').innerHTML += `
        <div id="loading" class="top-0 right-0 fixed z-[999] flex justify-center items-center w-full h-full bg-opacity-40 bg-black">
            <div class="loading z-[999]"></div>
        </div>`;
      fetch(API_ENDPOINT.DETAIL_PARTNER(Cookies.getUserId()), options)
        .then((response) => response.json())
        .then((result) => {
          if (result.error) {
            console.log(result);
            document.querySelector('#loading').remove();
            const alert = document.createElement('error-alert');
            alert.alertData = {
              header: 'Edit User Gagal',
              desc: result.error,
              button: 'Tutup',
              link: null,
            };
            document.querySelector('main').append(alert);
          } else {
            document.querySelector('#loading').remove();
            location.reload();
          }
        });
    });
  }

  render() {
    this.innerHTML = `
    <div id="profile-setting" class="flex flex-col gap-4">
    <form id="profileSettingForm" class="flex- flex-col">
        <div class="flex flex-row gap-10 items-center">
            <img src="https://yt3.googleusercontent.com/ytc/AIdro_ndItzJEgeNIMkMeMRnFGFjUCxCmCvmzQZ_s-MYCEp6fA=s900-c-k-c0x00ffffff-no-rj" alt="Foto Profil " class="w-[90px] h-[90px] rounded-2xl">
            <div class="flex flex-col pb-4 w-full">
                <label for="name" class="text-base font-regular py-2">Nama</label>
                <input aria-describedby="nameValidation" class="rounded-lg outline-lime-600  border-0 text-base w-full h-16 shadow-md px-3" type="text" name="name" id="name" placeholder="Nama User" value="${this.settingProfileData.fullname}" required>
                <p id="nameValidation" class="text-red-500 text-sm" aria-live="polite"></p>
            </div>
        </div>
        <div class="flex flex-row justify-between gap-8">
            <div class="flex flex-col pb-4 w-full">
                <label for="address" class="text-base font-medium py-2">Alamat</label>
                <input aria-describedby="addressValidation" class="rounded-lg outline-lime-600  border-0 text-base w-full h-16 shadow-md px-3" type="text" name="address" id="address" placeholder="Alamat User" value="${this.settingProfileData.address}" required>
                <p id="addressValidation" class="text-red-500 text-sm" aria-live="polite"></p>
            </div>
            <div class="flex flex-col pb-4 w-full">
                <label for="city" class="font-medium text-base py-2">Kota</label>
                <input aria-describedby="cityValidation" class="rounded-lg outline-lime-600  border-0 text-base w-full h-16 shadow-md px-3" type="text" name="city" id="city" placeholder="Kota User" value="${this.settingProfileData.city}" required>
                <p id="cityValidation" class="text-red-500 text-sm" aria-live="polite"></p>
            </div>
            <div class="flex flex-col pb-4 w-full">
                <label for="province" class="font-medium text-base py-2">Provinsi</label>
                <input aria-describedby="provinceValidation" class="rounded-lg outline-lime-600  border-0 text-base w-full h-16 shadow-md px-3" type="text" name="province" id="province" placeholder="Provinsi User" value="${this.settingProfileData.province}" required>
                <p id="provinceValidation" class="text-red-500 text-sm" aria-live="polite"></p>
            </div>
        </div>
        <div class="flex flex-col pb-4 w-full">
            <label for="phone" class="font-medium text-base py-2">Nomor Telpon</label>
            <input aria-describedby="phoneValidation" class="rounded-lg outline-lime-600  border-0 text-base w-full h-16 shadow-md px-3" type="tel" name="phone" id="phone" placeholder="Nomor Telpon" value="${this.settingProfileData.phone}" required>
            <p id="phoneValidation" class="text-red-500 text-sm" aria-live="polite"></p>
        </div>
        <div class="place-self-end">
        <button type="submit" class="bg-lime-600 text-gray-50 rounded-xl px-4 py-3">Simpan Perubahan</button>
        </div>
    </form>
    </div>
    `;
  }
}
customElements.define('collaborator-setting-profile', CollaboratorSettingProfile);
