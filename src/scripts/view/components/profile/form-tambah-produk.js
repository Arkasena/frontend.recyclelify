/* eslint-disable no-script-url */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */

import API_ENDPOINT from '../../../global/api-endpoint';
import Cookies from '../../../utils/cookies.';

/* eslint-disable class-methods-use-this */
class FormProduk extends HTMLElement {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
    this._formData = {
      name: '',
      price: '',
      link: '',
      description: '',
      category: [],
    };
  }

  connectedCallback() {
    this.render();
    this.formSubmit();
    this.checkedCheckbox();
    this.previewGambar();
  }

  set formData(value) {
    this._formData = value;
    this.render();
    this.formSubmit();
    this.checkedCheckbox();
    this.previewGambar();
  }

  get formData() {
    return this._formData;
  }

  _emptyContent() {
    this.innerHTML = '';
  }

  checkedCheckbox() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      if ((this.formData.category).includes(checkbox.value)) {
        checkbox.checked = true;
      }
    });
  }

  formSubmit() {
    const form = document.querySelector('#productForm');
    const nama = form.querySelector('#name');
    const harga = form.querySelector('#price');
    const linkPembelian = form.querySelector('#link');
    const deskripsi = form.querySelector('#description');
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
    const inputForms = [nama, harga, linkPembelian, deskripsi];
    inputEvents.forEach((eventType) => {
      inputForms.forEach((input) => {
        input.addEventListener(eventType, customValidationEmptyHandler);
      });
      if (eventType !== 'click' && eventType !== 'change') {
        nama.addEventListener(eventType, (event) => { customMessage(event, 'nameValidation'); });
        harga.addEventListener(eventType, (event) => { customMessage(event, 'priceValidation'); });
        linkPembelian.addEventListener(eventType, (event) => { customMessage(event, 'linkValidation'); });
        deskripsi.addEventListener(eventType, (event) => { customMessage(event, 'descriptionValidation'); });
      }
    });
    document.querySelector('#submitProduk').addEventListener('click', () => {
      const validationMessage = form.querySelector('#productTypeValidation');
      const checkedValues = Array.from(form.elements.productType)
        .filter((input) => input.checked)
        .map((input) => input.value);
      if (checkedValues.length === 0) {
        validationMessage.innerText = 'Minimal pilih 1 kategori';
      } else {
        validationMessage.innerText = '';
      }
    });
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      // Mengambil nilai dari elemen-elemen formulir
      const pictureInput = form.elements.picture;
      let file;
      if (pictureInput.files.length > 0) {
        file = pictureInput.files[0];
      }
      const name = form.elements.name.value;
      const price = form.elements.price.value;
      const link = form.elements.link.value;
      const description = form.elements.description.value;
      const checkedValues = Array.from(form.elements.productType)
        .filter((input) => input.checked)
        .map((input) => input.value);

      // Membuat objek FormData baru
      const formData = new FormData();
      formData.append('partnerId', Cookies.getUserId());
      formData.append('name', name);
      formData.append('price', price);
      formData.append('link', link);
      formData.append('description', description);
      formData.append('productType', JSON.stringify(checkedValues));
      if (file) {
        formData.append('photo', file);
      }

      // Kirim data menggunakan fetch
      const options = {
        method: form.elements.id ? 'PUT' : 'POST',
        headers: {
          Authorization: `Bearer ${Cookies.getToken()}`,
        },
        body: formData,
      };

      // Handle request berdasarkan metode PUT atau POST
      const endpoint = form.elements.id
        ? `${API_ENDPOINT.DETAIL_PRODUCT(form.elements.id.value)}`
        : API_ENDPOINT.PRODUCT;

      document.querySelector('main').innerHTML += `
          <div id="loading" class="top-0 right-0 fixed z-[999] flex justify-center items-center w-full h-full bg-opacity-40 bg-black">
            <div class="loading z-[999]"></div>
          </div>`;

      fetch(endpoint, options)
        .then((response) => response.json())
        .then((result) => {
          if (result.error) {
            document.querySelector('#loading').remove();
            const alert = document.createElement('error-alert');
            alert.alertData = {
              header: 'Tambah Produk Gagal',
              desc: result.error.details[0].message,
              button: 'Muat ulang',
              link: 'javascript:location.reload()',
            };
            document.querySelector('main').append(alert);
          } else {
            const productCategories = ['aksesoris', 'dekorasi', 'busana', 'furnitur', 'lainnya'];
            const dataCategories = checkedValues.map((category) => ({
              productId: result.data.id,
              categoryId: productCategories.indexOf(category) + 1,
            }));

            // Kirim data kategori produk
            const categoryPromises = dataCategories.map((categories) => {
              const categoriesOptions = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${Cookies.getToken()}`,
                },
                body: JSON.stringify(categories),
              };
              return fetch(API_ENDPOINT.PRODUCT_CATEGORIES, categoriesOptions);
            });

            Promise.all(categoryPromises)
              .then((responses) => Promise.all(responses.map((response) => response.json())))
              .then((res) => {
                console.log(res);
                window.location.href = `${window.location.origin}/#/my-profile`;
              })
              .catch((error) => {
                console.error('Error:', error);
              })
              .finally(() => {
                document.querySelector('#loading').remove();
              });
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    });
  }

  previewGambar() {
    document.querySelector('input[type="file"]').addEventListener('change', () => {
      const preview = document.getElementById('preview'); // tempat image
      const file = document.getElementById('picture').files[0];
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

  render() {
    this._emptyContent();
    this.classList.add('flex', 'flex-col');
    this.innerHTML += `
    <div class="flex flex-row gap-4 items-center py-10 w-full">
    <span class="text-lime-700 font-medium">Profil Saya</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
    <span class="text-gray-400">Tambah Item Keranjang</span>
</div>
<div class="flex flex-col w-full max-w-[645px] self-center">
    <form id="productForm" class="flex flex-col gap-8 w-full">
        <h1 class="text-xl font-semibold">Formulir Tambah Produk</h1>
        <div class="flex flex-col w-full border-2 border-dashed border-gray-400 rounded-2xl p-3">
            <label for="picture" class="flex flex-col items-center justify-center w-full aspect-video bg-gray-100 rounded-lg cursor-pointer relative">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image-up"><path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21"/><path d="m14 19.5 3-3 3 3"/><path d="M17 22v-5.5"/><circle cx="9" cy="9" r="2"/></svg>
                    <img src="" id="preview" alt="" class="z-10 absolute max-w-full max-h-full">
                </div>
                <input accept=".jpg, .jpeg, .png" id="picture" name="picture" type="file" class="hidden">
            </label>
            <span class="text-gray-400 text-center pt-3">Upload foto produk</span>
        </div>
        <div class="flex flex-row items-center gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="28" viewBox="0 0 11 28" fill="none"><path d="M0 0H7C9.20914 0 11 1.79086 11 4V24C11 26.2091 9.20914 28 7 28H0V0Z" fill="#84CC16"/></svg>
            <div class="text-xl font-semibold">Detail Pendapatan</div>
        </div>
        <div class="w-full">
            <table class="table-auto w-full border-separate border-spacing-y-4">
                <tr>
                    <td>
                        <label for="name">Nama</label>
                    </td>
                    <td>
                        <div class="flex flex-col w-full">
                            <div class="p-2 w-full shadow-sm border items-center rounded-md"><input aria-describedby="nameValidation" class="placeholder:text-left w-full outline-none" type="text" id="name" name="name" value="${this.formData.name}" placeholder="Masukan nama produk"  required></div>
                            <p id="nameValidation" class="text-red-500 text-sm" aria-live="polite"></p>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="price">Harga</label>
                    </td>
                    <td>
                        <div class="flex flex-col w-full">
                        <div class="p-2 flex flex-row w-full shadow-sm border items-center rounded-md"><span class="font-medium pr-2">Rp.</span><input aria-describedby="priceValidation" class="placeholder:text-left w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-none" type="number" value="${this.formData.price}" id="price" name="price" placeholder="100.000" required></div>
                            <p id="priceValidation" class="text-red-500 text-sm" aria-live="polite"></p>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="link">Link Penjualan</label>
                    </td>
                    <td>
                        <div class="flex flex-col w-full">
                            <div class="p-2 w-full shadow-sm border items-center rounded-md"><input aria-describedby="linkValidation" class="placeholder:text-left w-full outline-none" type="text" id="link" name="link" value="${this.formData.link}" placeholder="Masukan link penjualan produk" required></div>
                            <p id="linkValidation" class="text-red-500 text-sm" aria-live="polite"></p>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="align-top">
                        <label for="description">Deskripsi</label>
                    </td>
                    <td>
                        <div class="p-2 w-full shadow-sm border items-center rounded-md">
                            <textarea name="description" id="description" class="w-full placeholder:text-left outline-none h-44" placeholder="Masukan deskripsi produk" required>${this.formData.description}</textarea>
                        </div>
                        <p id="descriptionValidation" class="text-red-500 text-sm" aria-live="polite"></p>
                    </td>
                </tr>
                <tr>
                    <td class="align-top">
                        <label>Kategori Produk Daur Ulang</label>
                    </td>
                    <td>
                        <div class="grid grid-cols-2">
                            <label for="aksesoris" class="text-sm px-2 py-2 flex flex-row items-center"><input type="checkbox" name="productType" id="aksesoris" value="aksesoris" class="mr-2 accent-lime-400 cursor-pointer w-4 h-4 ">Aksesoris</label>
                            <label for="busana" class="text-sm px-2 py-2 flex flex-row items-center"><input type="checkbox" name="productType" id="busana" value="busana" class="mr-2  accent-lime-400 cursor-pointer w-4 h-4 ">Busana</label>
                            <label for="dekorasi" class="text-sm px-2 py-2 flex flex-row items-center"><input type="checkbox" name="productType" id="dekorasi" value="dekorasi" class="mr-2  accent-lime-400 cursor-pointer w-4 h-4 ">Dekorasi</label>
                            <label for="furnitur" class="text-sm px-2 py-2 flex flex-row items-center"><input type="checkbox" name="productType" id="furnitur" value="furnitur" class="mr-2  accent-lime-400 cursor-pointer w-4 h-4 ">Furnitur</label>
                            <label for="lainnya" class="text-sm px-2 py-2 flex flex-row items-center"><input type="checkbox" name="productType" id="lainnya" value="lainnya" class="mr-2  accent-lime-400 cursor-pointer w-4 h-4 ">Lainnya</label>
                        </div>
                        <p id="productTypeValidation" class="text-red-500 text-sm" aria-live="polite"></p>
                    </td>
                </tr>
            </table>
        </div>
        <button type="submit" id="submitProduk" class="w-full text-gray-50 bg-lime-600 rounded-xl h-10 flex items-center justify-center">Simpan</button>
    </form>
</div>
          `;
  }
}
customElements.define('form-produk', FormProduk);
