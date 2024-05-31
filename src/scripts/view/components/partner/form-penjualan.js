/* eslint-disable class-methods-use-this */
class FormPenjualan extends HTMLElement {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
    this._partnerData = {
      id: null,
      name: null,
      phone_number: null,
      address: null,
    };
  }

  connectedCallback() {
    this.render();
    this.dropdownButton('mitraTujuan', 'mitra', 'mitraTujuanSvg');
    this.dropdownButton('detailPenjualan', 'form', 'detailPenjualanSvg');
    this.dropdownButton('detailPendapatan', 'pendapatanInfo', 'detailPendapatanSvg');
    document.querySelector('#pengirimanButton').addEventListener('click', () => { this.pengiriman(); });
    document.querySelector('#antarLangsung').addEventListener('click', () => { this.changeValue('Antar langsung'); });
    document.querySelector('#olehMitra').addEventListener('click', () => { this.changeValue('Penjemputan oleh mitra'); });
    this.formSubmit();
  }

  set partnerData(value) {
    this._partnerData = value;
    this.render();
  }

  get partnerData() {
    return this._partnerData;
  }

  _emptyContent() {
    this.innerHTML = '';
  }

  formSubmit() {
    const form = document.querySelector('#formPenjualanSampah');
    const inputEstimasi = form.querySelector('#estimasi');
    const inputAddress = form.querySelector('#address');
    const inputTelepon = form.querySelector('#telepon');
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
    const inputForms = [inputEstimasi, inputAddress, inputTelepon];
    inputEvents.forEach((eventType) => {
      inputForms.forEach((input) => {
        input.addEventListener(eventType, customValidationEmptyHandler);
      });
      if (eventType !== 'click' && eventType !== 'change') {
        inputEstimasi.addEventListener(eventType, (event) => { customMessage(event, 'estimasiValidation'); });
        inputAddress.addEventListener(eventType, (event) => { customMessage(event, 'alamatValidation'); });
        inputTelepon.addEventListener(eventType, (event) => { customMessage(event, 'teleponValidation'); });
      }
    });
    document.querySelector('#submitJualSampah').addEventListener('click', () => {
      console.log('adfasdf');
      const selector = document.querySelector('#form');
      if (selector.classList.contains('hidden')) {
        selector.classList.toggle('hidden');
        const svgDiv = document.querySelector('#detailPenjualanSvg');
        if (!selector.classList.contains('hidden')) {
          svgDiv.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-up"><path d="m18 15-6-6-6 6"/></svg>';
        } else {
          svgDiv.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>';
        }
      }
      const validationMessage = form.querySelector('#pengirimanValidation');
      const inputPengiriman = form.querySelector('#inputPengiriman');
      if (!inputPengiriman.value) {
        validationMessage.innerText = 'Pilih salah satu metode pengiriman sampah';
      } else {
        validationMessage.innerText = '';
      }
      const plasticType = form.querySelector('#plasticType');
      const plasticTypeValidationMessage = form.querySelector('#plasticTypeValidation');
      if (!plasticType.value) {
        plasticTypeValidationMessage.innerText = 'Pilih salah satu kategori sampah';
      } else {
        plasticTypeValidationMessage.innerText = '';
      }
    });
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const inputPengiriman = form.querySelector('#inputPengiriman');
      const plasticType = form.querySelector('#plasticType');
      if (plasticType.value && inputPengiriman.value) {
        const data = {
          plasticType: form.elements.plasticType.value,
          estimasiBerat: form.elements.estimasi.value,
          address: form.elements.address.value,
          phoneNumber: form.elements.telepon.value,
          pengiriman: form.elements.inputPengiriman.value,
        };
        console.log(data);
        const buttonJualSampah = document.querySelector('#submitJualSampah');
        buttonJualSampah.setAttribute('disabled', '');
        buttonJualSampah.classList.remove('bg-lime-600', 'text-gray-50');
        buttonJualSampah.classList.add('bg-gray-400', 'text-gray-200');
      }
    });
  }

  pengiriman() {
    document.querySelector('#pengirimanOption').classList.toggle('hidden');
  }

  changeValue(text) {
    document.querySelector('#inputPengiriman').value = text;
    document.querySelector('#pengirimanOption').classList.toggle('hidden');
  }

  previewGambar() {
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
  }

  dropdownButton(button, element, svg) {
    document.querySelector(`#${button}`).addEventListener('click', () => {
      const selector = document.querySelector(`#${element}`);
      selector.classList.toggle('hidden');
      const svgDiv = document.querySelector(`#${svg}`);
      if (!selector.classList.contains('hidden')) {
        svgDiv.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-up"><path d="m18 15-6-6-6 6"/></svg>';
      } else {
        svgDiv.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>';
      }
    });
  }

  render() {
    this._emptyContent();
    this.classList.add('flex', 'flex-col');
    this.innerHTML += `
    <form id="formPenjualanSampah" class="flex flex-col gap-8">
          
    <div class="flex flex-col">
                   <div class="grid grid-cols-3 w-full gap-4 border-2 border-dashed border-gray-400 p-3 rounded-2xl">
                       <label for="picture" class="flex flex-col items-center justify-center w-full aspect-video bg-gray-100 rounded-lg cursor-pointer relative">
                           <div class="flex flex-col items-center justify-center pt-5 pb-6">
                               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image-up"><path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21"/><path d="m14 19.5 3-3 3 3"/><path d="M17 22v-5.5"/><circle cx="9" cy="9" r="2"/></svg>
                               <img src="" id="preview" alt="" class="z-10 absolute max-w-full max-h-full">
                           </div>
                           <input onchange="previewGambar()" accept=".jpg, .jpeg, .png" id="picture" type="file" class="hidden">
                       </label>
                       <label for="picture" class="flex flex-col items-center justify-center w-full aspect-video bg-gray-100 rounded-lg cursor-pointer relative">
                           <div class="flex flex-col items-center justify-center pt-5 pb-6">
                               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image-up"><path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21"/><path d="m14 19.5 3-3 3 3"/><path d="M17 22v-5.5"/><circle cx="9" cy="9" r="2"/></svg>
                               <img src="" id="preview" alt="" class="z-10 absolute max-w-full max-h-full">
                           </div>
                           <input onchange="previewGambar()" accept=".jpg, .jpeg, .png" id="picture" type="file" class="hidden">
                       </label>
                       <label for="picture" class="flex flex-col items-center justify-center w-full aspect-video bg-gray-100 rounded-lg cursor-pointer relative">
                           <div class="flex flex-col items-center justify-center pt-5 pb-6">
                               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image-up"><path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21"/><path d="m14 19.5 3-3 3 3"/><path d="M17 22v-5.5"/><circle cx="9" cy="9" r="2"/></svg>
                               <img src="" id="preview" alt="" class="z-10 absolute max-w-full max-h-full">
                           </div>
                           <input onchange="previewGambar()" accept=".jpg, .jpeg, .png" id="picture" type="file" class="hidden">
                       </label>
                       <div class="col-span-3 text-center text-gray-400">Upload foto sampah yang akan dijual</div>
                   </div> 
               </div>
               <div class="flex flex-row items-center justify-between" id="mitraTujuan">
                   <div class="flex flex-row justify-center items-center gap-4">
                       <svg xmlns="http://www.w3.org/2000/svg" width="11" height="28" viewBox="0 0 11 28" fill="none"><path d="M0 0H7C9.20914 0 11 1.79086 11 4V24C11 26.2091 9.20914 28 7 28H0V0Z" fill="#84CC16"/></svg>
                       <div class="text-xl font-semibold">Mitra Tujuan</div>
                   </div>
                   <div id="mitraTujuanSvg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg></div>                           
               </div>
               <div class="hidden" id="mitra">
                   <table class="table-auto w-full border-separate border-spacing-y-4">
                       <tr>
                           <td>Nama</td>
                           <td class="w-fit">:</td>
                           <td>${this.partnerData.name}</td>
                       </tr>
                       <tr>
                           <td>Alamat</td>
                           <td class="w-fit">:</td>
                           <td>${this.partnerData.address}</td>
                       </tr>
                       <tr>
                           <td>Nomor Telepon</td>
                           <td class="w-fit">:</td>
                           <td>+62 ${this.partnerData.phone_number}</td>
                       </tr>
                   </table>
               </div>
               <div class="flex flex-row items-center justify-between" id="detailPenjualan">
                   <div class="flex flex-row justify-center items-center gap-4">
                       <svg xmlns="http://www.w3.org/2000/svg" width="11" height="28" viewBox="0 0 11 28" fill="none"><path d="M0 0H7C9.20914 0 11 1.79086 11 4V24C11 26.2091 9.20914 28 7 28H0V0Z" fill="#84CC16"/></svg>
                       <div class="text-xl font-semibold">Detail Penjualan</div>
                   </div>
                   <div id="detailPenjualanSvg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg></div>                           
               </div>
               <div class="w-full hidden" id="form">
                   <table class="table-auto w-full border-separate border-spacing-y-4">
                       <tr>
                           <td>Kategori</td>
                           <td class="relative flex flex-row"> 
                               <div class="flex flex-col w-full">
                                   <div class="flex flex-row">
                                       <select id="plasticType" aria-describedby="plasticTypeValidation" name="plasticType" class="appearance-none bg-white border shadow-sm text-gray-900 text-sm rounded-lg w-full p-3 focus:ring-lime-600 focus:border-lime-600 outline-lime-600 dark:text-black" **required**>
                                           <option class="hidden" value=''>Pilih kategori sampah</option>
                                           <option value="PET">PET</option>
                                           <option value="HDPE">HDPE</option>
                                           <option value="PVC">PVC</option>
                                       </select>
                                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down absolute right-3 top-3"><path d="m6 9 6 6 6-6"/></svg>
                                   </div>  
                                   <p id="plasticTypeValidation" class="text-red-500 text-sm" aria-live="polite"></p>
                               </div>  
                           </td>
                       </tr>
                       <tr>
                           <td><label for="estimasi">Estimasi berat sampah</label></td>
                           <td>
                               <div class="flex flex-col w-full">
                                   <div class="p-2 flex flex-row w-full shadow-sm border items-center rounded-md"><input aria-describedby="estimasiValidation" class="placeholder:text-left w-full  outline-none" step="0.5" type="number" id="estimasi" name="estimasi" placeholder="Angka" required><span class="font-medium">Kg</span></div>
                                   <p id="estimasiValidation" class="text-red-500 text-sm" aria-live="polite"></p>
                               </div>
                           </td>
                       </tr>
                       <tr>
                           <td><label for="address">Alamat</label></td>
                           <td>
                               <div class="flex flex-col w-full">
                                   <div class="p-2 w-full shadow-sm border items-center rounded-md"><input aria-describedby="alamatValidation" class="placeholder:text-left w-full outline-none" type="text" id="address" name="address" placeholder="Masukan alamat anda" required></div>
                                   <p id="alamatValidation" class="text-red-500 text-sm" aria-live="polite"></p>
                               </div>
                           </td>
                       </tr>
                       <tr>
                           <td><label for="telepon">Nomor Telepon</label></td>
                           <td>
                               <div class="flex flex-col w-full">
                                   <div class="p-2 flex flex-row w-full shadow-sm border items-center rounded-md"><span class="font-medium pr-2">+62</span><input aria-describedby="teleponValidation" class="placeholder:text-left w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-none" type="number" id="telepon" name="telepon" placeholder="812345678901" required></div>
                                   <p id="teleponValidation" class="text-red-500 text-sm" aria-live="polite"></p>
                               </div>
                           </td>
                       </tr>
                       
                       <tr>
                           <td>Pengiriman</td>
                           <td class="relative flex flex-row"> 
                               <div class="flex flex-col w-full">
                                   <button id="pengirimanButton" type="button" class="bg-white border shadow-sm focus:border-lime-600 p-3 rounded-md w-full flex flex-row justify-between"> <input id="inputPengiriman" class="outline-none appearance-none placeholder:text-black flex flex-grow" aria-describedby="pengirimanValidation" type="text" name="inputPengiriman" placeholder="Pilih metode" readonly required><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevrons-up-down"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg></button>
                                   <p id="pengirimanValidation" class="text-red-500 text-sm" aria-live="polite"></p>
                               </div>
                               <div id="pengirimanOption" class="hidden absolute border bg-white shadow-sm top-[60px] w-full rounded-xl p-2 flex-col">
                                   <button id="antarLangsung" type="button" class="flex flex-col p-2 gap-2 text-left rounded-md hover:bg-gray-100">
                                       <h3 class="font-semibold">Antar Langsung</h3>
                                       <p class="text-gray-400">Hindari biaya tambahan dengan mengantar langsung sampahmu ke alamat mitra </p>
                                   </button>
                                   <button id="olehMitra" type="button" class="flex flex-col p-2 gap-2 text-left rounded-md hover:bg-gray-100">
                                       <h3 class="font-semibold">Penjemputan oleh mita</h3>
                                       <p class="text-gray-400">Penjemputan langsung ke rumah Anda dengan biaya tambahan. Tetap di rumah dan tunggu dengan nyaman</p>
                                   </button>
                               </div>
                           </td>
                       </tr>
                   </table>
               </div>
               <div class="flex flex-row items-center justify-between" id="detailPendapatan">
                   <div class="flex flex-row justify-center items-center gap-4">
                       <svg xmlns="http://www.w3.org/2000/svg" width="11" height="28" viewBox="0 0 11 28" fill="none"><path d="M0 0H7C9.20914 0 11 1.79086 11 4V24C11 26.2091 9.20914 28 7 28H0V0Z" fill="#84CC16"/></svg>
                       <div class="text-xl font-semibold">Detail Pendapatan</div>
                   </div>
                   <div id="detailPendapatanSvg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg></div>                           
               </div>
               <div class="hidden" id="pendapatanInfo">
                   <table class="table-auto w-full border-separate border-spacing-y-4">
                       <tr>
                           <td>Harga Jual</td>
                           <td class="text-right">Rp. 5000</td>
                       </tr>
                       <tr>
                           <td>Estimasi Berat Sampah</td>
                           <td class="text-right">2 Kg</td>
                       </tr>
                       <tr>
                           <td class="font-semibold">Estimasi Pendapatan</td>
                           <td class="text-right font-semibold">Rp. 10000</td>
                       </tr>
                   </table>
               </div>
               <div class="pt-2 w-full">
                   <button id="submitJualSampah" class="w-full bg-lime-600 text-gray-50 p-2 rounded-lg">Jual Sampah</button>
               </div>
           </form>
        `;
  }
}
customElements.define('form-penjualan', FormPenjualan);
