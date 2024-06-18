import API_ENDPOINT from '../../../../global/api-endpoint';
import Cookies from '../../../../utils/cookies.';

/* eslint-disable class-methods-use-this */
class OpenToReceiveTrash extends HTMLElement {
  constructor() {
    super();
    this._trashData = {
      startDate: null,
      endDate: null,
      peteMin: null,
      petePrice: null,
      hdpeMin: null,
      hdpePrice: null,
      pvcMin: null,
      pvcPrice: null,
      ldpeMin: null,
      ldpePrice: null,
      ppMin: null,
      ppPrice: null,
      psMin: null,
      psPrice: null,
      peteChecked: null,
      hdpeChecked: null,
      pvcChecked: null,
      ldpeChecked: null,
      ppChecked: null,
      psChecked: null,
    };
  }

  connectedCallback() {
    this.render();
    this.formSubmit();
    this.checkboxFunction();
    this.isChecked();
  }

  isChecked() {
    const jenisPlastic = ['PETE', 'HDPE', 'LDPE', 'PVC', 'PP', 'PS'];
    jenisPlastic.forEach((trash) => {
      if (this.trashData[`${trash.toLowerCase()}Checked`]) {
        const checkbox = document.querySelector(`input#${trash}`);
        checkbox.checked = true;
        const parentLabel = checkbox.closest('label');
        const grandparentElement = parentLabel.parentElement;
        const allInput = grandparentElement.parentElement.querySelectorAll('input[type="number"]');
        const toggleColor = grandparentElement.querySelector('.toggle-label');
        checkbox.classList.add('right-0');
        toggleColor.classList.remove('bg-gray-300');
        toggleColor.classList.add('bg-lime-400');
        allInput.forEach((inputElement) => {
          inputElement.setAttribute('required', '');
          const inputEvents = ['click', 'input', 'change', 'invalid', 'blur'];
          inputEvents.forEach((eventType) => {
            inputElement.addEventListener(eventType, () => {
              inputElement.setCustomValidity('');
              if (inputElement.validity.valueMissing) {
                inputElement.setCustomValidity('Bagian ini tidak boleh kosong.');
              }
            });
          });
        });
      }
    });
  }

  checkboxFunction() {
    const checkbox = document.querySelectorAll('input[type="checkbox"]');
    checkbox.forEach((element) => {
      element.addEventListener('click', () => {
        console.log('pencet');
        const parentLabel = element.closest('label');
        const grandparentElement = parentLabel.parentElement;
        const allInput = grandparentElement.parentElement.querySelectorAll('input[type="number"]');
        const toggleColor = grandparentElement.querySelector('.toggle-label');
        if (element.checked) {
          element.classList.add('right-0');
          toggleColor.classList.remove('bg-gray-300');
          toggleColor.classList.add('bg-lime-400');
          allInput.forEach((inputElement) => {
            inputElement.setAttribute('required', '');
            const inputEvents = ['click', 'input', 'change', 'invalid', 'blur'];
            inputEvents.forEach((eventType) => {
              inputElement.addEventListener(eventType, () => {
                inputElement.setCustomValidity('');
                if (inputElement.validity.valueMissing) {
                  inputElement.setCustomValidity('Bagian ini tidak boleh kosong.');
                }
              });
            });
          });
        } else {
          element.classList.remove('right-0');
          toggleColor.classList.remove('bg-lime-400');
          toggleColor.classList.add('bg-gray-300');
          allInput.forEach((inputElement) => {
            inputElement.removeAttribute('required');
          });
        }
      });
    });
  }

