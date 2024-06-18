import API_ENDPOINT from '../../../../global/api-endpoint';
import Cookies from '../../../../utils/cookies.';

/* eslint-disable class-methods-use-this */
class PartnerSettingProfile extends HTMLElement {
  constructor() {
    super();
    this._settingProfileData = {
      fullname: null,
      address: null,
      city: null,
      province: null,
      phone: null,
      website: null,
      description: null,
      username: null,
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
    const website = form.querySelector('#website');
    const description = form.querySelector('#description');
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
    const inputForms = [name, address, city, province, phone, website, description];
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
        website.addEventListener(eventType, (event) => { customMessage(event, 'websiteValidation'); });
        description.addEventListener(eventType, (event) => { customMessage(event, 'descriptionValidation'); });
      }
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // const formData = {
      //   id: Cookies.getUserId(),
      //   username: this.settingProfileData.username,
      //   name: form.elements.name.value,
      //   address: `${form.elements.address.value}+${form.elements.city.value}+${form.elements.province.value}`,
      //   phoneNumber: `+62${form.elements.phone.value.slice(1)}`,
      //   email: this.settingProfileData.email,
      //   password: '12345678',
      //   website: form.elements.website.value,
      //   description: form.elements.description.value,
      //   role: Cookies.getRole(),
      // };
      const formData = new FormData();
      formData.append('id', Cookies.getUserId());
      formData.append('username', this.settingProfileData.username);
      formData.append('name', form.elements.name.value);
      formData.append('address', `${form.elements.address.value}+${form.elements.city.value}+${form.elements.province.value}`);
      formData.append('phoneNumber', `+62${form.elements.phone.value.slice(1)}`);
      formData.append('email', this.settingProfileData.email);
      formData.append('password', '12345678');
      formData.append('website', form.elements.website.value);
      formData.append('description', form.elements.description.value);
      formData.append('role', Cookies.getRole());
      // Ambil file gambar jika ada
      const pictureInput = form.querySelector('#profilePictureInput');
      if (pictureInput.files.length > 0) {
        formData.append('photo', pictureInput.files[0]);
      }
      const options = {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${Cookies.getToken()}`,
        },
        body: formData,
      };
      console.log(options);
      document.querySelector('main').innerHTML += `
        <div id="loading" class="top-0 right-0 fixed z-[999] flex justify-center items-center w-full h-full bg-opacity-40 bg-black">
            <div class="loading z-[999]"></div>
        </div>`;
      fetch(API_ENDPOINT.DETAIL_PARTNER(Cookies.getUserId()), options)
        .then((response) => {
          console.log(response);
          if (!response.ok) {
            document.querySelector('#loading').remove();
            const alert = document.createElement('error-alert');
            alert.alertData = {
              header: 'Edit User Gagal',
              desc: 'Edit user gagal',
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
                <label for="profilePictureInput" class="relative">
                    <input accept=".jpg, .jpeg, .png" id="profilePictureInput" name="profilePictureInput" type="file" class="hidden">
                    <div class="w-[90px] h-[90px] rounded-2xl overflow-hidden flex justify-center items-center bg-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        <img id="preview" src="${this.settingProfileData.profilePicture || './images/others/blank-profile.png'}" alt="Preview" class="absolute h-full w-full object-cover rounded-md">
                    </div>
                </label>
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
            <div class="flex flex-row gap-6 justify-between">
                <div class="flex flex-col pb-4 w-full">
                    <label for="phone" class="font-medium text-base py-2">Nomor Telpon</label>
                    <input aria-describedby="phoneValidation" class="rounded-lg outline-lime-600  border-0 text-base w-full h-16 shadow-md px-3" type="tel" name="phone" id="phone" placeholder="Nomor Telpon" value="${this.settingProfileData.phone}" required>
                    <p id="phoneValidation" class="text-red-500 text-sm" aria-live="polite"></p>
                </div>
                <div class="flex flex-col pb-4 w-full">
                    <label for="website" class="font-medium text-base py-2">Website</label>
                    <input aria-describedby="websiteValidation" class="rounded-lg outline-lime-600  border-0 text-base w-full h-16 shadow-md px-3" type="tel" name="website" id="website" placeholder="Website" value="${this.settingProfileData.website}" required>
                    <p id="websiteValidation" class="text-red-500 text-sm" aria-live="polite"></p>
                </div>
            </div>
            <div class="flex flex-col pb-4 w-full">
                <label for="description" class="font-medium text-base py-2">Deskripsi Perusahaan</label>
                <textarea aria-describedby="descriptionValidation" class="rounded-lg outline-lime-600  border-0 text-base w-full h-16  p-4 shadow-md px-3" 
                name="description" id="description" placeholder="Deskripsi Perusahaan" required 
                style="min-height: 176px; resize: none; white-space: pre-wrap;">${this.settingProfileData.description}</textarea>
                <p id="descriptionValidation" class="text-red-500 text-sm" aria-live="polite"></p>
            </div>
            <div class="place-self-end">
                <button type="submit" class="bg-lime-600 text-gray-50 rounded-xl px-4 py-3">Simpan Perubahan</button>
            </div>
        </form>
    </div>
    `;

    // Preview image functionality
    const pictureInput = this.querySelector('#profilePictureInput');
    const preview = this.querySelector('#preview');

    pictureInput.addEventListener('change', () => {
      const file = pictureInput.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        preview.src = reader.result;
      };
      if (file) {
        reader.readAsDataURL(file);
      } else {
        preview.src = '';
      }
    });
  }
}
customElements.define('partner-setting-profile', PartnerSettingProfile);