  formSubmit() {
    const form = document.getElementById('receiveForm');
    const plasticTypes = ['PETE', 'HDPE', 'PVC', 'LDPE', 'PP', 'PS'];
    function updateRequiredAttributes(type) {
      const minimal = document.getElementById(`${type}minimal`);
      const harga = document.getElementById(`${type}harga`);
      const isAnyFilled = minimal.value.trim() || harga.value.trim();
      if (isAnyFilled) {
        minimal.required = true;
        harga.required = true;
      } else {
        minimal.required = false;
        harga.required = false;
      }
    }

    plasticTypes.forEach((type) => {
      const minimalInput = document.getElementById(`${type}minimal`);
      const hargaInput = document.getElementById(`${type}harga`);
      minimalInput.addEventListener('input', () => updateRequiredAttributes(type));
      hargaInput.addEventListener('input', () => updateRequiredAttributes(type));
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.querySelectorAll('input[type="number"]');
      const inputCheckbox = document.querySelectorAll('input[type="checkbox"]');
      const arrayCheckbox = [];
      const arrayData = {};
      input.forEach((inputElement) => {
        const name = inputElement.getAttribute('name');
        arrayData[name] = form.elements[name].value;
      });
      inputCheckbox.forEach((checkbox) => {
        const name = checkbox.getAttribute('value');
        const value = checkbox.checked;
        arrayCheckbox.push({ name, accept: value });
      });
      // Fungsi untuk mengelompokkan data dan menghapus entri yang tidak diperlukan
      function groupAndFilterData(initialData, materials) {
        return materials.map((material) => {
          const { name } = material;
          const minimum = initialData[`${name.toUpperCase()}minimal`] || '';
          const price = initialData[`${name.toUpperCase()}harga`] || '';
          // Return null for entries that have accept=false and all values are empty
          if (!material.accept && !minimum && !price) {
            return null;
          }
          const jenisPlastic = ['PETE', 'HDPE', 'LDPE', 'PVC', 'PP', 'PS'];
          return {
            partnerId: Cookies.getUserId(),
            plasticId: (jenisPlastic.indexOf(name)) + 1,
            status: material.accept ? 'ACTIVE' : 'INACTIVE',
            minimumTransactionWeight: minimum,
            // maximumTransactionWeight: maximum,
            pricePerKilogram: price,
          };
        }).filter((entry) => entry !== null); // Remove null entries
      }
      const groupedFilteredData = groupAndFilterData(arrayData, arrayCheckbox);
      console.log(groupedFilteredData);
      fetch(`${API_ENDPOINT.UPDATE_ACC_RULES}?partnerId=${Cookies.getUserId()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.getToken()}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          (result.data).forEach((data) => {
            fetch(`${API_ENDPOINT.UPDATE_ACC_RULES}/${data.id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.getToken()}`,
              },
            });
          });
          groupedFilteredData.forEach((trash) => {
            const options = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.getToken()}`,
              },
              body: JSON.stringify(trash),
            };
            document.querySelector('main').innerHTML += `
              <div id="loading" class="top-0 right-0 fixed z-[999] flex justify-center items-center w-full h-full bg-opacity-40 bg-black">
                  <div class="loading z-[999]"></div>
              </div>`;
            fetch(API_ENDPOINT.UPDATE_ACC_RULES, options)
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                if (data.error) {
                  document.querySelector('#loading').remove();
                  const alert = document.createElement('error-alert');
                  alert.alertData = {
                    header: 'Edit Info Gagal',
                    desc: data.error.password,
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
        });
    });
  }

  set trashData(value) {
    this._trashData = value;
    console.log('di buat');
    this.render();
    this.formSubmit();
    this.checkboxFunction();
    this.isChecked();
  }

  get trashData() {
    return this._trashData;
  }

  render() {
    this.innerHTML = `
      <div id="open-to-recieve-trash-setting" class="flex flex-col gap-4">
            <form id="receiveForm" class="flex flex-col gap-4">
                <h3 class="font-semibold">Jenis Sampah Plastik</h3>
                <div class="flex flex-col justify-between">
                    <div class="grid grid-cols-3">
                        <div class="flex w-full">
                            <label for="PETE" class="flex flex-row items-center px-2">
                                <div class="relative inline-block w-16 mr-2 align-middle self-center justify-self-end select-none transition duration-200 ease-in">
                                    <input type="checkbox" name="plasticType" id="PETE" value="PETE" class="toggle-checkbox absolute block w-8 h-8 rounded-full bg-white border-4 appearance-none cursor-pointer focus:outline-none transition-transform transform duration-200 ease-in-out">
                                    <div class="toggle-label block overflow-hidden h-8 rounded-full bg-gray-300 cursor-pointer"></div>
                                </div>
                                <span>PETE</span>
                            </label>
                        </div>
                        <label for="PETEminimal" class="text-base px-2 py-2 flex flex-row items-center">
                            Minimal<input type="number" value="${this.trashData.peteMin}" min=0 id="PETEminimal" name="PETEminimal" class="rounded-lg outline-lime-600 invalid:outline-red-500 invalid:border invalid:border-red-500 relative text-base text-right w-full h-12 shadow-md px-3 mr-2 ml-4" placeholder="kg">
                        </label>
                        <label for="PETEharga" class="text-base px-2 py-2 flex flex-row items-center">
                            Harga<input type="number" value="${this.trashData.petePrice}" min=0 id="PETEharga" name="PETEharga" class="rounded-lg outline-lime-600 invalid:outline-red-500 invalid:border invalid:border-red-500 relative text-base text-right w-full h-12 shadow-md px-3 ml-4" placeholder="Rp. ">
                        </label>
                    </div>
                    <div class="grid grid-cols-3">
                        <div class="flex w-full">
                            <label for="HDPE" class="flex flex-row items-center px-2">
                                <div class="relative inline-block w-16 mr-2 align-middle self-center justify-self-end select-none transition duration-200 ease-in">
                                    <input type="checkbox" name="plasticType" id="HDPE" value="HDPE" class="toggle-checkbox absolute block w-8 h-8 rounded-full bg-white border-4 appearance-none cursor-pointer focus:outline-none transition-transform transform duration-200 ease-in-out">
                                    <div class="toggle-label block overflow-hidden h-8 rounded-full bg-gray-300 cursor-pointer"></div>
                                </div>
                                <span>HDPE</span>
                            </label>
                        </div>
                        <label for="HDPEminimal" class="text-base px-2 py-2 flex flex-row items-center">
                            Minimal<input type="number" value="${this.trashData.hdpeMin}" min=0 id="HDPEminimal" name="HDPEminimal" class="rounded-lg outline-lime-600 invalid:outline-red-500 invalid:border invalid:border-red-500 relative text-base text-right w-full h-12 shadow-md px-3 mr-2 ml-4" placeholder="kg">
                        </label>
                        <label for="HDPEharga" class="text-base px-2 py-2 flex flex-row items-center">
                            Harga<input type="number" value="${this.trashData.hdpePrice}" min=0 id="HDPEharga" name="HDPEharga" class="rounded-lg outline-lime-600 invalid:outline-red-500 invalid:border invalid:border-red-500 relative text-base text-right w-full h-12 shadow-md px-3 ml-4" placeholder="Rp. ">
                        </label>
                    </div>
                    <div class="grid grid-cols-3">
                        <div class="flex w-full">
                            <label for="PVC" class="flex flex-row items-center px-2">
                                <div class="relative inline-block w-16 mr-2 align-middle self-center justify-self-end select-none transition duration-200 ease-in">
                                    <input type="checkbox" name="plasticType" id="PVC" value="PVC" class="toggle-checkbox absolute block w-8 h-8 rounded-full bg-white border-4 appearance-none cursor-pointer focus:outline-none transition-transform transform duration-200 ease-in-out">
                                    <div class="toggle-label block overflow-hidden h-8 rounded-full bg-gray-300 cursor-pointer"></div>
                                </div>
                                <span>PVC</span>
                            </label>
                        </div>
                        <label for="PVCminimal" class="text-base px-2 py-2 flex flex-row items-center">
                            Minimal<input type="number" value="${this.trashData.pvcMin}" min=0 id="PVCminimal" name="PVCminimal" class="rounded-lg outline-lime-600 invalid:outline-red-500 invalid:border invalid:border-red-500 relative text-base text-right w-full h-12 shadow-md px-3 mr-2 ml-4" placeholder="kg">
                        </label>
                        <label for="PVCharga" class="text-base px-2 py-2 flex flex-row items-center">
                            Harga<input type="number" value="${this.trashData.pvcPrice}" min=0 id="PVCharga" name="PVCharga" class="rounded-lg outline-lime-600 invalid:outline-red-500 invalid:border invalid:border-red-500 relative text-base text-right w-full h-12 shadow-md px-3 ml-4" placeholder="Rp. ">
                        </label>
                    </div>
                    <div class="grid grid-cols-3">
                        <div class="flex w-full">
                            <label for="LDPE" class="flex flex-row items-center px-2">
                                <div class="relative inline-block w-16 mr-2 align-middle self-center justify-self-end select-none transition duration-200 ease-in">
                                    <input type="checkbox" name="plasticType" id="LDPE" value="LDPE" class="toggle-checkbox absolute block w-8 h-8 rounded-full bg-white border-4 appearance-none cursor-pointer focus:outline-none transition-transform transform duration-200 ease-in-out">
                                    <div class="toggle-label block overflow-hidden h-8 rounded-full bg-gray-300 cursor-pointer"></div>
                                </div>
                                <span>LDPE</span>
                            </label>
                        </div>
                        <label for="LDPEminimal" class="text-base px-2 py-2 flex flex-row items-center">
                            Minimal<input type="number" value="${this.trashData.ldpeMin}" min=0 id="LDPEminimal" name="LDPEminimal" class="rounded-lg outline-lime-600 invalid:outline-red-500 invalid:border invalid:border-red-500 relative text-base text-right w-full h-12 shadow-md px-3 mr-2 ml-4" placeholder="kg">
                        </label>
                        <label for="LDPEharga" class="text-base px-2 py-2 flex flex-row items-center">
                            Harga<input type="number" value="${this.trashData.ldpePrice}" min=0 id="LDPEharga" name="LDPEharga" class="rounded-lg outline-lime-600 invalid:outline-red-500 invalid:border invalid:border-red-500 relative text-base text-right w-full h-12 shadow-md px-3 ml-4" placeholder="Rp. ">
                        </label>
                    </div>
                    <div class="grid grid-cols-3">
                        <div class="flex w-full">
                            <label for="PP" class="flex flex-row items-center px-2">
                                <div class="relative inline-block w-16 mr-2 align-middle self-center justify-self-end select-none transition duration-200 ease-in">
                                    <input type="checkbox" name="plasticType" id="PP" value="PP" class="toggle-checkbox absolute block w-8 h-8 rounded-full bg-white border-4 appearance-none cursor-pointer focus:outline-none transition-transform transform duration-200 ease-in-out">
                                    <div class="toggle-label block overflow-hidden h-8 rounded-full bg-gray-300 cursor-pointer"></div>
                                </div>
                                <span>PP</span>
                            </label>
                        </div>
                        <label for="PPminimal" class="text-base px-2 py-2 flex flex-row items-center">
                            Minimal<input type="number" value="${this.trashData.ppMin}" min=0 id="PPminimal" name="PPminimal" class="rounded-lg outline-lime-600 invalid:outline-red-500 invalid:border invalid:border-red-500 relative text-base text-right w-full h-12 shadow-md px-3 mr-2 ml-4" placeholder="kg">
                        </label>
                        <label for="PPharga" class="text-base px-2 py-2 flex flex-row items-center">
                            Harga<input type="number" value="${this.trashData.ppPrice}" min=0 id="PPharga" name="PPharga" class="rounded-lg outline-lime-600 invalid:outline-red-500 invalid:border invalid:border-red-500 relative text-base text-right w-full h-12 shadow-md px-3 ml-4" placeholder="Rp. ">
                        </label>
                    </div>
                    <div class="grid grid-cols-3">
                        <div class="flex w-full">
                            <label for="PS" class="flex flex-row items-center px-2">
                                <div class="relative inline-block w-16 mr-2 align-middle self-center justify-self-end select-none transition duration-200 ease-in">
                                    <input type="checkbox" name="plasticType" id="PS" value="PS" class="toggle-checkbox absolute block w-8 h-8 rounded-full bg-white border-4 appearance-none cursor-pointer focus:outline-none transition-transform transform duration-200 ease-in-out">
                                    <div class="toggle-label block overflow-hidden h-8 rounded-full bg-gray-300 cursor-pointer"></div>
                                </div>
                                <span>PS</span>
                            </label>
                        </div>
                        <label for="PSminimal" class="text-base px-2 py-2 flex flex-row items-center">
                            Minimal<input type="number" value="${this.trashData.psMin}" min=0 id="PSminimal" name="PSminimal" class="rounded-lg outline-lime-600 invalid:outline-red-500 invalid:border invalid:border-red-500 relative text-base text-right w-full h-12 shadow-md px-3 mr-2 ml-4" placeholder="kg">
                        </label>
                        <label for="PSharga" class="text-base px-2 py-2 flex flex-row items-center">
                            Harga<input type="number" value="${this.trashData.psPrice}" min=0 id="PSharga" name="PSharga" class="rounded-lg outline-lime-600 invalid:outline-red-500 invalid:border invalid:border-red-500 relative text-base text-right w-full h-12 shadow-md px-3 ml-4" placeholder="Rp. ">
                        </label>
                    </div>
                </div>
                <div class="flex flex-row justify-end">
                    <button class="button bg-lime-500 px-4 py-2 text-base text-white font-semibold rounded-lg" type="submit">Submit</button>
                </div>
            </form>
        </div>
    `;
  }
}

customElements.define('open-to-receive-trash', OpenToReceiveTrash);
